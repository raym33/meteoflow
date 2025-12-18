import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Sky,
  Stars,
  Cloud,
  Float,
  MeshDistortMaterial,
  Sparkles,
} from '@react-three/drei';
import * as THREE from 'three';

interface WeatherSceneProps {
  weatherCode: number;
  isDay: boolean;
  temperature: number;
}

// Terrain component with procedural generation
function Terrain({ weatherCode }: { weatherCode: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(100, 100, 128, 128);
    const positions = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];

      // Multi-octave noise for realistic terrain
      let height = 0;
      height += Math.sin(x * 0.1) * Math.cos(y * 0.1) * 3;
      height += Math.sin(x * 0.05 + 1) * Math.cos(y * 0.05 + 2) * 5;
      height += Math.sin(x * 0.02) * Math.cos(y * 0.02) * 8;

      // Add some random variation
      height += (Math.random() - 0.5) * 0.5;

      // Create mountains in the distance
      const distFromCenter = Math.sqrt(x * x + y * y);
      if (distFromCenter > 30) {
        height += (distFromCenter - 30) * 0.3;
      }

      positions[i + 2] = height;
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  const getTerrainColor = () => {
    // Snow
    if (weatherCode >= 71 && weatherCode <= 77) return '#e8e8e8';
    if (weatherCode >= 85 && weatherCode <= 86) return '#f0f0f0';
    // Rain - wet grass
    if (weatherCode >= 51 && weatherCode <= 67) return '#2d5a27';
    if (weatherCode >= 80 && weatherCode <= 82) return '#2d5a27';
    // Default - dry grass
    return '#4a7c3f';
  };

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -8, -20]}
      receiveShadow
    >
      <meshStandardMaterial
        color={getTerrainColor()}
        roughness={0.9}
        metalness={0.1}
        flatShading
      />
    </mesh>
  );
}

// Water/Lake component
function Water() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = -7 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[20, -7, -10]}>
      <circleGeometry args={[15, 64]} />
      <MeshDistortMaterial
        color="#1a5276"
        transparent
        opacity={0.8}
        roughness={0.1}
        metalness={0.8}
        distort={0.1}
        speed={2}
      />
    </mesh>
  );
}

// Mountains in the background
function Mountains() {
  const mountains = useMemo(() => {
    const mounts = [];
    for (let i = 0; i < 8; i++) {
      const x = (Math.random() - 0.5) * 80;
      const z = -40 - Math.random() * 30;
      const scale = 5 + Math.random() * 10;
      mounts.push({ x, z, scale });
    }
    return mounts;
  }, []);

  return (
    <>
      {mountains.map((m, i) => (
        <mesh key={i} position={[m.x, -8 + m.scale / 2, m.z]} castShadow>
          <coneGeometry args={[m.scale * 0.8, m.scale, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#4a5568' : '#2d3748'}
            roughness={0.9}
            flatShading
          />
        </mesh>
      ))}
    </>
  );
}

// 3D Sun component
function Sun3D({ isDay }: { isDay: boolean }) {
  const sunRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  if (!isDay) return null;

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={sunRef} position={[15, 20, -30]}>
        <mesh>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial color="#ffd93d" />
        </mesh>
        <pointLight color="#ffd93d" intensity={2} distance={100} />
        {/* Sun rays */}
        {[...Array(8)].map((_, i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 4]}>
            <boxGeometry args={[0.3, 6, 0.1]} />
            <meshBasicMaterial color="#ffd93d" transparent opacity={0.5} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// 3D Moon component
function Moon3D({ isDay }: { isDay: boolean }) {
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (moonRef.current) {
      moonRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  if (isDay) return null;

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={[12, 18, -25]}>
        <mesh ref={moonRef}>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshStandardMaterial
            color="#f5f5dc"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        {/* Moon craters */}
        <mesh position={[0.5, 0.5, 2.3]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#d4d4aa" roughness={1} />
        </mesh>
        <mesh position={[-0.8, -0.3, 2.2]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#d4d4aa" roughness={1} />
        </mesh>
        <pointLight color="#f5f5dc" intensity={0.5} distance={50} />
      </group>
    </Float>
  );
}

// Rain particles
function Rain({ intensity = 1 }: { intensity?: number }) {
  const rainRef = useRef<THREE.Points>(null);
  const count = 5000 * intensity;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = Math.random() * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return pos;
  }, [count]);

  useFrame(() => {
    if (rainRef.current) {
      const positions = rainRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] -= 0.5 + Math.random() * 0.3;
        if (positions[i * 3 + 1] < -10) {
          positions[i * 3 + 1] = 50;
        }
      }
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={rainRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a4c8e8"
        size={0.15}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Snow particles
function Snow({ intensity = 1 }: { intensity?: number }) {
  const snowRef = useRef<THREE.Points>(null);
  const count = 3000 * intensity;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = Math.random() * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
      vel[i] = 0.02 + Math.random() * 0.05;
    }
    return [pos, vel];
  }, [count]);

  useFrame((state) => {
    if (snowRef.current) {
      const positions = snowRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.01;
        positions[i * 3 + 1] -= velocities[i];
        if (positions[i * 3 + 1] < -10) {
          positions[i * 3 + 1] = 50;
          positions[i * 3] = (Math.random() - 0.5) * 100;
        }
      }
      snowRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={snowRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.25}
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

// Fog effect
function FogEffect() {
  const fogRef = useRef<THREE.Points>(null);
  const count = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = Math.random() * 10 - 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (fogRef.current) {
      const positions = fogRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3] += Math.sin(state.clock.elapsedTime * 0.1 + i) * 0.02;
        positions[i * 3 + 2] += 0.02;
        if (positions[i * 3 + 2] > 40) {
          positions[i * 3 + 2] = -40;
        }
      }
      fogRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={fogRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c8c8c8"
        size={2}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

// Lightning bolt
function Lightning({ active }: { active: boolean }) {
  const [visible, setVisible] = React.useState(false);
  const lightRef = useRef<THREE.PointLight>(null);

  useEffect(() => {
    if (!active) return;

    const flash = () => {
      setVisible(true);
      setTimeout(() => setVisible(false), 100);
      setTimeout(() => {
        setVisible(true);
        setTimeout(() => setVisible(false), 50);
      }, 150);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) flash();
    }, 3000);

    return () => clearInterval(interval);
  }, [active]);

  if (!active || !visible) return null;

  return (
    <>
      <pointLight
        ref={lightRef}
        position={[0, 30, -20]}
        color="#ffffff"
        intensity={100}
        distance={200}
      />
    </>
  );
}

// Dynamic clouds based on weather
function WeatherClouds({ weatherCode, isDay }: { weatherCode: number; isDay: boolean }) {
  const cloudCount = useMemo(() => {
    // More clouds for overcast conditions
    if (weatherCode >= 45 && weatherCode <= 48) return 20; // Fog
    if (weatherCode >= 51 && weatherCode <= 67) return 15; // Rain
    if (weatherCode >= 71 && weatherCode <= 77) return 15; // Snow
    if (weatherCode >= 80 && weatherCode <= 82) return 12; // Showers
    if (weatherCode === 3) return 10; // Overcast
    if (weatherCode === 2) return 6; // Partly cloudy
    if (weatherCode === 1) return 3; // Few clouds
    return 0; // Clear
  }, [weatherCode]);

  const cloudPositions = useMemo(() => {
    return [...Array(cloudCount)].map(() => ({
      x: (Math.random() - 0.5) * 60,
      y: 8 + Math.random() * 12,
      z: -15 - Math.random() * 30,
      scale: 3 + Math.random() * 5,
    }));
  }, [cloudCount]);

  const cloudColor = isDay ? '#ffffff' : '#4a5568';

  return (
    <>
      {cloudPositions.map((pos, i) => (
        <Cloud
          key={i}
          position={[pos.x, pos.y, pos.z]}
          speed={0.2}
          opacity={0.8}
          color={cloudColor}
          scale={pos.scale}
        />
      ))}
    </>
  );
}

// Camera controller
function CameraController() {
  const { camera } = useThree();

  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 2;
    camera.position.y = 2 + Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    camera.lookAt(0, 0, -20);
  });

  return null;
}

// Main scene component
function Scene({ weatherCode, isDay }: Omit<WeatherSceneProps, 'temperature'>) {
  // Determine weather effects
  const isRaining = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode);
  const isSnowing = [71, 73, 75, 77, 85, 86].includes(weatherCode);
  const isFoggy = [45, 48].includes(weatherCode);
  const isThunderstorm = [95, 96, 99].includes(weatherCode);

  const getRainIntensity = () => {
    if ([55, 65, 82].includes(weatherCode)) return 2;
    if ([53, 63, 81].includes(weatherCode)) return 1.5;
    return 1;
  };

  const getSnowIntensity = () => {
    if ([75, 86].includes(weatherCode)) return 2;
    if ([73, 85].includes(weatherCode)) return 1.5;
    return 1;
  };

  // Sky color based on conditions
  const getSkyParams = () => {
    if (!isDay) {
      return { sunPosition: [0, -1, 0] as [number, number, number] };
    }
    if (isRaining || isThunderstorm) {
      return { sunPosition: [0, 0.1, -1] as [number, number, number] };
    }
    return { sunPosition: [1, 0.5, -0.5] as [number, number, number] };
  };

  return (
    <>
      <CameraController />

      {/* Lighting */}
      <ambientLight intensity={isDay ? 0.5 : 0.1} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={isDay ? 1 : 0.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Sky */}
      {isDay ? (
        <Sky
          distance={450000}
          sunPosition={getSkyParams().sunPosition}
          inclination={0.5}
          azimuth={0.25}
          rayleigh={isRaining ? 4 : 2}
        />
      ) : (
        <>
          <color attach="background" args={['#0a0a1a']} />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
        </>
      )}

      {/* Celestial bodies */}
      <Sun3D isDay={isDay && !isRaining && !isFoggy} />
      <Moon3D isDay={isDay} />

      {/* Terrain and landscape */}
      <Terrain weatherCode={weatherCode} />
      <Mountains />
      <Water />

      {/* Clouds */}
      <WeatherClouds weatherCode={weatherCode} isDay={isDay} />

      {/* Weather effects */}
      {isRaining && <Rain intensity={getRainIntensity()} />}
      {isSnowing && <Snow intensity={getSnowIntensity()} />}
      {isFoggy && <FogEffect />}
      {isThunderstorm && <Lightning active={true} />}

      {/* Sparkles for clear nights */}
      {!isDay && !isRaining && !isSnowing && (
        <Sparkles
          count={200}
          scale={50}
          size={2}
          speed={0.3}
          color="#ffffff"
        />
      )}

      {/* Fog for atmosphere */}
      <fog attach="fog" args={[isDay ? '#87ceeb' : '#0a0a1a', 30, 100]} />
    </>
  );
}

// Main export component
export const WeatherScene3D: React.FC<WeatherSceneProps> = (props) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      <Canvas
        shadows
        camera={{ position: [0, 2, 15], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <Scene {...props} />
      </Canvas>
    </div>
  );
};
