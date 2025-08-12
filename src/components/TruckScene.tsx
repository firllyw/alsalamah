'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useEffect, useState } from 'react';
import { useGLTF, Environment, useTexture } from '@react-three/drei';
import { useScroll, MotionValue } from 'framer-motion';
import * as THREE from 'three';

interface TruckModelProps {
  scrollProgress: MotionValue<number>;
}

function TruckModel({ scrollProgress }: TruckModelProps) {
  const { scene } = useGLTF('/low_poly_truck.glb');
  const truckRef = useRef<THREE.Group>(null);
  const textures = useTexture('/truck_texture.png');

  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();

  // Phase boundaries
  const PHASE3_START = 0.08;
  const PHASE3_END = 0.18;
  const PHASE4_START = 0.4;
  const PHASE4_END = 0.6; // You can adjust this as needed

  // Initial values
  const INITIAL_POSITION = [0, -0.5, 0];
  const INITIAL_ROTATION_Y = -Math.PI / 6;
  const INITIAL_SCALE = 1;

  // Target values for phase 3
  const FINAL_ROTATION_Y = INITIAL_ROTATION_Y - (2 * Math.PI) / 2.4;
  const FINAL_SCALE = 1.2;
  const FINAL_POSITION_X = 4; // Move to right

  // Target values for phase 4 (move left)
  const PHASE4_POSITION_X = -3; // Move to left (adjust as needed)

  useFrame(() => {
    if (truckRef.current) {
      const scrollValue = scrollProgress.get();

      truckRef.current.visible = true;
      if (scrollValue < PHASE3_START) {
        // Phase 1 & 2: Truck stays at initial position, rotation, and scale
        truckRef.current.position.set(INITIAL_POSITION[0], INITIAL_POSITION[1], INITIAL_POSITION[2]);
        truckRef.current.rotation.y = INITIAL_ROTATION_Y;
        truckRef.current.scale.setScalar(INITIAL_SCALE);
      } else if (scrollValue < PHASE4_START) {
        // Phase 3: Animate from initial to final values, but stop at 360deg
        // Clamp progress between 0 and 1
        const phase3Progress = Math.min(
          Math.max((scrollValue - PHASE3_START) / (PHASE3_END - PHASE3_START), 0),
          1
        );

        // Interpolate rotation.y up to 360deg (2*PI), then stop
        const rotY = THREE.MathUtils.lerp(INITIAL_ROTATION_Y, FINAL_ROTATION_Y, phase3Progress);
        const scale = THREE.MathUtils.lerp(INITIAL_SCALE, FINAL_SCALE, phase3Progress);
        // Interpolate x position from initial to final
        const posX = THREE.MathUtils.lerp(INITIAL_POSITION[0], FINAL_POSITION_X, phase3Progress);

        truckRef.current.position.set(posX, INITIAL_POSITION[1], INITIAL_POSITION[2]);
        truckRef.current.rotation.y = rotY;
        truckRef.current.scale.setScalar(scale);
      } else {
        // Phase 4: Move truck to the left on x axis
        // Clamp progress between 0 and 1
        const phase4Progress = Math.min(
          Math.max((scrollValue - PHASE4_START) / (PHASE4_END - PHASE4_START), 0),
          1
        );
        // Start from FINAL_POSITION_X, move to PHASE4_POSITION_X
        const posX = THREE.MathUtils.lerp(FINAL_POSITION_X, PHASE4_POSITION_X, phase4Progress);

        // Keep rotation and scale at their final values from phase 3
        truckRef.current.position.set(posX, INITIAL_POSITION[1], INITIAL_POSITION[2]);
        truckRef.current.rotation.y = FINAL_ROTATION_Y;
        truckRef.current.scale.setScalar(FINAL_SCALE);
      }
    }
  });

  return (
    <group ref={truckRef}>
      <primitive
        object={clonedScene}
        scale={[30, 30, 30]}
        position={[-2, 0, 0]}
        material={new THREE.MeshStandardMaterial({ map: textures })}
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

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 75 }}
        style={{ background: 'transparent' }}
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
useGLTF.preload('/low_poly_truck.glb');

export default TruckScene;