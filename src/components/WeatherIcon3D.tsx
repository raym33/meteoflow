import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// ============================================================================
// BEAUTIFUL 3D SUN WITH GLOW EFFECTS
// ============================================================================

function Sun3D({ scale = 1 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const raysRef = useRef<THREE.Group>(null);
  const innerRaysRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.1;
    }

    if (raysRef.current) {
      raysRef.current.rotation.z = -t * 0.2;
      const pulse = 1 + Math.sin(t * 2) * 0.1;
      raysRef.current.scale.setScalar(pulse);
    }

    if (innerRaysRef.current) {
      innerRaysRef.current.rotation.z = t * 0.3;
    }

    if (glowRef.current) {
      const glowPulse = 1 + Math.sin(t * 1.5) * 0.15;
      glowRef.current.scale.setScalar(glowPulse);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} scale={scale}>
        {/* Core sun */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>

        {/* Inner glow */}
        <mesh scale={1.15}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#FFEB3B" transparent opacity={0.6} />
        </mesh>

        {/* Outer glow */}
        <mesh ref={glowRef} scale={1.4}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#FFF59D" transparent opacity={0.3} />
        </mesh>

        {/* Corona */}
        <mesh scale={1.7}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#FFFF8D" transparent opacity={0.15} />
        </mesh>

        {/* Inner short rays */}
        <group ref={innerRaysRef}>
          {[...Array(8)].map((_, i) => (
            <mesh key={`inner-${i}`} rotation={[0, 0, (i * Math.PI) / 4]}>
              <boxGeometry args={[0.12, 0.8, 0.05]} />
              <meshBasicMaterial color="#FFD700" transparent opacity={0.9} />
            </mesh>
          ))}
        </group>

        {/* Outer long rays */}
        <group ref={raysRef}>
          {[...Array(12)].map((_, i) => (
            <mesh key={`outer-${i}`} rotation={[0, 0, (i * Math.PI) / 6]}>
              <boxGeometry args={[0.08, 1.2, 0.03]} />
              <meshBasicMaterial color="#FFC107" transparent opacity={0.7} />
            </mesh>
          ))}
        </group>

        <pointLight color="#FFD700" intensity={2} distance={10} />
      </group>
    </Float>
  );
}

// ============================================================================
// BEAUTIFUL 3D MOON WITH CRATERS AND STARS
// ============================================================================

function Moon3D({ scale = 1 }: { scale?: number }) {
  const moonRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const starsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (moonRef.current) {
      moonRef.current.rotation.y = t * 0.1;
    }

    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 0.8) * 0.1;
      glowRef.current.scale.setScalar(pulse);
    }

    if (starsRef.current) {
      starsRef.current.children.forEach((star, i) => {
        const twinkle = 0.3 + Math.sin(t * 4 + i * 1.5) * 0.7;
        star.scale.setScalar(twinkle);
      });
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
      <group scale={scale}>
        {/* Moon body */}
        <mesh ref={moonRef}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#F5F5DC"
            roughness={0.9}
            emissive="#F5F5DC"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Craters */}
        <mesh position={[0.2, 0.15, 0.42]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#D4D4AA" roughness={1} />
        </mesh>
        <mesh position={[-0.15, -0.1, 0.45]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#D4D4AA" roughness={1} />
        </mesh>
        <mesh position={[0.05, -0.25, 0.4]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#CCCCA8" roughness={1} />
        </mesh>

        {/* Inner glow */}
        <mesh scale={1.1}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#FFFFF0" transparent opacity={0.2} />
        </mesh>

        {/* Outer glow */}
        <mesh ref={glowRef} scale={1.3}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#F5F5DC" transparent opacity={0.1} />
        </mesh>

        {/* Twinkling stars */}
        <group ref={starsRef}>
          {[...Array(8)].map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i / 8) * Math.PI * 2) * 0.9,
                Math.sin((i / 8) * Math.PI * 2) * 0.7,
                -0.2
              ]}
            >
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          ))}
        </group>

        <pointLight color="#F5F5DC" intensity={0.8} distance={8} />
      </group>
    </Float>
  );
}

// ============================================================================
// FLUFFY 3D CLOUD
// ============================================================================

function Cloud3D({ dark = false, scale = 1 }: { dark?: boolean; scale?: number }) {
  const cloudRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (cloudRef.current) {
      cloudRef.current.position.x = Math.sin(t * 0.5) * 0.08;
      cloudRef.current.position.y = Math.sin(t * 0.7) * 0.04;

      const breathe = 1 + Math.sin(t * 1.2) * 0.05;
      cloudRef.current.scale.x = scale * breathe;
      cloudRef.current.scale.y = scale * (1 + Math.sin(t * 1.5) * 0.03);
      cloudRef.current.scale.z = scale;
    }
  });

  const color = dark ? '#6B7280' : '#FFFFFF';
  const shadowColor = dark ? '#4B5563' : '#E5E7EB';

  return (
    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.2}>
      <group ref={cloudRef}>
        {/* Main cloud puffs */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.4, 24, 24]} />
          <meshStandardMaterial color={color} roughness={1} />
        </mesh>
        <mesh position={[-0.35, -0.05, 0]}>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial color={color} roughness={1} />
        </mesh>
        <mesh position={[0.35, -0.05, 0]}>
          <sphereGeometry args={[0.32, 24, 24]} />
          <meshStandardMaterial color={color} roughness={1} />
        </mesh>
        <mesh position={[0.18, 0.15, 0]}>
          <sphereGeometry args={[0.28, 24, 24]} />
          <meshStandardMaterial color={color} roughness={1} />
        </mesh>
        <mesh position={[-0.15, 0.12, 0]}>
          <sphereGeometry args={[0.25, 24, 24]} />
          <meshStandardMaterial color={color} roughness={1} />
        </mesh>

        {/* Bottom shadow layer */}
        <mesh position={[0, -0.15, -0.1]}>
          <sphereGeometry args={[0.5, 24, 24]} />
          <meshStandardMaterial color={shadowColor} roughness={1} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

// ============================================================================
// RAIN WITH ANIMATED DROPS
// ============================================================================

function Rain3D({ heavy = false, scale = 1 }: { heavy?: boolean; scale?: number }) {
  const dropsRef = useRef<THREE.Group>(null);
  const dropCount = heavy ? 15 : 8;

  const drops = useMemo(() =>
    [...Array(dropCount)].map(() => ({
      x: (Math.random() - 0.5) * 1.2,
      delay: Math.random() * 2,
      speed: 1.5 + Math.random() * 0.8,
      size: 0.03 + Math.random() * 0.02,
    })), [dropCount]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (dropsRef.current) {
      dropsRef.current.children.forEach((drop, i) => {
        const data = drops[i];
        if (!data) return;

        const y = ((t * data.speed + data.delay) % 1.5) * 1.2;
        drop.position.y = 0.2 - y;
        drop.position.x = data.x + Math.sin(t * 2 + i) * 0.02;

        // Stretch drops based on speed
        drop.scale.y = 1 + data.speed * 0.3;
      });
    }
  });

  return (
    <group scale={scale}>
      {/* Dark cloud */}
      <group position={[0, 0.3, 0]} scale={0.7}>
        <Cloud3D dark />
      </group>

      {/* Rain drops */}
      <group ref={dropsRef}>
        {drops.map((drop, i) => (
          <mesh key={i} position={[drop.x, 0, 0.1]}>
            <capsuleGeometry args={[drop.size, 0.12, 4, 8]} />
            <meshBasicMaterial color="#60A5FA" transparent opacity={0.8} />
          </mesh>
        ))}
      </group>

      {/* Splash effects at bottom */}
      {[...Array(3)].map((_, i) => (
        <mesh key={`splash-${i}`} position={[(i - 1) * 0.4, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.05, 0.08, 16]} />
          <meshBasicMaterial color="#93C5FD" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// SNOW WITH FLOATING FLAKES
// ============================================================================

function Snow3D({ heavy = false, scale = 1 }: { heavy?: boolean; scale?: number }) {
  const flakesRef = useRef<THREE.Group>(null);
  const flakeCount = heavy ? 20 : 10;

  const flakes = useMemo(() =>
    [...Array(flakeCount)].map(() => ({
      x: (Math.random() - 0.5) * 1.4,
      delay: Math.random() * 3,
      speed: 0.3 + Math.random() * 0.2,
      drift: Math.random() * Math.PI * 2,
      size: 0.04 + Math.random() * 0.03,
      rotSpeed: (Math.random() - 0.5) * 2,
    })), [flakeCount]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (flakesRef.current) {
      flakesRef.current.children.forEach((flake, i) => {
        const data = flakes[i];
        if (!data) return;

        const y = ((t * data.speed + data.delay) % 1.5) * 1.2;
        flake.position.y = 0.3 - y;
        flake.position.x = data.x + Math.sin(t * 1.5 + data.drift) * 0.15;
        flake.rotation.z = t * data.rotSpeed;
        flake.rotation.y = t * data.rotSpeed * 0.5;
      });
    }
  });

  return (
    <group scale={scale}>
      {/* White cloud */}
      <group position={[0, 0.3, 0]} scale={0.7}>
        <Cloud3D />
      </group>

      {/* Snowflakes */}
      <group ref={flakesRef}>
        {flakes.map((flake, i) => (
          <group key={i} position={[flake.x, 0, 0.1]}>
            {/* 6-pointed snowflake */}
            {[...Array(3)].map((_, j) => (
              <mesh key={j} rotation={[0, 0, (j * Math.PI) / 3]}>
                <boxGeometry args={[flake.size * 3, flake.size * 0.5, 0.01]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    </group>
  );
}

// ============================================================================
// THUNDERSTORM WITH LIGHTNING
// ============================================================================

function Thunder3D({ scale = 1 }: { scale?: number }) {
  const [flash, setFlash] = useState(false);
  const lightningRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        setFlash(true);
        setTimeout(() => setFlash(false), 80);
        setTimeout(() => {
          if (Math.random() > 0.4) {
            setFlash(true);
            setTimeout(() => setFlash(false), 50);
          }
        }, 120);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <group scale={scale}>
      {/* Very dark cloud */}
      <group position={[0, 0.25, 0]} scale={0.75}>
        <Cloud3D dark />
      </group>

      {/* Lightning bolt */}
      <group ref={lightningRef} position={[0, -0.2, 0.15]} visible={flash}>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.08, 0.25, 0.02]} />
          <meshBasicMaterial color="#FFEB3B" />
        </mesh>
        <mesh position={[-0.06, -0.05, 0]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.06, 0.2, 0.02]} />
          <meshBasicMaterial color="#FFF59D" />
        </mesh>
        <mesh position={[0.02, -0.22, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.05, 0.18, 0.02]} />
          <meshBasicMaterial color="#FFEB3B" />
        </mesh>
      </group>

      {/* Flash light */}
      {flash && <pointLight position={[0, 0, 1]} color="#FFFFFF" intensity={5} distance={10} />}

      {/* Rain */}
      <group position={[0, -0.15, 0]} scale={0.6}>
        <Rain3D heavy />
      </group>
    </group>
  );
}

// ============================================================================
// FOG/MIST
// ============================================================================

function Fog3D({ scale = 1 }: { scale?: number }) {
  const layersRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (layersRef.current) {
      layersRef.current.children.forEach((layer, i) => {
        layer.position.x = Math.sin(t * 0.3 + i * 1.5) * 0.15;
        const opacity = 0.4 + Math.sin(t * 0.5 + i * 0.8) * 0.15;
        ((layer as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = opacity;
      });
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0} floatIntensity={0.15}>
      <group ref={layersRef} scale={scale}>
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[0, (i - 2) * 0.18, i * 0.05]}>
            <planeGeometry args={[1.6 - i * 0.15, 0.15]} />
            <meshBasicMaterial
              color="#9CA3AF"
              transparent
              opacity={0.5 - i * 0.08}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// ============================================================================
// PARTLY CLOUDY (SUN/MOON + CLOUD)
// ============================================================================

function PartlyCloudy3D({ isDay = true, scale = 1 }: { isDay?: boolean; scale?: number }) {
  return (
    <group scale={scale}>
      {/* Sun or Moon behind */}
      <group position={[0.25, 0.2, -0.3]} scale={0.55}>
        {isDay ? <Sun3D /> : <Moon3D />}
      </group>

      {/* Cloud in front */}
      <group position={[-0.1, -0.1, 0.2]} scale={0.65}>
        <Cloud3D />
      </group>
    </group>
  );
}

// ============================================================================
// DRIZZLE (LIGHT RAIN)
// ============================================================================

function Drizzle3D({ scale = 1 }: { scale?: number }) {
  const dropsRef = useRef<THREE.Group>(null);

  const drops = useMemo(() =>
    [...Array(6)].map(() => ({
      x: (Math.random() - 0.5) * 0.8,
      delay: Math.random() * 2,
      speed: 0.8 + Math.random() * 0.3,
    })), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (dropsRef.current) {
      dropsRef.current.children.forEach((drop, i) => {
        const data = drops[i];
        if (!data) return;

        const y = ((t * data.speed + data.delay) % 1.2) * 1;
        drop.position.y = 0.1 - y;
      });
    }
  });

  return (
    <group scale={scale}>
      <group position={[0, 0.25, 0]} scale={0.7}>
        <Cloud3D />
      </group>

      <group ref={dropsRef}>
        {drops.map((drop, i) => (
          <mesh key={i} position={[drop.x, 0, 0.1]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color="#93C5FD" transparent opacity={0.7} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ============================================================================
// WEATHER CODE MAPPING
// ============================================================================

function WeatherScene({ weatherCode, isDay }: { weatherCode: number; isDay: boolean }) {
  // Clear sky
  if (weatherCode === 0) {
    return isDay ? <Sun3D scale={1.1} /> : <Moon3D scale={1.1} />;
  }

  // Mainly clear
  if (weatherCode === 1) {
    return <PartlyCloudy3D isDay={isDay} scale={1.1} />;
  }

  // Partly cloudy
  if (weatherCode === 2) {
    return <PartlyCloudy3D isDay={isDay} scale={1.1} />;
  }

  // Overcast
  if (weatherCode === 3) {
    return <Cloud3D dark scale={1.1} />;
  }

  // Fog
  if (weatherCode >= 45 && weatherCode <= 48) {
    return <Fog3D scale={1.1} />;
  }

  // Drizzle
  if (weatherCode >= 51 && weatherCode <= 57) {
    return <Drizzle3D scale={1.1} />;
  }

  // Rain
  if (weatherCode >= 61 && weatherCode <= 65) {
    return <Rain3D heavy={weatherCode >= 63} scale={1.1} />;
  }

  // Freezing rain
  if (weatherCode >= 66 && weatherCode <= 67) {
    return <Rain3D heavy scale={1.1} />;
  }

  // Snow
  if (weatherCode >= 71 && weatherCode <= 77) {
    return <Snow3D heavy={weatherCode >= 73} scale={1.1} />;
  }

  // Rain showers
  if (weatherCode >= 80 && weatherCode <= 82) {
    return <Rain3D heavy={weatherCode >= 81} scale={1.1} />;
  }

  // Snow showers
  if (weatherCode >= 85 && weatherCode <= 86) {
    return <Snow3D heavy={weatherCode === 86} scale={1.1} />;
  }

  // Thunderstorm
  if (weatherCode >= 95 && weatherCode <= 99) {
    return <Thunder3D scale={1.1} />;
  }

  // Default
  return isDay ? <Sun3D scale={1.1} /> : <Moon3D scale={1.1} />;
}

// ============================================================================
// MAIN COMPONENTS
// ============================================================================

interface WeatherIcon3DProps {
  weatherCode: number;
  isDay?: boolean;
  size?: number;
}

export const WeatherIcon3D: React.FC<WeatherIcon3DProps> = ({
  weatherCode,
  isDay = true,
  size = 48,
}) => {
  return (
    <div style={{ width: size, height: size, minWidth: size, minHeight: size }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <WeatherScene weatherCode={weatherCode} isDay={isDay} />
      </Canvas>
    </div>
  );
};

export const WeatherIconHero: React.FC<WeatherIcon3DProps> = ({
  weatherCode,
  isDay = true,
  size = 120,
}) => {
  return (
    <div style={{
      width: size,
      height: size,
      minWidth: size,
      minHeight: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, 5]} intensity={0.4} />
        <WeatherScene weatherCode={weatherCode} isDay={isDay} />
      </Canvas>
    </div>
  );
};

export default WeatherIcon3D;
