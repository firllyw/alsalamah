'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useEffect, useState } from 'react';
import { useGLTF, Environment } from '@react-three/drei';
import { useScroll, MotionValue } from 'framer-motion';
import * as THREE from 'three';

interface TruckModelProps {
  scrollProgress: MotionValue<number>;
}

function TruckModel({ scrollProgress }: TruckModelProps) {
  const { scene } = useGLTF('/truck mercy new.glb');
  const truckRef = useRef<THREE.Group>(null);

  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();

  // Helper: apply opacity to all mesh materials in the group
  const setGroupOpacity = (object: THREE.Object3D, opacity: number) => {
    object.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const apply = (mat: THREE.Material) => {
          // Only apply to materials that support opacity
          if ('opacity' in mat) {
            mat.transparent = opacity < 1;
            (mat as THREE.MeshStandardMaterial).opacity = opacity;
          }
        };
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(apply);
        } else if (mesh.material) {
          apply(mesh.material);
        }
      }
    });
  };

  // PHASES: Three-phase animation system
  const PHASE1_START = 0.05;
  const PHASE1_END = 0.12;        // Truck fades out
  const PHASE2_START = 0.12;      // Truck appears from right, sliding in
  const PHASE2_END = 0.2;         // End of slide-in
  const PHASE3_START = 0.3;       // Start moving left and out of view
  const PHASE3_END = 0.6;         // Truck exits view

  // Phase 1: Initial centered position (no rotation, just fade out)
  const INITIAL_POSITION = [3, -2, -3];
  const INITIAL_ROTATION_Y = -1;
  const INITIAL_ROTATION_Z = 0;
  const INITIAL_SCALE = 0.4;

  // Phase 2: Slide in from right to this position
  const SLIDEIN_START_X = 12; // Offscreen right
  const SLIDEIN_END_X = 3;    // Final position after slide-in
  const SLIDEIN_Y = -2;
  const SLIDEIN_Z = 1;
  // Rotate the truck so it faces left (not reversing) when sliding in
  const SLIDEIN_ROTATION_Y = -Math.PI / 1; // -90 degrees, facing left
  const SLIDEIN_SCALE = 0.3;

  // Phase 3: Exit movement (move further left and out of view)
  const EXIT_POSITION_X = -10; // Move far left to exit view
  useFrame(() => {
    if (truckRef.current) {
      const scrollValue = scrollProgress.get();

      let posX = INITIAL_POSITION[0];
      let posY = INITIAL_POSITION[1];
      let posZ = INITIAL_POSITION[2];
      let rotY = INITIAL_ROTATION_Y;
      let scale = INITIAL_SCALE;
      let newOpacity = 1;

      if (scrollValue < PHASE2_START) {
        // Phase 1: Truck centered, fade out between PHASE1_START and PHASE1_END
        if (scrollValue <= PHASE1_START) {
          newOpacity = 1; // fully visible before fade starts
        } else if (scrollValue < PHASE1_END) {
          const phase1Progress = Math.min(
            Math.max((scrollValue - PHASE1_START) / (PHASE1_END - PHASE1_START), 0),
            1
          );
          newOpacity = 1; // gradually disappear to 0
        } else {
          newOpacity = 0; // hidden after phase 1 ends until phase 2 starts
        }
        posX = INITIAL_POSITION[0];
        posY = INITIAL_POSITION[1];
        posZ = INITIAL_POSITION[2];
        rotY = INITIAL_ROTATION_Y;
        scale = INITIAL_SCALE;
      } else if (scrollValue < PHASE3_START) {
        // Phase 2: Truck slides in from right and fades in
        const phase2Progress = Math.min(
          Math.max((scrollValue - PHASE2_START) / (PHASE3_START - PHASE2_START), 0),
          1
        );
        // Slide from offscreen right to target position
        posX = THREE.MathUtils.lerp(SLIDEIN_START_X, SLIDEIN_END_X, phase2Progress);
        posY = SLIDEIN_Y;
        posZ = SLIDEIN_Z;
        rotY = SLIDEIN_ROTATION_Y; // Now facing left, not reversing
        scale = SLIDEIN_SCALE;
        // Fade in from 0 to 1 during slide-in
        newOpacity = 1;
      } else {
        // Phase 3: Move truck further left and out of view
        const phase3Progress = Math.min(
          Math.max((scrollValue - PHASE3_START) / (PHASE3_END - PHASE3_START), 0),
          1
        );
        posX = THREE.MathUtils.lerp(SLIDEIN_END_X, EXIT_POSITION_X, phase3Progress);
        posY = SLIDEIN_Y;
        posZ = SLIDEIN_Z;
        rotY = SLIDEIN_ROTATION_Y;
        scale = SLIDEIN_SCALE;
        // Fade out from 1 to 0 as it exits
        newOpacity = 1;
      }

      truckRef.current.position.set(posX, posY, posZ);
      truckRef.current.rotation.y = rotY;
      truckRef.current.rotation.z = INITIAL_ROTATION_Z;
      truckRef.current.scale.setScalar(scale);
      // Apply opacity to all materials of the truck
      setGroupOpacity(truckRef.current, THREE.MathUtils.clamp(newOpacity, 0, 1));

    }
  });

  // Add axes helper for debugging
  return (
    <group ref={truckRef}>
      <primitive
        object={clonedScene}
        scale={[1, 1, 1]}
        position={[0, 0, 0]}
      />
    </group>
  );
}

function TruckScene() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll();

  // Add a border and fixed size for debugging
  return (
    <div className="canvas-container" style={{ border: '2px solid red', width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 1, 6], fov: 75 }}
        style={{ background: 'rgba(0,0,0,0.1)' }}
        shadows
      >
        <Suspense fallback={null}>
          {/* Lighting setup */}
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-5, 2, 5]} intensity={0.5} />

          {/* Environment for reflections */}
          <Environment preset="sunset" />

          {/* Truck model */}
          <TruckModel scrollProgress={scrollYProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the truck model
useGLTF.preload('/truck mercy new.glb');

export default TruckScene;