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
  const { scene } = useGLTF('/truck.glb');
  const truckRef = useRef<THREE.Group>(null);

  // No need to recenter the model, as it's already fixed in Blender

  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();

  // PHASES: Three-phase animation system
  const PHASE1_END = 0.12;        // Truck stays centered and still (longer duration)
  const PHASE2_START = 0.12;      // Start rotation
  const PHASE2_END = 0.2;        // End rotation (truck facing left, only front visible)
  const PHASE3_START = 0.3;      // Start moving left and out of view
  const PHASE3_END = 0.6;        // Truck exits view

  // Phase 1: Initial centered position (facing 45 deg clockwise on Y)
  const INITIAL_POSITION = [6, -2, -5];
  const INITIAL_ROTATION_Y = -1; // 45 degrees clockwise
  const INITIAL_ROTATION_Z = 0; // 45 degrees clockwise
  const INITIAL_SCALE = 0.4; // Adjust as needed for design

  // Phase 2: After rotation (facing left, only front part visible)
  const ROTATED_ROTATION_Y = 3; 
  const ROTATED_POSITION_X = 5; 
  const ROTATED_SCALE = 0.4;

  // Phase 3: Exit movement (move further left and out of view)
  const EXIT_POSITION_X = -10; // Move far left to exit view

  useFrame(() => {
    if (truckRef.current) {
      const scrollValue = scrollProgress.get();

      truckRef.current.visible = true;
      console.log('scrollValue', scrollValue);
      if (scrollValue < PHASE1_END) {
        // Phase 1: Truck centered, facing 45 deg
        truckRef.current.position.set(INITIAL_POSITION[0], INITIAL_POSITION[1], INITIAL_POSITION[2]);
        truckRef.current.rotation.y = INITIAL_ROTATION_Y;
        truckRef.current.rotation.z = INITIAL_ROTATION_Z;
        truckRef.current.scale.setScalar(INITIAL_SCALE);

      } else if (scrollValue < PHASE2_END) {
        // Phase 2: Rotate to face left, move left so only front is visible
        const phase2Progress = Math.min(
          Math.max((scrollValue - PHASE2_START) / (PHASE2_END - PHASE2_START), 0),
          1
        );

        // Only rotate during phase 2, then clamp to ROTATED_ROTATION_Y at the end
        let rotY;
        if (phase2Progress >= 1) {
          rotY = ROTATED_ROTATION_Y;
        } else {
          rotY = THREE.MathUtils.lerp(INITIAL_ROTATION_Y, ROTATED_ROTATION_Y, phase2Progress);
        }
        const posX = THREE.MathUtils.lerp(INITIAL_POSITION[0], ROTATED_POSITION_X, phase2Progress);

        truckRef.current.position.set(posX, INITIAL_POSITION[1], INITIAL_POSITION[2]);
        truckRef.current.rotation.y = rotY;
        truckRef.current.scale.setScalar(ROTATED_SCALE);

      } else {
        // Phase 3: Move truck further left and out of view
        const phase3Progress = Math.min(
          Math.max((scrollValue - PHASE3_START) / (PHASE3_END - PHASE3_START), 0),
          1
        );

        const posX = THREE.MathUtils.lerp(ROTATED_POSITION_X, EXIT_POSITION_X, phase3Progress);

        truckRef.current.position.set(posX, INITIAL_POSITION[1], INITIAL_POSITION[2]);
        truckRef.current.rotation.y = ROTATED_ROTATION_Y;
        truckRef.current.scale.setScalar(ROTATED_SCALE);
      }
    }
  });

  // Add axes helper for debugging
  return (
    <group ref={truckRef}>
      <axesHelper args={[5]} />
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
useGLTF.preload('/truck.glb');

export default TruckScene;