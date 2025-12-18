import React from 'react';

// ============================================================================
// ANIMATED SVG WEATHER ICONS - Beautiful and performant
// ============================================================================

interface IconProps {
  size?: number;
  className?: string;
}

// Animated Sun
export const AnimatedSun: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`weather-icon ${className}`}
  >
    <defs>
      <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="70%" stopColor="#FFA500" />
        <stop offset="100%" stopColor="#FF8C00" />
      </radialGradient>
      <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Outer glow */}
    <circle cx="50" cy="50" r="28" fill="#FFD700" opacity="0.3">
      <animate attributeName="r" values="28;32;28" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Rays */}
    <g filter="url(#sunGlow)">
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="10"
          x2="50"
          y2="20"
          stroke="#FFD700"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${i * 30} 50 50)`}
        >
          <animate
            attributeName="y1"
            values="10;8;10"
            dur="1.5s"
            begin={`${i * 0.1}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}
    </g>

    {/* Sun body */}
    <circle cx="50" cy="50" r="22" fill="url(#sunGradient)" filter="url(#sunGlow)">
      <animate attributeName="r" values="22;23;22" dur="2s" repeatCount="indefinite" />
    </circle>

    <style>{`
      .weather-icon { filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
    `}</style>
  </svg>
);

// Animated Moon
export const AnimatedMoon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`weather-icon ${className}`}
  >
    <defs>
      <radialGradient id="moonGradient" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFFACD" />
        <stop offset="100%" stopColor="#F0E68C" />
      </radialGradient>
      <filter id="moonGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Glow */}
    <circle cx="50" cy="50" r="30" fill="#FFFACD" opacity="0.2">
      <animate attributeName="r" values="30;34;30" dur="3s" repeatCount="indefinite" />
    </circle>

    {/* Moon body */}
    <circle cx="50" cy="50" r="24" fill="url(#moonGradient)" filter="url(#moonGlow)" />

    {/* Craters */}
    <circle cx="42" cy="45" r="5" fill="#DAA520" opacity="0.3" />
    <circle cx="58" cy="55" r="3" fill="#DAA520" opacity="0.25" />
    <circle cx="52" cy="40" r="2.5" fill="#DAA520" opacity="0.2" />

    {/* Stars */}
    {[
      { x: 15, y: 20, delay: '0s' },
      { x: 82, y: 25, delay: '0.5s' },
      { x: 20, y: 75, delay: '1s' },
      { x: 85, y: 70, delay: '1.5s' },
      { x: 75, y: 15, delay: '0.3s' },
    ].map((star, i) => (
      <circle key={i} cx={star.x} cy={star.y} r="1.5" fill="#FFFFFF">
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="2s"
          begin={star.delay}
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="1.5;2;1.5"
          dur="2s"
          begin={star.delay}
          repeatCount="indefinite"
        />
      </circle>
    ))}
  </svg>
);

// Animated Cloud
export const AnimatedCloud: React.FC<IconProps & { dark?: boolean }> = ({
  size = 48,
  className = '',
  dark = false
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`weather-icon ${className}`}
  >
    <defs>
      <linearGradient id={dark ? "darkCloudGrad" : "cloudGrad"} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={dark ? "#6B7280" : "#FFFFFF"} />
        <stop offset="100%" stopColor={dark ? "#4B5563" : "#E5E7EB"} />
      </linearGradient>
      <filter id="cloudShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
      </filter>
    </defs>

    <g filter="url(#cloudShadow)">
      <ellipse cx="50" cy="55" rx="30" ry="18" fill={`url(#${dark ? "darkCloudGrad" : "cloudGrad"})`}>
        <animate attributeName="cx" values="50;52;50" dur="4s" repeatCount="indefinite" />
      </ellipse>
      <circle cx="35" cy="50" r="16" fill={`url(#${dark ? "darkCloudGrad" : "cloudGrad"})`}>
        <animate attributeName="cx" values="35;37;35" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="55" cy="45" r="18" fill={`url(#${dark ? "darkCloudGrad" : "cloudGrad"})`}>
        <animate attributeName="cx" values="55;57;55" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="70" cy="52" r="14" fill={`url(#${dark ? "darkCloudGrad" : "cloudGrad"})`}>
        <animate attributeName="cx" values="70;72;70" dur="4s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);

// Animated Rain
export const AnimatedRain: React.FC<IconProps & { heavy?: boolean }> = ({
  size = 48,
  className = '',
  heavy = false
}) => {
  const dropCount = heavy ? 8 : 5;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`weather-icon ${className}`}
    >
      <defs>
        <linearGradient id="rainCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6B7280" />
          <stop offset="100%" stopColor="#4B5563" />
        </linearGradient>
        <linearGradient id="rainDrop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      {/* Cloud */}
      <g transform="translate(0, -10) scale(0.8)">
        <ellipse cx="50" cy="45" rx="28" ry="16" fill="url(#rainCloudGrad)" />
        <circle cx="35" cy="40" r="14" fill="url(#rainCloudGrad)" />
        <circle cx="55" cy="35" r="16" fill="url(#rainCloudGrad)" />
        <circle cx="68" cy="42" r="12" fill="url(#rainCloudGrad)" />
      </g>

      {/* Rain drops */}
      {[...Array(dropCount)].map((_, i) => {
        const x = 25 + (i * 50 / dropCount) + (i % 2) * 5;
        return (
          <ellipse
            key={i}
            cx={x}
            cy="55"
            rx="2"
            ry="6"
            fill="url(#rainDrop)"
          >
            <animate
              attributeName="cy"
              values="55;90;55"
              dur={`${0.6 + (i % 3) * 0.2}s`}
              begin={`${i * 0.1}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur={`${0.6 + (i % 3) * 0.2}s`}
              begin={`${i * 0.1}s`}
              repeatCount="indefinite"
            />
          </ellipse>
        );
      })}
    </svg>
  );
};

// Animated Snow
export const AnimatedSnow: React.FC<IconProps & { heavy?: boolean }> = ({
  size = 48,
  className = '',
  heavy = false
}) => {
  const flakeCount = heavy ? 8 : 5;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`weather-icon ${className}`}
    >
      <defs>
        <linearGradient id="snowCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E5E7EB" />
          <stop offset="100%" stopColor="#D1D5DB" />
        </linearGradient>
      </defs>

      {/* Cloud */}
      <g transform="translate(0, -10) scale(0.8)">
        <ellipse cx="50" cy="45" rx="28" ry="16" fill="url(#snowCloudGrad)" />
        <circle cx="35" cy="40" r="14" fill="url(#snowCloudGrad)" />
        <circle cx="55" cy="35" r="16" fill="url(#snowCloudGrad)" />
        <circle cx="68" cy="42" r="12" fill="url(#snowCloudGrad)" />
      </g>

      {/* Snowflakes */}
      {[...Array(flakeCount)].map((_, i) => {
        const x = 25 + (i * 50 / flakeCount) + (i % 2) * 5;
        return (
          <g key={i}>
            <circle cx={x} cy="55" r="3" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.5">
              <animate
                attributeName="cy"
                values="55;88;55"
                dur={`${1.5 + (i % 3) * 0.5}s`}
                begin={`${i * 0.2}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cx"
                values={`${x};${x + 5};${x - 3};${x}`}
                dur={`${1.5 + (i % 3) * 0.5}s`}
                begin={`${i * 0.2}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
    </svg>
  );
};

// Animated Thunderstorm
export const AnimatedThunder: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`weather-icon ${className}`}
  >
    <defs>
      <linearGradient id="stormCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4B5563" />
        <stop offset="100%" stopColor="#1F2937" />
      </linearGradient>
      <filter id="lightningGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Dark cloud */}
    <g transform="translate(0, -8) scale(0.75)">
      <ellipse cx="50" cy="45" rx="30" ry="18" fill="url(#stormCloudGrad)" />
      <circle cx="32" cy="40" r="16" fill="url(#stormCloudGrad)" />
      <circle cx="55" cy="32" r="18" fill="url(#stormCloudGrad)" />
      <circle cx="72" cy="42" r="14" fill="url(#stormCloudGrad)" />
    </g>

    {/* Lightning bolt */}
    <polygon
      points="52,35 42,55 48,55 40,80 58,50 50,50 58,35"
      fill="#FDE047"
      filter="url(#lightningGlow)"
    >
      <animate
        attributeName="opacity"
        values="1;0;1;1;0;1"
        dur="2s"
        repeatCount="indefinite"
        keyTimes="0;0.1;0.2;0.5;0.6;1"
      />
    </polygon>

    {/* Rain drops */}
    {[30, 45, 65, 75].map((x, i) => (
      <ellipse key={i} cx={x} cy="55" rx="1.5" ry="5" fill="#60A5FA">
        <animate
          attributeName="cy"
          values="55;92;55"
          dur="0.6s"
          begin={`${i * 0.15}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.8;0.2;0.8"
          dur="0.6s"
          begin={`${i * 0.15}s`}
          repeatCount="indefinite"
        />
      </ellipse>
    ))}
  </svg>
);

// Animated Fog
export const AnimatedFog: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`weather-icon ${className}`}
  >
    {[
      { y: 30, width: 60, delay: '0s' },
      { y: 45, width: 70, delay: '0.5s' },
      { y: 60, width: 55, delay: '1s' },
      { y: 75, width: 65, delay: '1.5s' },
    ].map((line, i) => (
      <rect
        key={i}
        x={(100 - line.width) / 2}
        y={line.y}
        width={line.width}
        height="6"
        rx="3"
        fill="#9CA3AF"
        opacity="0.6"
      >
        <animate
          attributeName="x"
          values={`${(100 - line.width) / 2};${(100 - line.width) / 2 + 10};${(100 - line.width) / 2}`}
          dur="4s"
          begin={line.delay}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.6;0.8;0.6"
          dur="3s"
          begin={line.delay}
          repeatCount="indefinite"
        />
      </rect>
    ))}
  </svg>
);

// Animated Partly Cloudy
export const AnimatedPartlyCloudy: React.FC<IconProps & { isDay?: boolean }> = ({
  size = 48,
  className = '',
  isDay = true
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`weather-icon ${className}`}
  >
    <defs>
      <radialGradient id="pcSunGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA500" />
      </radialGradient>
      <radialGradient id="pcMoonGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFFACD" />
        <stop offset="100%" stopColor="#F0E68C" />
      </radialGradient>
      <linearGradient id="pcCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E5E7EB" />
      </linearGradient>
    </defs>

    {/* Sun or Moon */}
    {isDay ? (
      <g transform="translate(55, 20)">
        {/* Sun rays */}
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="-18"
            x2="0"
            y2="-12"
            stroke="#FFD700"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${i * 45})`}
          >
            <animate
              attributeName="y1"
              values="-18;-16;-18"
              dur="1.5s"
              begin={`${i * 0.1}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
        <circle r="10" fill="url(#pcSunGrad)">
          <animate attributeName="r" values="10;11;10" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
    ) : (
      <g transform="translate(60, 25)">
        <circle r="12" fill="url(#pcMoonGrad)" />
        <circle cx="-3" cy="-2" r="2" fill="#DAA520" opacity="0.3" />
        <circle cx="4" cy="3" r="1.5" fill="#DAA520" opacity="0.25" />
      </g>
    )}

    {/* Cloud */}
    <g transform="translate(-5, 15)">
      <ellipse cx="45" cy="55" rx="25" ry="14" fill="url(#pcCloudGrad)">
        <animate attributeName="cx" values="45;48;45" dur="4s" repeatCount="indefinite" />
      </ellipse>
      <circle cx="32" cy="50" r="12" fill="url(#pcCloudGrad)">
        <animate attributeName="cx" values="32;35;32" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="45" r="14" fill="url(#pcCloudGrad)">
        <animate attributeName="cx" values="50;53;50" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="62" cy="52" r="10" fill="url(#pcCloudGrad)">
        <animate attributeName="cx" values="62;65;62" dur="4s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);

// ============================================================================
// MAIN WEATHER ICON COMPONENT
// ============================================================================

interface WeatherIconAnimatedProps {
  weatherCode: number;
  isDay?: boolean;
  size?: number;
  className?: string;
}

export const WeatherIconAnimated: React.FC<WeatherIconAnimatedProps> = ({
  weatherCode,
  isDay = true,
  size = 48,
  className = '',
}) => {
  // Clear sky
  if (weatherCode === 0) {
    return isDay
      ? <AnimatedSun size={size} className={className} />
      : <AnimatedMoon size={size} className={className} />;
  }

  // Mainly clear / Partly cloudy
  if (weatherCode >= 1 && weatherCode <= 2) {
    return <AnimatedPartlyCloudy size={size} className={className} isDay={isDay} />;
  }

  // Overcast
  if (weatherCode === 3) {
    return <AnimatedCloud size={size} className={className} dark />;
  }

  // Fog
  if (weatherCode >= 45 && weatherCode <= 48) {
    return <AnimatedFog size={size} className={className} />;
  }

  // Drizzle
  if (weatherCode >= 51 && weatherCode <= 57) {
    return <AnimatedRain size={size} className={className} />;
  }

  // Rain
  if (weatherCode >= 61 && weatherCode <= 67) {
    return <AnimatedRain size={size} className={className} heavy={weatherCode >= 65} />;
  }

  // Snow
  if (weatherCode >= 71 && weatherCode <= 77) {
    return <AnimatedSnow size={size} className={className} heavy={weatherCode >= 75} />;
  }

  // Rain showers
  if (weatherCode >= 80 && weatherCode <= 82) {
    return <AnimatedRain size={size} className={className} heavy={weatherCode >= 81} />;
  }

  // Snow showers
  if (weatherCode >= 85 && weatherCode <= 86) {
    return <AnimatedSnow size={size} className={className} heavy />;
  }

  // Thunderstorm
  if (weatherCode >= 95 && weatherCode <= 99) {
    return <AnimatedThunder size={size} className={className} />;
  }

  // Default: partly cloudy
  return <AnimatedPartlyCloudy size={size} className={className} isDay={isDay} />;
};

export default WeatherIconAnimated;
