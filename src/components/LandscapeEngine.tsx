import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sky, Cloud, Stars } from '@react-three/drei';
import * as THREE from 'three';

// ============================================================================
// LANDSCAPE CONFIGURATION TYPES
// ============================================================================

interface LandscapeConfig {
  id: number;
  name: string;
  // Terrain
  terrainColor: string;
  terrainRoughness: number;
  terrainHeight: number;
  terrainSegments: number;
  // Mountains
  hasMountains: boolean;
  mountainCount: number;
  mountainColor: string;
  mountainSnow: boolean;
  mountainHeight: number;
  // Water
  hasWater: boolean;
  waterColor: string;
  waterOpacity: number;
  waterLevel: number;
  isOcean: boolean;
  // Vegetation
  hasVegetation: boolean;
  vegetationType: 'none' | 'grass' | 'trees' | 'palms' | 'cactus' | 'snow_trees';
  vegetationDensity: number;
  vegetationColor: string;
  // Sky
  skyType: 'day' | 'night' | 'sunset' | 'sunrise' | 'overcast' | 'storm';
  sunPosition: [number, number, number];
  skyColor: string;
  fogColor: string;
  fogDensity: number;
  // Weather effects
  weatherType: 'clear' | 'cloudy' | 'rain' | 'heavy_rain' | 'snow' | 'heavy_snow' | 'storm' | 'fog' | 'mist';
  cloudDensity: number;
  cloudColor: string;
  precipitationIntensity: number;
  // Lighting
  ambientIntensity: number;
  sunIntensity: number;
  lightColor: string;
  // Special effects
  hasLightning: boolean;
  hasAurora: boolean;
  hasSandstorm: boolean;
  hasVolcano: boolean;
  // Temperature visual
  temperatureEffect: 'freezing' | 'cold' | 'cool' | 'mild' | 'warm' | 'hot' | 'extreme_heat';
}

// ============================================================================
// LANDSCAPE GENERATOR - Creates 100+ unique configurations
// ============================================================================

const generateLandscapeConfigs = (): LandscapeConfig[] => {
  const configs: LandscapeConfig[] = [];
  let id = 0;

  // Base biomes
  const biomes = [
    'tropical', 'desert', 'temperate', 'arctic', 'mountain',
    'coastal', 'forest', 'plains', 'volcanic', 'tundra'
  ];

  // Weather conditions
  const weathers = [
    'clear', 'cloudy', 'rain', 'heavy_rain', 'snow',
    'heavy_snow', 'storm', 'fog', 'mist'
  ] as const;

  // Time of day
  const times = ['day', 'night', 'sunset', 'sunrise'] as const;

  // Generate combinations
  biomes.forEach(biome => {
    weathers.forEach(weather => {
      times.forEach(time => {
        // Skip invalid combinations
        if (biome === 'arctic' && (weather === 'rain' || weather === 'heavy_rain')) return;
        if (biome === 'desert' && (weather === 'snow' || weather === 'heavy_snow')) return;
        if (biome === 'tropical' && (weather === 'snow' || weather === 'heavy_snow')) return;

        const config = createLandscapeConfig(id++, biome, weather, time);
        configs.push(config);
      });
    });
  });

  return configs;
};

const createLandscapeConfig = (
  id: number,
  biome: string,
  weather: LandscapeConfig['weatherType'],
  time: 'day' | 'night' | 'sunset' | 'sunrise'
): LandscapeConfig => {
  // Base configuration
  const config: LandscapeConfig = {
    id,
    name: `${biome}_${weather}_${time}`,
    terrainColor: '#4a7c59',
    terrainRoughness: 0.8,
    terrainHeight: 2,
    terrainSegments: 64,
    hasMountains: false,
    mountainCount: 3,
    mountainColor: '#6b6b6b',
    mountainSnow: false,
    mountainHeight: 5,
    hasWater: false,
    waterColor: '#4a90d9',
    waterOpacity: 0.7,
    waterLevel: -0.5,
    isOcean: false,
    hasVegetation: true,
    vegetationType: 'grass',
    vegetationDensity: 0.5,
    vegetationColor: '#2d5a27',
    skyType: time === 'day' ? 'day' : time === 'night' ? 'night' : time,
    sunPosition: [100, 50, 100],
    skyColor: '#87ceeb',
    fogColor: '#ffffff',
    fogDensity: 0.01,
    weatherType: weather,
    cloudDensity: 0,
    cloudColor: '#ffffff',
    precipitationIntensity: 0,
    ambientIntensity: 0.5,
    sunIntensity: 1,
    lightColor: '#ffffff',
    hasLightning: false,
    hasAurora: false,
    hasSandstorm: false,
    hasVolcano: false,
    temperatureEffect: 'mild',
  };

  // Biome-specific settings
  switch (biome) {
    case 'tropical':
      config.terrainColor = '#3d8b40';
      config.hasWater = true;
      config.waterColor = '#00bcd4';
      config.isOcean = true;
      config.vegetationType = 'palms';
      config.vegetationColor = '#1b5e20';
      config.vegetationDensity = 0.8;
      config.temperatureEffect = 'hot';
      config.skyColor = '#00bfff';
      break;

    case 'desert':
      config.terrainColor = '#d4a574';
      config.terrainRoughness = 0.3;
      config.hasVegetation = true;
      config.vegetationType = 'cactus';
      config.vegetationDensity = 0.1;
      config.vegetationColor = '#6b8e23';
      config.temperatureEffect = 'extreme_heat';
      config.skyColor = '#f4a460';
      config.fogColor = '#d4a574';
      config.hasSandstorm = weather === 'storm';
      break;

    case 'arctic':
      config.terrainColor = '#e8f4f8';
      config.terrainRoughness = 0.2;
      config.hasWater = true;
      config.waterColor = '#1a5276';
      config.waterOpacity = 0.9;
      config.hasMountains = true;
      config.mountainSnow = true;
      config.mountainColor = '#ffffff';
      config.hasVegetation = false;
      config.temperatureEffect = 'freezing';
      config.skyColor = '#b0c4de';
      config.hasAurora = time === 'night';
      break;

    case 'mountain':
      config.hasMountains = true;
      config.mountainCount = 5;
      config.mountainHeight = 8;
      config.mountainColor = '#5d5d5d';
      config.mountainSnow = true;
      config.terrainColor = '#4a6741';
      config.vegetationType = 'trees';
      config.vegetationDensity = 0.4;
      config.temperatureEffect = 'cold';
      break;

    case 'coastal':
      config.hasWater = true;
      config.isOcean = true;
      config.waterColor = '#1e90ff';
      config.waterLevel = -0.2;
      config.terrainColor = '#c2b280';
      config.vegetationType = 'grass';
      config.vegetationDensity = 0.3;
      config.temperatureEffect = 'mild';
      break;

    case 'forest':
      config.vegetationType = 'trees';
      config.vegetationDensity = 0.9;
      config.vegetationColor = '#1a472a';
      config.terrainColor = '#3d5c3d';
      config.hasMountains = true;
      config.mountainCount = 2;
      config.mountainHeight = 4;
      config.temperatureEffect = 'cool';
      config.fogDensity = 0.02;
      break;

    case 'plains':
      config.terrainColor = '#90a955';
      config.terrainHeight = 0.5;
      config.vegetationType = 'grass';
      config.vegetationDensity = 0.7;
      config.temperatureEffect = 'mild';
      break;

    case 'volcanic':
      config.terrainColor = '#2d2d2d';
      config.hasMountains = true;
      config.mountainColor = '#1a1a1a';
      config.mountainHeight = 6;
      config.hasVolcano = true;
      config.hasVegetation = false;
      config.skyColor = '#4a4a4a';
      config.fogColor = '#3d3d3d';
      config.fogDensity = 0.03;
      config.temperatureEffect = 'hot';
      break;

    case 'tundra':
      config.terrainColor = '#8fbc8f';
      config.vegetationType = 'grass';
      config.vegetationDensity = 0.2;
      config.vegetationColor = '#6b8e6b';
      config.temperatureEffect = 'cold';
      config.hasWater = true;
      config.waterColor = '#4682b4';
      break;
  }

  // Weather-specific settings
  switch (weather) {
    case 'clear':
      config.cloudDensity = 0;
      break;
    case 'cloudy':
      config.cloudDensity = 0.5;
      config.cloudColor = '#d3d3d3';
      config.ambientIntensity = 0.4;
      break;
    case 'rain':
      config.cloudDensity = 0.7;
      config.cloudColor = '#808080';
      config.precipitationIntensity = 0.5;
      config.ambientIntensity = 0.3;
      config.fogDensity = 0.02;
      break;
    case 'heavy_rain':
      config.cloudDensity = 0.9;
      config.cloudColor = '#4a4a4a';
      config.precipitationIntensity = 1;
      config.ambientIntensity = 0.2;
      config.fogDensity = 0.04;
      break;
    case 'snow':
      config.cloudDensity = 0.6;
      config.cloudColor = '#e0e0e0';
      config.precipitationIntensity = 0.5;
      config.ambientIntensity = 0.5;
      config.terrainColor = blendColors(config.terrainColor, '#ffffff', 0.3);
      break;
    case 'heavy_snow':
      config.cloudDensity = 0.8;
      config.cloudColor = '#c0c0c0';
      config.precipitationIntensity = 1;
      config.ambientIntensity = 0.4;
      config.terrainColor = blendColors(config.terrainColor, '#ffffff', 0.6);
      config.fogDensity = 0.03;
      break;
    case 'storm':
      config.cloudDensity = 1;
      config.cloudColor = '#2f2f2f';
      config.precipitationIntensity = 0.8;
      config.ambientIntensity = 0.15;
      config.hasLightning = true;
      config.fogDensity = 0.03;
      config.skyType = 'storm';
      break;
    case 'fog':
      config.fogDensity = 0.08;
      config.fogColor = '#c0c0c0';
      config.ambientIntensity = 0.4;
      config.cloudDensity = 0.3;
      break;
    case 'mist':
      config.fogDensity = 0.04;
      config.fogColor = '#e0e0e0';
      config.ambientIntensity = 0.5;
      break;
  }

  // Time-specific settings
  switch (time) {
    case 'day':
      config.sunPosition = [100, 80, 50];
      config.sunIntensity = 1;
      config.lightColor = '#fffaf0';
      break;
    case 'night':
      config.sunPosition = [-100, -50, -50];
      config.sunIntensity = 0.1;
      config.ambientIntensity *= 0.3;
      config.lightColor = '#4169e1';
      config.skyColor = '#0a0a2e';
      break;
    case 'sunset':
      config.sunPosition = [100, 10, 50];
      config.sunIntensity = 0.7;
      config.lightColor = '#ff7f50';
      config.skyColor = '#ff6b6b';
      break;
    case 'sunrise':
      config.sunPosition = [-100, 15, 50];
      config.sunIntensity = 0.6;
      config.lightColor = '#ffb347';
      config.skyColor = '#ffd700';
      break;
  }

  return config;
};

// Color blending utility
const blendColors = (color1: string, color2: string, ratio: number): string => {
  const hex = (c: string) => parseInt(c.slice(1), 16);
  const r = (h: number) => (h >> 16) & 255;
  const g = (h: number) => (h >> 8) & 255;
  const b = (h: number) => h & 255;

  const h1 = hex(color1);
  const h2 = hex(color2);

  const nr = Math.round(r(h1) * (1 - ratio) + r(h2) * ratio);
  const ng = Math.round(g(h1) * (1 - ratio) + g(h2) * ratio);
  const nb = Math.round(b(h1) * (1 - ratio) + b(h2) * ratio);

  return `#${((nr << 16) | (ng << 8) | nb).toString(16).padStart(6, '0')}`;
};

// ============================================================================
// WEATHER TO LANDSCAPE MAPPING
// ============================================================================

export interface WeatherParams {
  temperature: number;
  weatherCode: number;
  isDay: boolean;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  cloudCover: number;
  visibility: number;
}

export const selectLandscape = (params: WeatherParams): LandscapeConfig => {
  const configs = generateLandscapeConfigs();

  // Determine biome from temperature
  let targetBiome: string;
  if (params.temperature <= -10) targetBiome = 'arctic';
  else if (params.temperature <= 0) targetBiome = 'tundra';
  else if (params.temperature <= 10) targetBiome = 'mountain';
  else if (params.temperature <= 15) targetBiome = 'forest';
  else if (params.temperature <= 25) targetBiome = 'temperate';
  else if (params.temperature <= 30) targetBiome = 'coastal';
  else if (params.temperature <= 35) targetBiome = 'tropical';
  else targetBiome = 'desert';

  // Determine weather type from code
  let targetWeather: LandscapeConfig['weatherType'];
  const code = params.weatherCode;

  if (code === 0) targetWeather = 'clear';
  else if (code <= 3) targetWeather = 'cloudy';
  else if (code >= 45 && code <= 48) targetWeather = 'fog';
  else if (code >= 51 && code <= 55) targetWeather = 'mist';
  else if (code >= 56 && code <= 57) targetWeather = 'rain';
  else if (code >= 61 && code <= 63) targetWeather = 'rain';
  else if (code >= 65 && code <= 67) targetWeather = 'heavy_rain';
  else if (code >= 71 && code <= 73) targetWeather = 'snow';
  else if (code >= 75 && code <= 77) targetWeather = 'heavy_snow';
  else if (code >= 80 && code <= 82) targetWeather = 'rain';
  else if (code >= 85 && code <= 86) targetWeather = 'snow';
  else if (code >= 95 && code <= 99) targetWeather = 'storm';
  else targetWeather = 'cloudy';

  // Determine time
  const targetTime = params.isDay ? 'day' : 'night';

  // Find best matching config
  let bestMatch = configs[0];
  let bestScore = -1;

  configs.forEach(config => {
    let score = 0;

    if (config.name.includes(targetBiome)) score += 10;
    if (config.weatherType === targetWeather) score += 5;
    if (config.skyType === targetTime ||
        (targetTime === 'day' && ['day', 'sunrise', 'sunset'].includes(config.skyType)) ||
        (targetTime === 'night' && config.skyType === 'night')) score += 3;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = config;
    }
  });

  return bestMatch;
};

// ============================================================================
// 3D LANDSCAPE COMPONENTS
// ============================================================================

// Animated Terrain
const AnimatedTerrain: React.FC<{ config: LandscapeConfig }> = ({ config }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(
      50, 50,
      config.terrainSegments,
      config.terrainSegments
    );

    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const height =
        Math.sin(x * 0.1) * Math.cos(y * 0.1) * config.terrainHeight +
        Math.sin(x * 0.3 + y * 0.2) * config.terrainHeight * 0.5 +
        (Math.random() - 0.5) * config.terrainRoughness;
      positions.setZ(i, height);
    }

    geo.computeVertexNormals();
    return geo;
  }, [config]);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial
        color={config.terrainColor}
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
};

// Animated Mountains
const AnimatedMountains: React.FC<{ config: LandscapeConfig }> = ({ config }) => {
  if (!config.hasMountains) return null;

  const mountains = useMemo(() => {
    const mts = [];
    for (let i = 0; i < config.mountainCount; i++) {
      const angle = (i / config.mountainCount) * Math.PI + Math.PI * 0.5;
      const distance = 15 + Math.random() * 10;
      mts.push({
        position: [
          Math.cos(angle) * distance,
          config.mountainHeight * 0.5 - 2,
          Math.sin(angle) * distance - 10
        ] as [number, number, number],
        scale: 0.8 + Math.random() * 0.4,
        height: config.mountainHeight * (0.7 + Math.random() * 0.6),
      });
    }
    return mts;
  }, [config]);

  return (
    <group>
      {mountains.map((mt, i) => (
        <group key={i} position={mt.position}>
          <mesh castShadow>
            <coneGeometry args={[3 * mt.scale, mt.height, 8]} />
            <meshStandardMaterial color={config.mountainColor} roughness={0.9} />
          </mesh>
          {config.mountainSnow && (
            <mesh position={[0, mt.height * 0.3, 0]}>
              <coneGeometry args={[1.5 * mt.scale, mt.height * 0.4, 8]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
};

// Animated Water
const AnimatedWater: React.FC<{ config: LandscapeConfig }> = ({ config }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const geo = meshRef.current.geometry as THREE.PlaneGeometry;
      const positions = geo.attributes.position;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const wave = Math.sin(x * 0.5 + time) * 0.1 + Math.cos(y * 0.3 + time * 0.7) * 0.1;
        positions.setZ(i, wave);
      }
      positions.needsUpdate = true;
    }
  });

  if (!config.hasWater) return null;

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, config.waterLevel, config.isOcean ? 10 : 0]}
    >
      <planeGeometry args={[config.isOcean ? 100 : 30, config.isOcean ? 50 : 20, 32, 32]} />
      <meshStandardMaterial
        color={config.waterColor}
        transparent
        opacity={config.waterOpacity}
        roughness={0.1}
        metalness={0.3}
      />
    </mesh>
  );
};

// Rain Effect
const RainEffect: React.FC<{ intensity: number }> = ({ intensity }) => {
  const rainRef = useRef<THREE.Points>(null);
  const count = Math.floor(intensity * 5000);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = Math.random() * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
      vel[i] = 0.2 + Math.random() * 0.3;
    }

    return [pos, vel];
  }, [count]);

  useFrame(() => {
    if (rainRef.current) {
      const positions = rainRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] -= velocities[i];
        if (positions[i * 3 + 1] < -2) {
          positions[i * 3 + 1] = 30;
        }
      }

      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (intensity === 0) return null;

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
        color="#88ccff"
        size={0.1}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Snow Effect
const SnowEffect: React.FC<{ intensity: number }> = ({ intensity }) => {
  const snowRef = useRef<THREE.Points>(null);
  const count = Math.floor(intensity * 3000);

  const [positions, velocities, drifts] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    const dft = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = Math.random() * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
      vel[i] = 0.03 + Math.random() * 0.05;
      dft[i] = Math.random() * Math.PI * 2;
    }

    return [pos, vel, dft];
  }, [count]);

  useFrame((state) => {
    if (snowRef.current) {
      const positions = snowRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < count; i++) {
        positions[i * 3] += Math.sin(time + drifts[i]) * 0.01;
        positions[i * 3 + 1] -= velocities[i];
        positions[i * 3 + 2] += Math.cos(time * 0.7 + drifts[i]) * 0.01;

        if (positions[i * 3 + 1] < -2) {
          positions[i * 3 + 1] = 30;
        }
      }

      snowRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (intensity === 0) return null;

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
        size={0.15}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Lightning Effect
const LightningEffect: React.FC<{ active: boolean }> = ({ active }) => {
  const lightRef = useRef<THREE.PointLight>(null);
  const [flash, setFlash] = React.useState(false);

  useEffect(() => {
    if (!active) return;

    const flashInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setFlash(true);
        setTimeout(() => setFlash(false), 100);
        setTimeout(() => {
          if (Math.random() > 0.5) {
            setFlash(true);
            setTimeout(() => setFlash(false), 50);
          }
        }, 150);
      }
    }, 2000);

    return () => clearInterval(flashInterval);
  }, [active]);

  if (!active) return null;

  return (
    <pointLight
      ref={lightRef}
      position={[0, 20, 0]}
      intensity={flash ? 50 : 0}
      color="#ffffff"
      distance={100}
    />
  );
};

// Aurora Effect
const AuroraEffect: React.FC<{ active: boolean }> = ({ active }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = state.clock.elapsedTime;
      }
    }
  });

  if (!active) return null;

  return (
    <mesh ref={meshRef} position={[0, 15, -20]} rotation={[0.3, 0, 0]}>
      <planeGeometry args={[60, 20, 32, 32]} />
      <shaderMaterial
        transparent
        uniforms={{
          time: { value: 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          uniform float time;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 0.5 + time) * 2.0;
            pos.y += cos(pos.x * 0.3 + time * 0.5) * 1.0;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float time;
          void main() {
            vec3 green = vec3(0.0, 1.0, 0.5);
            vec3 purple = vec3(0.5, 0.0, 1.0);
            float mixer = sin(vUv.x * 10.0 + time) * 0.5 + 0.5;
            vec3 color = mix(green, purple, mixer);
            float alpha = (1.0 - vUv.y) * 0.5 * (sin(vUv.x * 5.0 + time) * 0.3 + 0.7);
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
};

// Animated Sun with enhanced effects
const AnimatedSun: React.FC<{ position: [number, number, number]; intensity: number }> = ({ position, intensity }) => {
  const sunRef = useRef<THREE.Group>(null);
  const raysRef = useRef<THREE.Group>(null);
  const innerRaysRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (sunRef.current) {
      // Gentle rotation
      sunRef.current.rotation.z = time * 0.05;
      // Pulsating scale
      const pulse = 1 + Math.sin(time * 1.5) * 0.03;
      sunRef.current.scale.setScalar(pulse);
    }

    if (raysRef.current) {
      // Outer rays rotate slowly
      raysRef.current.rotation.z = -time * 0.08;
      // Pulsating rays
      const rayPulse = 1 + Math.sin(time * 2) * 0.1;
      raysRef.current.scale.setScalar(rayPulse);
    }

    if (innerRaysRef.current) {
      // Inner rays rotate opposite direction
      innerRaysRef.current.rotation.z = time * 0.15;
      const innerPulse = 1 + Math.cos(time * 3) * 0.08;
      innerRaysRef.current.scale.setScalar(innerPulse);
    }

    if (glowRef.current) {
      // Pulsating glow
      const glowPulse = 1 + Math.sin(time * 0.8) * 0.15;
      glowRef.current.scale.setScalar(glowPulse);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + Math.sin(time) * 0.05;
    }

    if (coronaRef.current) {
      // Corona flicker
      const coronaScale = 1 + Math.sin(time * 4) * 0.02 + Math.sin(time * 7) * 0.01;
      coronaRef.current.scale.setScalar(coronaScale);
    }
  });

  if (intensity < 0.3) return null;

  const scaledPosition: [number, number, number] = [
    position[0] * 0.3,
    position[1] * 0.3 + 10,
    position[2] * 0.3 - 20
  ];

  return (
    <Float speed={0.3} floatIntensity={0.15}>
      <group ref={sunRef} position={scaledPosition}>
        {/* Core sun */}
        <mesh>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial color="#ffd93d" />
        </mesh>

        {/* Inner glow layer */}
        <mesh scale={1.1}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial color="#ffeb3b" transparent opacity={0.5} />
        </mesh>

        {/* Corona effect */}
        <mesh ref={coronaRef} scale={1.25}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial color="#fff4b0" transparent opacity={0.25} />
        </mesh>

        {/* Outer glow */}
        <mesh ref={glowRef} scale={1.8}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial color="#ffff88" transparent opacity={0.15} />
        </mesh>

        {/* Inner short rays */}
        <group ref={innerRaysRef}>
          {[...Array(8)].map((_, i) => (
            <mesh key={`inner-${i}`} rotation={[0, 0, (i * Math.PI) / 4]}>
              <boxGeometry args={[0.4, 4.5, 0.1]} />
              <meshBasicMaterial color="#fff59d" transparent opacity={0.7} />
            </mesh>
          ))}
        </group>

        {/* Outer long rays */}
        <group ref={raysRef}>
          {[...Array(12)].map((_, i) => (
            <mesh key={`outer-${i}`} rotation={[0, 0, (i * Math.PI) / 6]}>
              <boxGeometry args={[0.25, 7, 0.1]} />
              <meshBasicMaterial color="#ffd93d" transparent opacity={0.5} />
            </mesh>
          ))}
        </group>

        {/* Light source */}
        <pointLight color="#ffd93d" intensity={intensity * 2.5} distance={60} />
      </group>
    </Float>
  );
};

// Animated Moon with enhanced glow and phases
const AnimatedMoon: React.FC<{ active: boolean }> = ({ active }) => {
  const moonRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const starsNearRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (moonRef.current) {
      // Slow rotation
      moonRef.current.rotation.y = time * 0.03;
      // Gentle wobble
      moonRef.current.rotation.x = Math.sin(time * 0.5) * 0.02;
    }

    if (glowRef.current) {
      // Pulsating glow
      const glowPulse = 1 + Math.sin(time * 0.6) * 0.1;
      glowRef.current.scale.setScalar(glowPulse);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + Math.sin(time * 0.8) * 0.05;
    }

    if (haloRef.current) {
      // Slowly rotating halo
      haloRef.current.rotation.z = time * 0.02;
      const haloPulse = 1 + Math.sin(time * 0.4) * 0.05;
      haloRef.current.scale.setScalar(haloPulse);
    }

    // Twinkling stars near moon
    if (starsNearRef.current) {
      starsNearRef.current.children.forEach((star, i) => {
        const twinkle = 0.5 + Math.sin(time * 3 + i * 2) * 0.5;
        (star as THREE.Mesh).scale.setScalar(twinkle);
      });
    }
  });

  if (!active) return null;

  return (
    <Float speed={0.2} floatIntensity={0.08}>
      <group position={[15, 18, -25]}>
        {/* Main moon sphere */}
        <mesh ref={moonRef}>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshStandardMaterial
            color="#f5f5dc"
            roughness={0.8}
            emissive="#f5f5dc"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Moon craters */}
        <mesh position={[0.8, 0.8, 2]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#d4d4aa" roughness={1} />
        </mesh>
        <mesh position={[-1, -0.5, 1.8]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#d4d4aa" roughness={1} />
        </mesh>
        <mesh position={[0.3, -0.9, 2.2]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#ccc8a8" roughness={1} />
        </mesh>

        {/* Inner glow */}
        <mesh scale={1.1}>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshBasicMaterial color="#fffff0" transparent opacity={0.15} />
        </mesh>

        {/* Outer glow */}
        <mesh ref={glowRef} scale={1.4}>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshBasicMaterial color="#f5f5dc" transparent opacity={0.1} />
        </mesh>

        {/* Halo ring */}
        <mesh ref={haloRef} scale={2}>
          <ringGeometry args={[2.6, 3.2, 64]} />
          <meshBasicMaterial color="#f0f0e0" transparent opacity={0.05} side={THREE.DoubleSide} />
        </mesh>

        {/* Twinkling stars near moon */}
        <group ref={starsNearRef}>
          {[...Array(8)].map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i / 8) * Math.PI * 2) * 6 + (Math.random() - 0.5) * 2,
                Math.sin((i / 8) * Math.PI * 2) * 4 + (Math.random() - 0.5) * 2,
                -2 + Math.random()
              ]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          ))}
        </group>

        {/* Moon light */}
        <pointLight color="#f5f5dc" intensity={0.6} distance={35} />
      </group>
    </Float>
  );
};

// Animated Clouds with enhanced dynamics
const AnimatedClouds: React.FC<{ density: number; color: string; isStorm: boolean }> = ({ density, color, isStorm }) => {
  const cloudsRef = useRef<THREE.Group>(null);
  const cloudDataRef = useRef<Array<{
    baseY: number;
    speed: number;
    drift: number;
    phase: number;
    scaleBase: number;
  }>>([]);

  // Initialize cloud data
  const cloudCount = Math.floor(density * 15);

  if (cloudDataRef.current.length !== cloudCount) {
    cloudDataRef.current = [...Array(cloudCount)].map(() => ({
      baseY: 10 + Math.random() * 8,
      speed: (0.01 + Math.random() * 0.02) * (isStorm ? 2 : 1),
      drift: Math.random() * Math.PI * 2,
      phase: Math.random() * Math.PI * 2,
      scaleBase: 0.8 + Math.random() * 0.4,
    }));
  }

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (cloudsRef.current) {
      cloudsRef.current.children.forEach((cloud, i) => {
        const data = cloudDataRef.current[i];
        if (!data) return;

        // Horizontal movement with varying speeds
        const direction = i % 2 === 0 ? 1 : -1;
        cloud.position.x += data.speed * direction;

        // Wrap around
        if (cloud.position.x > 35) cloud.position.x = -35;
        if (cloud.position.x < -35) cloud.position.x = 35;

        // Vertical bobbing
        cloud.position.y = data.baseY + Math.sin(time * 0.5 + data.phase) * 0.3;

        // Subtle Z drift
        cloud.position.z += Math.sin(time * 0.3 + data.drift) * 0.005;

        // Breathing scale effect
        const breathe = 1 + Math.sin(time * 0.8 + data.phase) * 0.05;
        cloud.scale.setScalar(data.scaleBase * breathe);

        // Storm clouds move faster and are more turbulent
        if (isStorm) {
          cloud.position.y += Math.sin(time * 2 + data.phase) * 0.1;
          cloud.rotation.y = Math.sin(time * 0.5 + data.drift) * 0.1;
        }
      });
    }
  });

  if (density === 0) return null;

  return (
    <group ref={cloudsRef}>
      {[...Array(cloudCount)].map((_, i) => (
        <Cloud
          key={i}
          position={[
            (Math.random() - 0.5) * 60,
            cloudDataRef.current[i]?.baseY ?? 12,
            (Math.random() - 0.5) * 30 - 10
          ]}
          speed={isStorm ? 0.8 : 0.3}
          opacity={isStorm ? 0.95 : 0.75}
          color={color}
          segments={isStorm ? 30 : 20}
          bounds={isStorm ? [8, 3, 4] : [6, 2, 3]}
          volume={isStorm ? 8 : 5}
        />
      ))}
    </group>
  );
};

// Animated Vegetation with wind effects
const Vegetation: React.FC<{ config: LandscapeConfig; windSpeed?: number }> = ({ config, windSpeed = 10 }) => {
  const groupRef = useRef<THREE.Group>(null);

  const items = useMemo(() => {
    const count = Math.floor(config.vegetationDensity * 100);
    const result = [];

    for (let i = 0; i < count; i++) {
      result.push({
        position: [
          (Math.random() - 0.5) * 40,
          -1.5,
          (Math.random() - 0.5) * 30
        ] as [number, number, number],
        scale: 0.5 + Math.random() * 0.5,
        rotation: Math.random() * Math.PI * 2,
        windPhase: Math.random() * Math.PI * 2,
        windSensitivity: 0.5 + Math.random() * 0.5,
      });
    }

    return result;
  }, [config.vegetationDensity]);

  // Normalize wind speed for animation (0-1 range)
  const windIntensity = Math.min(windSpeed / 50, 1);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.children.forEach((item, i) => {
        const data = items[i];
        if (!data) return;

        // Wind sway effect
        const windSway = Math.sin(time * 2 + data.windPhase) * windIntensity * data.windSensitivity * 0.15;
        const gustEffect = Math.sin(time * 5 + data.windPhase * 2) * windIntensity * 0.05;

        item.rotation.z = windSway + gustEffect;
        item.rotation.x = windSway * 0.3;

        // Subtle scale pulse for grass
        if (config.vegetationType === 'grass') {
          const scaleWave = 1 + Math.sin(time * 3 + data.windPhase) * 0.05 * windIntensity;
          item.scale.y = data.scale * 2 * scaleWave;
        }
      });
    }
  });

  if (!config.hasVegetation || config.vegetationType === 'none') return null;

  const renderItem = (item: typeof items[0], index: number) => {
    switch (config.vegetationType) {
      case 'trees':
        return (
          <group key={index} position={item.position} rotation={[0, item.rotation, 0]} scale={item.scale}>
            {/* Tree foliage with multiple layers */}
            <mesh position={[0, 2.2, 0]}>
              <coneGeometry args={[0.6, 1.5, 8]} />
              <meshStandardMaterial color={config.vegetationColor} />
            </mesh>
            <mesh position={[0, 1.5, 0]}>
              <coneGeometry args={[0.8, 2, 8]} />
              <meshStandardMaterial color={config.vegetationColor} />
            </mesh>
            <mesh position={[0, 0.8, 0]}>
              <coneGeometry args={[1, 2, 8]} />
              <meshStandardMaterial color={config.vegetationColor} />
            </mesh>
            {/* Trunk */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.22, 1.2, 8]} />
              <meshStandardMaterial color="#4a3728" />
            </mesh>
          </group>
        );
      case 'palms':
        return (
          <group key={index} position={item.position} rotation={[0, item.rotation, 0]} scale={item.scale}>
            {/* Palm fronds */}
            {[...Array(6)].map((_, j) => (
              <mesh
                key={j}
                position={[
                  Math.cos((j / 6) * Math.PI * 2) * 0.3,
                  2.3,
                  Math.sin((j / 6) * Math.PI * 2) * 0.3
                ]}
                rotation={[0.8, (j / 6) * Math.PI * 2, 0]}
              >
                <boxGeometry args={[0.15, 1.5, 0.02]} />
                <meshStandardMaterial color={config.vegetationColor} />
              </mesh>
            ))}
            {/* Trunk */}
            <mesh position={[0, 1, 0]}>
              <cylinderGeometry args={[0.08, 0.15, 2.5, 8]} />
              <meshStandardMaterial color="#8b7355" />
            </mesh>
          </group>
        );
      case 'cactus':
        return (
          <group key={index} position={item.position} rotation={[0, item.rotation, 0]} scale={item.scale}>
            <mesh position={[0, 1, 0]}>
              <cylinderGeometry args={[0.2, 0.25, 2, 8]} />
              <meshStandardMaterial color={config.vegetationColor} />
            </mesh>
            {/* Arms */}
            <mesh position={[0.35, 1.3, 0]} rotation={[0, 0, -0.6]}>
              <cylinderGeometry args={[0.1, 0.12, 0.9, 8]} />
              <meshStandardMaterial color={config.vegetationColor} />
            </mesh>
            <mesh position={[-0.3, 0.9, 0]} rotation={[0, 0, 0.5]}>
              <cylinderGeometry args={[0.08, 0.1, 0.6, 8]} />
              <meshStandardMaterial color={config.vegetationColor} />
            </mesh>
          </group>
        );
      case 'grass':
      default:
        return (
          <group key={index} position={item.position}>
            {/* Multiple grass blades */}
            {[...Array(3)].map((_, j) => (
              <mesh
                key={j}
                position={[(j - 1) * 0.05, 0, (j - 1) * 0.03]}
                scale={[item.scale * (0.8 + j * 0.1), item.scale * 2 * (0.9 + j * 0.1), item.scale]}
                rotation={[0, item.rotation + j * 0.3, 0]}
              >
                <coneGeometry args={[0.08, 0.5, 4]} />
                <meshStandardMaterial color={config.vegetationColor} />
              </mesh>
            ))}
          </group>
        );
    }
  };

  return <group ref={groupRef}>{items.map(renderItem)}</group>;
};

// Scene Setup
const SceneSetup: React.FC<{ config: LandscapeConfig }> = ({ config }) => {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.FogExp2(config.fogColor, config.fogDensity);
    scene.background = new THREE.Color(config.skyColor);
  }, [config, scene]);

  return null;
};

// ============================================================================
// MAIN LANDSCAPE COMPONENT
// ============================================================================

interface LandscapeEngineProps {
  weatherParams: WeatherParams;
  className?: string;
}

export const LandscapeEngine: React.FC<LandscapeEngineProps> = ({ weatherParams, className }) => {
  const config = useMemo(() => selectLandscape(weatherParams), [weatherParams]);
  const isSnow = config.weatherType === 'snow' || config.weatherType === 'heavy_snow';
  const isRain = config.weatherType === 'rain' || config.weatherType === 'heavy_rain' || config.weatherType === 'storm';

  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [0, 5, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        shadows
      >
        <SceneSetup config={config} />

        {/* Lighting */}
        <ambientLight intensity={config.ambientIntensity} color={config.lightColor} />
        <directionalLight
          position={config.sunPosition}
          intensity={config.sunIntensity}
          color={config.lightColor}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        {/* Sky */}
        {config.skyType === 'day' && (
          <Sky sunPosition={config.sunPosition} turbidity={8} rayleigh={2} />
        )}
        {config.skyType === 'night' && (
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        )}

        {/* Celestial Bodies */}
        <AnimatedSun position={config.sunPosition} intensity={config.sunIntensity} />
        <AnimatedMoon active={config.skyType === 'night'} />

        {/* Terrain & Environment */}
        <AnimatedTerrain config={config} />
        <AnimatedMountains config={config} />
        <AnimatedWater config={config} />
        <Vegetation config={config} windSpeed={weatherParams.windSpeed} />

        {/* Weather Effects */}
        <AnimatedClouds
          density={config.cloudDensity}
          color={config.cloudColor}
          isStorm={config.weatherType === 'storm'}
        />
        {isRain && <RainEffect intensity={config.precipitationIntensity} />}
        {isSnow && <SnowEffect intensity={config.precipitationIntensity} />}
        <LightningEffect active={config.hasLightning} />
        <AuroraEffect active={config.hasAurora} />
      </Canvas>
    </div>
  );
};

export { generateLandscapeConfigs };
export type { LandscapeConfig };
