import React from 'react';

interface WeatherBackgroundProps {
  weatherCode: number;
  isDay: boolean;
}

export const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ weatherCode, isDay }) => {
  // Determine background type based on weather code
  const getBackgroundType = (): string => {
    if (weatherCode === 0 || weatherCode === 1) return isDay ? 'sunny' : 'night';
    if (weatherCode === 2) return isDay ? 'partly-cloudy' : 'night-cloudy';
    if (weatherCode === 3) return 'cloudy';
    if (weatherCode >= 45 && weatherCode <= 48) return 'foggy';
    if (weatherCode >= 51 && weatherCode <= 67) return 'rainy';
    if (weatherCode >= 71 && weatherCode <= 77) return 'snowy';
    if (weatherCode >= 80 && weatherCode <= 82) return 'rainy';
    if (weatherCode >= 85 && weatherCode <= 86) return 'snowy';
    if (weatherCode >= 95) return 'stormy';
    return isDay ? 'sunny' : 'night';
  };

  const bgType = getBackgroundType();

  return (
    <div className={`weather-background ${bgType}`}>
      {/* Stars for night */}
      {(bgType === 'night' || bgType === 'night-cloudy') && (
        <div className="stars">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                animationDelay: `${Math.random() * 3}s`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Sun rays for sunny day */}
      {bgType === 'sunny' && (
        <div className="sun-container">
          <div className="sun" />
          <div className="sun-rays" />
        </div>
      )}

      {/* Moon for night */}
      {(bgType === 'night' || bgType === 'night-cloudy') && (
        <div className="moon" />
      )}

      {/* Clouds */}
      {(bgType === 'cloudy' || bgType === 'partly-cloudy' || bgType === 'night-cloudy' || bgType === 'rainy' || bgType === 'stormy') && (
        <div className="clouds">
          <div className="cloud cloud-1" />
          <div className="cloud cloud-2" />
          <div className="cloud cloud-3" />
        </div>
      )}

      {/* Rain drops */}
      {(bgType === 'rainy' || bgType === 'stormy') && (
        <div className="rain">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="drop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Snow flakes */}
      {bgType === 'snowy' && (
        <div className="snow">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="flake"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                fontSize: `${8 + Math.random() * 12}px`,
                opacity: 0.4 + Math.random() * 0.6,
              }}
            >
              ❄
            </div>
          ))}
        </div>
      )}

      {/* Lightning for storms */}
      {bgType === 'stormy' && (
        <div className="lightning" />
      )}

      {/* Fog effect */}
      {bgType === 'foggy' && (
        <div className="fog">
          <div className="fog-layer fog-1" />
          <div className="fog-layer fog-2" />
        </div>
      )}

      <style>{`
        .weather-background {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          overflow: hidden;
          transition: background 1s ease;
        }

        /* Sunny Day */
        .weather-background.sunny {
          background: linear-gradient(180deg, #4facfe 0%, #00f2fe 50%, #87CEEB 100%);
        }

        /* Night */
        .weather-background.night {
          background: linear-gradient(180deg, #0c1445 0%, #1a237e 50%, #283593 100%);
        }

        .weather-background.night-cloudy {
          background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #1f4068 100%);
        }

        /* Partly Cloudy */
        .weather-background.partly-cloudy {
          background: linear-gradient(180deg, #74b9ff 0%, #a29bfe 50%, #dfe6e9 100%);
        }

        /* Cloudy */
        .weather-background.cloudy {
          background: linear-gradient(180deg, #636e72 0%, #b2bec3 50%, #dfe6e9 100%);
        }

        /* Rainy */
        .weather-background.rainy {
          background: linear-gradient(180deg, #2d3436 0%, #636e72 50%, #74b9ff 100%);
        }

        /* Stormy */
        .weather-background.stormy {
          background: linear-gradient(180deg, #1e1e2f 0%, #2d3436 50%, #4a4a5a 100%);
        }

        /* Snowy */
        .weather-background.snowy {
          background: linear-gradient(180deg, #a8c0d6 0%, #c8d6e5 50%, #f0f4f8 100%);
        }

        /* Foggy */
        .weather-background.foggy {
          background: linear-gradient(180deg, #a8a8a8 0%, #c8c8c8 50%, #e8e8e8 100%);
        }

        /* Stars */
        .stars {
          position: absolute;
          inset: 0;
        }

        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        /* Sun */
        .sun-container {
          position: absolute;
          top: 5%;
          right: 10%;
        }

        .sun {
          width: 80px;
          height: 80px;
          background: #ffd93d;
          border-radius: 50%;
          box-shadow: 0 0 60px 20px rgba(255, 217, 61, 0.4),
                      0 0 100px 40px rgba(255, 217, 61, 0.2);
          animation: pulse-sun 4s ease-in-out infinite;
        }

        .sun-rays {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120px;
          height: 120px;
          margin: -60px 0 0 -60px;
          background: transparent;
          border-radius: 50%;
          box-shadow: 0 0 0 10px rgba(255, 217, 61, 0.1),
                      0 0 0 20px rgba(255, 217, 61, 0.1),
                      0 0 0 30px rgba(255, 217, 61, 0.05);
          animation: rays 8s linear infinite;
        }

        @keyframes pulse-sun {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes rays {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Moon */
        .moon {
          position: absolute;
          top: 8%;
          right: 12%;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #f5f3ce 0%, #e8e4c9 100%);
          border-radius: 50%;
          box-shadow: 0 0 30px 10px rgba(255, 255, 200, 0.2),
                      inset -8px -5px 0 0 rgba(0, 0, 0, 0.05);
        }

        /* Clouds */
        .clouds {
          position: absolute;
          inset: 0;
        }

        .cloud {
          position: absolute;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 100px;
          filter: blur(2px);
        }

        .cloud::before,
        .cloud::after {
          content: '';
          position: absolute;
          background: inherit;
          border-radius: 50%;
        }

        .cloud-1 {
          width: 200px;
          height: 60px;
          top: 10%;
          left: -10%;
          animation: cloud-move 30s linear infinite;
        }

        .cloud-1::before {
          width: 80px;
          height: 80px;
          top: -40px;
          left: 30px;
        }

        .cloud-1::after {
          width: 100px;
          height: 100px;
          top: -50px;
          left: 80px;
        }

        .cloud-2 {
          width: 150px;
          height: 50px;
          top: 25%;
          left: 20%;
          animation: cloud-move 25s linear infinite;
          animation-delay: -10s;
          opacity: 0.7;
        }

        .cloud-2::before {
          width: 60px;
          height: 60px;
          top: -30px;
          left: 20px;
        }

        .cloud-2::after {
          width: 80px;
          height: 80px;
          top: -40px;
          left: 60px;
        }

        .cloud-3 {
          width: 180px;
          height: 55px;
          top: 15%;
          left: 60%;
          animation: cloud-move 35s linear infinite;
          animation-delay: -20s;
          opacity: 0.6;
        }

        .cloud-3::before {
          width: 70px;
          height: 70px;
          top: -35px;
          left: 25px;
        }

        .cloud-3::after {
          width: 90px;
          height: 90px;
          top: -45px;
          left: 70px;
        }

        @keyframes cloud-move {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(calc(100vw + 100%)); }
        }

        /* Rain */
        .rain {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .drop {
          position: absolute;
          top: -20px;
          width: 2px;
          height: 15px;
          background: linear-gradient(180deg, transparent 0%, rgba(174, 194, 224, 0.8) 100%);
          animation: rain-fall 0.8s linear infinite;
        }

        @keyframes rain-fall {
          0% { transform: translateY(-20px); }
          100% { transform: translateY(100vh); }
        }

        /* Snow */
        .snow {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .flake {
          position: absolute;
          top: -20px;
          color: white;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
          animation: snow-fall 5s linear infinite;
        }

        @keyframes snow-fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }

        /* Lightning */
        .lightning {
          position: absolute;
          inset: 0;
          background: white;
          opacity: 0;
          animation: flash 8s ease-in-out infinite;
        }

        @keyframes flash {
          0%, 89%, 91%, 93%, 100% { opacity: 0; }
          90%, 92% { opacity: 0.3; }
        }

        /* Fog */
        .fog {
          position: absolute;
          inset: 0;
        }

        .fog-layer {
          position: absolute;
          width: 200%;
          height: 100%;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 20%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0.4) 80%,
            transparent 100%
          );
        }

        .fog-1 {
          top: 20%;
          animation: fog-move 20s linear infinite;
        }

        .fog-2 {
          top: 50%;
          animation: fog-move 25s linear infinite reverse;
          opacity: 0.7;
        }

        @keyframes fog-move {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
