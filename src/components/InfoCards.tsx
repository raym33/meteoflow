import React from 'react';
import type { AirQuality, CurrentWeather, DailyForecast, MarineData } from '../types/weather';
import { AirVentIcon, SunriseIcon, SunsetIcon, CompassIcon, WavesIcon } from './Icons';
import { windDirectionToCardinal, formatTime } from '../services/weatherApi';
import { ClickableValue } from './HistoricalModal';
import { useLanguage } from '../i18n/LanguageContext';

// Shared styles for info cards
export const InfoCardStyles: React.FC = () => (
  <style>{`
    .info-card {
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: clamp(16px, 4vw, 24px);
      display: flex;
      flex-direction: column;
      gap: clamp(14px, 3vw, 20px);
      min-width: 0;
      overflow: hidden;
    }

    .info-card-header {
      display: flex;
      align-items: center;
      gap: clamp(10px, 2.5vw, 14px);
      flex-wrap: wrap;
    }

    .info-card-icon {
      width: clamp(32px, 8vw, 40px);
      height: clamp(32px, 8vw, 40px);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--accent-subtle);
      color: var(--accent);
      flex-shrink: 0;
    }

    .info-card-title {
      font-size: clamp(14px, 3.5vw, 16px);
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .info-card-subtitle {
      font-size: clamp(10px, 2.5vw, 12px);
      color: var(--text-tertiary);
      font-weight: 500;
    }

    .info-card-content {
      display: flex;
      flex-direction: column;
      gap: clamp(12px, 3vw, 16px);
    }
  `}</style>
);

// Air Quality Card
interface AirQualityCardProps {
  airQuality: AirQuality;
}

export const AirQualityCard: React.FC<AirQualityCardProps> = ({ airQuality }) => {
  const { t } = useLanguage();
  const aqiColors: Record<AirQuality['category'], string> = {
    'good': '#22c55e',
    'moderate': '#eab308',
    'unhealthy-sensitive': '#f97316',
    'unhealthy': '#ef4444',
    'very-unhealthy': '#a855f7',
    'hazardous': '#7f1d1d',
  };
  const aqiLabels: Record<AirQuality['category'], string> = {
    'good': t.aqiGood,
    'moderate': t.aqiFair,
    'unhealthy-sensitive': t.aqiModerate,
    'unhealthy': t.aqiPoor,
    'very-unhealthy': t.aqiVeryPoor,
    'hazardous': t.aqiVeryPoor,
  };
  const aqiAdvice: Record<AirQuality['category'], string> = {
    'good': t.aqiGoodAdvice,
    'moderate': t.aqiFairAdvice,
    'unhealthy-sensitive': t.aqiModerateAdvice,
    'unhealthy': t.aqiPoorAdvice,
    'very-unhealthy': t.aqiVeryPoorAdvice,
    'hazardous': t.aqiVeryPoorAdvice,
  };
  const aqiInfo = {
    label: aqiLabels[airQuality.category],
    color: aqiColors[airQuality.category],
    advice: aqiAdvice[airQuality.category],
  };

  const pollutants = [
    { name: 'PM2.5', value: airQuality.pm25 ?? 0, unit: 'µg/m³', max: 50, desc: 'Partículas finas' },
    { name: 'PM10', value: airQuality.pm10 ?? 0, unit: 'µg/m³', max: 100, desc: 'Partículas gruesas' },
    { name: 'NO₂', value: airQuality.no2 ?? 0, unit: 'µg/m³', max: 200, desc: 'Dióxido nitrógeno' },
    { name: 'O₃', value: airQuality.o3 ?? 0, unit: 'µg/m³', max: 180, desc: 'Ozono' },
    { name: 'SO₂', value: airQuality.so2 ?? 0, unit: 'µg/m³', max: 350, desc: 'Dióxido azufre' },
    { name: 'CO', value: airQuality.co ?? 0, unit: 'µg/m³', max: 10000, desc: 'Monóxido carbono' },
  ];

  const getBarColor = (value: number, max: number): string => {
    const ratio = value / max;
    if (ratio <= 0.25) return '#22c55e';
    if (ratio <= 0.5) return '#eab308';
    if (ratio <= 0.75) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="info-card aqi-card">
      <div className="info-card-header">
        <div className="info-card-icon" style={{ background: `${aqiInfo.color}20`, color: aqiInfo.color }}>
          <AirVentIcon size={20} />
        </div>
        <div>
          <h4 className="info-card-title">{t.airQuality}</h4>
          <span className="info-card-subtitle">{t.airQualityIndex}</span>
        </div>
      </div>

      <div className="info-card-content">
        <div className="aqi-main">
          <div className="aqi-value" style={{ backgroundColor: aqiInfo.color }}>
            {airQuality.aqi ?? 0}
          </div>
          <div className="aqi-info">
            <span className="aqi-status" style={{ color: aqiInfo.color }}>
              {aqiInfo.label}
            </span>
            <span className="aqi-desc">
              {aqiInfo.advice}
            </span>
          </div>
        </div>

        <div className="aqi-scale">
          <div className="aqi-scale-bar">
            <div
              className="aqi-scale-marker"
              style={{ left: `${Math.min((airQuality.aqi ?? 0), 100)}%` }}
            />
          </div>
          <div className="aqi-scale-labels">
            <span>{t.aqiGood}</span>
            <span>{t.aqiModerate}</span>
            <span>{t.aqiPoor}</span>
          </div>
        </div>

        <div className="pollutants-grid">
          {pollutants.map(p => (
            <div key={p.name} className="pollutant-item">
              <div className="pollutant-header">
                <span className="pollutant-name">{p.name}</span>
                <span className="pollutant-value">{p.value.toFixed(1)}</span>
              </div>
              <div className="pollutant-bar-container">
                <div
                  className="pollutant-bar"
                  style={{
                    width: `${Math.min((p.value / p.max) * 100, 100)}%`,
                    backgroundColor: getBarColor(p.value, p.max)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .aqi-main {
          display: flex;
          align-items: center;
          gap: clamp(12px, 3vw, 16px);
          flex-wrap: wrap;
        }

        .aqi-value {
          width: clamp(52px, 12vw, 64px);
          height: clamp(52px, 12vw, 64px);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(18px, 4.5vw, 24px);
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }

        .aqi-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
          flex: 1;
        }

        .aqi-status {
          font-size: clamp(15px, 3.5vw, 18px);
          font-weight: 600;
        }

        .aqi-desc {
          font-size: clamp(11px, 2.5vw, 13px);
          color: var(--text-tertiary);
          line-height: 1.4;
        }

        .aqi-scale {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .aqi-scale-bar {
          height: clamp(6px, 1.5vw, 8px);
          background: linear-gradient(90deg, #22c55e 0%, #eab308 33%, #f97316 66%, #ef4444 100%);
          border-radius: 4px;
          position: relative;
        }

        .aqi-scale-marker {
          position: absolute;
          top: -4px;
          width: 4px;
          height: clamp(12px, 3vw, 16px);
          background: var(--text-primary);
          border-radius: 2px;
          transform: translateX(-50%);
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .aqi-scale-labels {
          display: flex;
          justify-content: space-between;
          font-size: clamp(9px, 2vw, 11px);
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .pollutants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 120px), 1fr));
          gap: clamp(8px, 2vw, 12px);
        }

        .pollutant-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: clamp(10px, 2.5vw, 12px);
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
        }

        .pollutant-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 8px;
        }

        .pollutant-name {
          font-size: clamp(10px, 2.5vw, 12px);
          font-weight: 600;
          color: var(--text-secondary);
        }

        .pollutant-value {
          font-size: clamp(11px, 2.5vw, 13px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .pollutant-bar-container {
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          overflow: hidden;
        }

        .pollutant-bar {
          height: 100%;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
      `}</style>
    </div>
  );
};

// Sun Times Card
interface SunTimesCardProps {
  today: DailyForecast;
  weather: CurrentWeather;
  lat?: number;
  lon?: number;
}

export const SunTimesCard: React.FC<SunTimesCardProps> = ({ today, weather, lat = 0, lon = 0 }) => {
  const { t, language } = useLanguage();
  const sunrise = new Date(today.sunrise);
  const sunset = new Date(today.sunset);
  const now = new Date();

  const dayLength = sunset.getTime() - sunrise.getTime();
  const elapsed = now.getTime() - sunrise.getTime();
  const progress = Math.max(0, Math.min(100, (elapsed / dayLength) * 100));

  const dayHours = Math.floor(dayLength / (1000 * 60 * 60));
  const dayMins = Math.floor((dayLength % (1000 * 60 * 60)) / (1000 * 60));

  const uvLevel = (uv: number): string => {
    if (uv <= 2) return t.uvLow;
    if (uv <= 5) return t.uvModerate;
    if (uv <= 7) return t.uvHigh;
    if (uv <= 10) return t.uvVeryHigh;
    return t.uvExtreme;
  };

  const uvColor = (uv: number): string => {
    if (uv <= 2) return '#22c55e';
    if (uv <= 5) return '#eab308';
    if (uv <= 7) return '#f97316';
    if (uv <= 10) return '#ef4444';
    return '#a855f7';
  };

  const uvAdvice = (uv: number): string => {
    if (uv <= 2) return t.uvAdviceLow;
    if (uv <= 5) return t.uvAdviceModerate;
    if (uv <= 7) return t.uvAdviceHigh;
    if (uv <= 10) return t.uvAdviceVeryHigh;
    return t.uvAdviceExtreme;
  };

  return (
    <div className="info-card sun-card">
      <div className="info-card-header">
        <div className="info-card-icon">
          <SunriseIcon size={20} />
        </div>
        <div>
          <h4 className="info-card-title">{t.sunAndUv}</h4>
          <span className="info-card-subtitle">{t.dayLength}: {dayHours}h {dayMins}m</span>
        </div>
      </div>

      <div className="info-card-content">
        <div className="sun-arc-container">
          <svg viewBox="0 0 200 110" className="sun-arc">
            <defs>
              <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff9800" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#ffc107" />
                <stop offset="100%" stopColor="#ff9800" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              d="M 10 100 A 90 90 0 0 1 190 100"
              fill="none"
              stroke="var(--border)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 10 100 A 90 90 0 0 1 190 100"
              fill="none"
              stroke="url(#arcGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${(progress / 100) * 283} 283`}
            />
            {progress > 0 && progress < 100 && (
              <g>
                <circle
                  cx={10 + (180 * progress) / 100}
                  cy={100 - Math.sin((progress / 100) * Math.PI) * 85}
                  r="12"
                  fill="#ffc107"
                />
                <circle
                  cx={10 + (180 * progress) / 100}
                  cy={100 - Math.sin((progress / 100) * Math.PI) * 85}
                  r="16"
                  fill="#ffc107"
                  opacity="0.3"
                />
              </g>
            )}
            <line x1="10" y1="100" x2="10" y2="105" stroke="var(--text-tertiary)" strokeWidth="2" />
            <line x1="190" y1="100" x2="190" y2="105" stroke="var(--text-tertiary)" strokeWidth="2" />
          </svg>
        </div>

        <div className="sun-times">
          <div className="sun-time-item">
            <div className="sun-time-icon sunrise">
              <SunriseIcon size={18} />
            </div>
            <div className="sun-time-info">
              <span className="sun-time-label">{t.sunrise}</span>
              <span className="sun-time-value">{formatTime(today.sunrise, language)}</span>
            </div>
          </div>
          <div className="sun-time-item">
            <div className="sun-time-icon sunset">
              <SunsetIcon size={18} />
            </div>
            <div className="sun-time-info">
              <span className="sun-time-label">{t.sunset}</span>
              <span className="sun-time-value">{formatTime(today.sunset, language)}</span>
            </div>
          </div>
        </div>

        <div className="uv-section">
          <div className="uv-main">
            <ClickableValue
              value={weather.uvIndex}
              unit=""
              type="uv"
              title={t.uvIndex}
              lat={lat}
              lon={lon}
              className="uv-clickable"
            >
              <div className="uv-circle" style={{ borderColor: uvColor(weather.uvIndex) }}>
                <span className="uv-value" style={{ color: uvColor(weather.uvIndex) }}>
                  {Math.round(weather.uvIndex)}
                </span>
                <span className="uv-label">UV</span>
              </div>
            </ClickableValue>
            <div className="uv-info">
              <span className="uv-level" style={{ color: uvColor(weather.uvIndex) }}>
                {uvLevel(weather.uvIndex)}
              </span>
              <span className="uv-advice">{uvAdvice(weather.uvIndex)}</span>
            </div>
          </div>
          <div className="uv-bar-container">
            <div className="uv-bar-scale">
              <span>0</span>
              <span>3</span>
              <span>6</span>
              <span>9</span>
              <span>11+</span>
            </div>
            <div className="uv-bar-track">
              <div
                className="uv-bar-marker"
                style={{ left: `${Math.min((weather.uvIndex / 11) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .sun-arc-container {
          width: 100%;
          max-width: min(220px, 60vw);
          margin: 0 auto;
        }

        .sun-arc {
          width: 100%;
          height: auto;
        }

        .sun-times {
          display: flex;
          justify-content: space-between;
          gap: clamp(8px, 2vw, 16px);
          flex-wrap: wrap;
        }

        .sun-time-item {
          display: flex;
          align-items: center;
          gap: clamp(8px, 2vw, 12px);
          flex: 1;
          min-width: min(100%, 140px);
          padding: clamp(10px, 2.5vw, 12px);
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
        }

        .sun-time-icon {
          width: clamp(30px, 7vw, 36px);
          height: clamp(30px, 7vw, 36px);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sun-time-icon.sunrise {
          background: rgba(255, 152, 0, 0.15);
          color: #ff9800;
        }

        .sun-time-icon.sunset {
          background: rgba(233, 30, 99, 0.15);
          color: #e91e63;
        }

        .sun-time-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .sun-time-label {
          font-size: clamp(9px, 2vw, 11px);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-weight: 500;
        }

        .sun-time-value {
          font-size: clamp(14px, 3.5vw, 16px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .uv-section {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 2.5vw, 12px);
          padding: clamp(12px, 3vw, 16px);
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
        }

        .uv-main {
          display: flex;
          align-items: center;
          gap: clamp(12px, 3vw, 16px);
          flex-wrap: wrap;
        }

        .uv-circle {
          width: clamp(48px, 12vw, 56px);
          height: clamp(48px, 12vw, 56px);
          border-radius: 50%;
          border: 3px solid;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .uv-value {
          font-size: clamp(16px, 4vw, 20px);
          font-weight: 700;
          line-height: 1;
        }

        .uv-label {
          font-size: clamp(8px, 2vw, 10px);
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .uv-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
          flex: 1;
        }

        .uv-level {
          font-size: clamp(14px, 3.5vw, 16px);
          font-weight: 600;
        }

        .uv-advice {
          font-size: clamp(10px, 2.5vw, 12px);
          color: var(--text-tertiary);
        }

        .uv-bar-container {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .uv-bar-scale {
          display: flex;
          justify-content: space-between;
          font-size: clamp(8px, 2vw, 10px);
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .uv-bar-track {
          height: clamp(5px, 1.5vw, 6px);
          background: linear-gradient(90deg, #22c55e 0%, #eab308 27%, #f97316 55%, #ef4444 82%, #a855f7 100%);
          border-radius: 3px;
          position: relative;
        }

        .uv-bar-marker {
          position: absolute;
          top: -3px;
          width: 4px;
          height: clamp(10px, 2.5vw, 12px);
          background: var(--text-primary);
          border-radius: 2px;
          transform: translateX(-50%);
        }

        .uv-clickable .uv-circle {
          cursor: pointer;
          transition: all 0.2s;
        }

        .uv-clickable:hover .uv-circle {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
};

// Wind Card
interface WindCardProps {
  weather: CurrentWeather;
  lat?: number;
  lon?: number;
}

export const WindCard: React.FC<WindCardProps> = ({ weather, lat = 0, lon = 0 }) => {
  const { t } = useLanguage();
  const cardinal = windDirectionToCardinal(weather.windDirection);

  const getWindLevel = (speed: number): { label: string; color: string } => {
    if (speed < 12) return { label: t.windCalm, color: '#22c55e' };
    if (speed < 20) return { label: t.windBreeze, color: '#4caf50' };
    if (speed < 30) return { label: t.windModerate, color: '#ff9800' };
    if (speed < 50) return { label: t.windStrong, color: '#f97316' };
    return { label: t.windVeryStrong, color: '#ef4444' };
  };

  const windLevel = getWindLevel(weather.windSpeed);

  return (
    <div className="info-card wind-card">
        <div className="info-card-header">
          <div className="info-card-icon">
            <CompassIcon size={20} />
          </div>
        <div>
          <h4 className="info-card-title">{t.wind}</h4>
          <span className="info-card-subtitle">{windLevel.label}</span>
        </div>
      </div>

      <div className="info-card-content">
        <div className="wind-compass">
          <div className="compass-ring">
            <span className="compass-direction n">{t.north}</span>
            <span className="compass-direction e">{t.east}</span>
            <span className="compass-direction s">{t.south}</span>
            <span className="compass-direction w">{t.west}</span>

            <div className="compass-ticks">
              {[...Array(36)].map((_, i) => (
                <div
                  key={i}
                  className="compass-tick"
                  style={{ transform: `rotate(${i * 10}deg)` }}
                />
              ))}
            </div>

            <div
              className="compass-needle"
              style={{ transform: `rotate(${weather.windDirection}deg)` }}
            >
              <div className="needle-body" />
            </div>
          </div>
          <ClickableValue
            value={weather.windSpeed}
            unit="km/h"
            type="wind"
            title={t.windSpeed}
            lat={lat}
            lon={lon}
            className="wind-speed-clickable"
          >
            <div className="wind-speed-center">
              <span className="wind-speed-value">{Math.round(weather.windSpeed)}</span>
              <span className="wind-speed-unit">km/h</span>
            </div>
          </ClickableValue>
        </div>

        <div className="wind-stats">
          <div className="wind-stat">
            <span className="wind-stat-label">{t.windDirection}</span>
            <span className="wind-stat-value">{cardinal}</span>
            <span className="wind-stat-extra">{weather.windDirection}°</span>
          </div>
          <div className="wind-stat">
            <span className="wind-stat-label">{t.gusts}</span>
            <span className="wind-stat-value">{Math.round(weather.windGusts)}</span>
            <span className="wind-stat-extra">km/h</span>
          </div>
          <div className="wind-stat">
            <span className="wind-stat-label">{t.intensity}</span>
            <span className="wind-stat-value" style={{ color: windLevel.color }}>{windLevel.label}</span>
          </div>
        </div>
      </div>

      <style>{`
        .wind-compass {
          position: relative;
          width: clamp(120px, 35vw, 160px);
          height: clamp(120px, 35vw, 160px);
          margin: 0 auto;
        }

        .compass-ring {
          position: absolute;
          inset: 0;
          border: 2px solid var(--border);
          border-radius: 50%;
          background: var(--bg-subtle);
        }

        .compass-ticks {
          position: absolute;
          inset: 8px;
        }

        .compass-tick {
          position: absolute;
          top: 0;
          left: 50%;
          width: 1px;
          height: 6px;
          background: var(--border);
          transform-origin: 50% calc(clamp(60px, 17.5vw, 80px) - 8px);
        }

        .compass-tick:nth-child(9n) {
          height: 10px;
          background: var(--text-tertiary);
        }

        .compass-direction {
          position: absolute;
          font-size: clamp(10px, 2.5vw, 12px);
          font-weight: 600;
          color: var(--text-secondary);
        }

        .compass-direction.n { top: 10px; left: 50%; transform: translateX(-50%); }
        .compass-direction.e { right: 10px; top: 50%; transform: translateY(-50%); }
        .compass-direction.s { bottom: 10px; left: 50%; transform: translateX(-50%); }
        .compass-direction.w { left: 10px; top: 50%; transform: translateY(-50%); }

        .compass-needle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: clamp(40px, 12vw, 56px);
          margin-left: -3px;
          margin-top: clamp(-40px, -12vw, -56px);
          transform-origin: 50% 100%;
          transition: transform 0.5s ease;
        }

        .needle-body {
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: clamp(40px, 12vw, 56px) solid var(--accent);
          margin-left: -3px;
        }

        .wind-speed-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--bg-elevated);
          padding: clamp(10px, 3vw, 16px);
          border-radius: 50%;
          width: clamp(52px, 16vw, 72px);
          height: clamp(52px, 16vw, 72px);
          justify-content: center;
          border: 2px solid var(--border);
        }

        .wind-speed-value {
          font-size: clamp(16px, 4.5vw, 22px);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
        }

        .wind-speed-unit {
          font-size: clamp(8px, 2vw, 10px);
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .wind-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 80px), 1fr));
          gap: clamp(8px, 2vw, 12px);
        }

        .wind-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: clamp(10px, 2.5vw, 12px) clamp(6px, 1.5vw, 8px);
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
        }

        .wind-stat-label {
          font-size: clamp(8px, 2vw, 10px);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-weight: 500;
          text-align: center;
        }

        .wind-stat-value {
          font-size: clamp(13px, 3.5vw, 16px);
          font-weight: 600;
          color: var(--text-primary);
          text-align: center;
        }

        .wind-stat-extra {
          font-size: clamp(9px, 2vw, 11px);
          color: var(--text-tertiary);
        }

        .wind-speed-clickable {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .wind-speed-clickable .wind-speed-center {
          cursor: pointer;
          transition: all 0.2s;
        }

        .wind-speed-clickable:hover .wind-speed-center {
          background: var(--accent-subtle);
          border-color: var(--accent);
        }
      `}</style>
    </div>
  );
};

// Marine Card
interface MarineCardProps {
  marine: MarineData;
}

export const MarineCard: React.FC<MarineCardProps> = ({ marine }) => {
  const { t } = useLanguage();
  const waveHeight = marine.waveHeight ?? 0;
  const wavePeriod = marine.wavePeriod ?? 0;
  const waveDirection = marine.waveDirection ?? 0;
  const swellHeight = marine.swellHeight ?? 0;
  const seaTemperature = marine.seaTemperature ?? 0;

  const waveCardinal = windDirectionToCardinal(waveDirection);

  const waveCondition = (height: number): { label: string; color: string } => {
    if (height < 0.5) return { label: t.seaCalm, color: '#22c55e' };
    if (height < 1) return { label: t.seaRippled, color: '#4caf50' };
    if (height < 1.5) return { label: t.seaSlight, color: '#ff9800' };
    if (height < 2.5) return { label: t.seaModerate, color: '#f97316' };
    if (height < 4) return { label: t.seaRough, color: '#ef4444' };
    return { label: t.seaVeryRough, color: '#ef4444' };
  };

  const condition = waveCondition(waveHeight);

  return (
    <div className="info-card marine-card">
      <div className="info-card-header">
        <div className="info-card-icon" style={{ background: 'rgba(33, 150, 243, 0.15)', color: '#2196f3' }}>
          <WavesIcon size={20} />
        </div>
        <div>
          <h4 className="info-card-title">{t.marineConditions}</h4>
          <span className="info-card-subtitle" style={{ color: condition.color }}>{condition.label}</span>
        </div>
      </div>

      <div className="info-card-content">
        <div className="marine-main">
          <div className="wave-display">
            <span className="wave-height">{waveHeight.toFixed(1)}</span>
            <span className="wave-unit">m</span>
          </div>
          <div className="wave-info">
            <div className="wave-direction-indicator">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: `rotate(${waveDirection}deg)` }}>
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              <span>{t.from} {waveCardinal}</span>
            </div>
          </div>
        </div>

        <div className="marine-grid">
          <div className="marine-stat">
            <span className="marine-stat-value">{wavePeriod.toFixed(1)}<span className="marine-stat-unit">s</span></span>
            <span className="marine-stat-label">{t.wavePeriod}</span>
          </div>
          <div className="marine-stat">
            <span className="marine-stat-value">{swellHeight.toFixed(1)}<span className="marine-stat-unit">m</span></span>
            <span className="marine-stat-label">{t.swellHeight}</span>
          </div>
          {seaTemperature > 0 && (
            <div className="marine-stat">
              <span className="marine-stat-value">{seaTemperature.toFixed(0)}<span className="marine-stat-unit">°C</span></span>
              <span className="marine-stat-label">{t.seaTemperature}</span>
            </div>
          )}
          <div className="marine-stat">
            <span className="marine-stat-value">{waveDirection}<span className="marine-stat-unit">°</span></span>
            <span className="marine-stat-label">{t.windDirection}</span>
          </div>
        </div>

        <div className="wave-animation">
          <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="wave-svg">
            <path className="wave-path wave-1" d="M0,30 Q25,10 50,30 T100,30 T150,30 T200,30 T250,30 T300,30 T350,30 T400,30 V60 H0 Z" />
            <path className="wave-path wave-2" d="M0,35 Q25,15 50,35 T100,35 T150,35 T200,35 T250,35 T300,35 T350,35 T400,35 V60 H0 Z" />
            <path className="wave-path wave-3" d="M0,40 Q25,20 50,40 T100,40 T150,40 T200,40 T250,40 T300,40 T350,40 T400,40 V60 H0 Z" />
          </svg>
        </div>
      </div>

      <style>{`
        .marine-main {
          display: flex;
          align-items: center;
          gap: clamp(12px, 3vw, 20px);
          padding: clamp(12px, 3vw, 16px);
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
          flex-wrap: wrap;
        }

        .wave-display {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .wave-height {
          font-size: clamp(28px, 8vw, 42px);
          font-weight: 700;
          color: #2196f3;
          line-height: 1;
        }

        .wave-unit {
          font-size: clamp(14px, 3.5vw, 18px);
          color: var(--text-secondary);
          font-weight: 500;
        }

        .wave-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
          flex: 1;
        }

        .wave-direction-indicator {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1.5vw, 8px);
          font-size: clamp(12px, 3vw, 14px);
          color: var(--text-secondary);
          font-weight: 500;
        }

        .wave-direction-indicator svg {
          color: #2196f3;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .marine-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 70px), 1fr));
          gap: clamp(6px, 1.5vw, 8px);
        }

        .marine-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: clamp(10px, 2.5vw, 12px) clamp(6px, 1.5vw, 8px);
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
        }

        .marine-stat-value {
          font-size: clamp(14px, 3.5vw, 18px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .marine-stat-unit {
          font-size: clamp(10px, 2.5vw, 12px);
          color: var(--text-tertiary);
          font-weight: 400;
          margin-left: 2px;
        }

        .marine-stat-label {
          font-size: clamp(8px, 2vw, 10px);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-weight: 500;
          text-align: center;
          white-space: nowrap;
        }

        .wave-animation {
          height: clamp(40px, 10vw, 50px);
          overflow: hidden;
          border-radius: var(--radius-md);
          background: linear-gradient(180deg, var(--bg-subtle) 0%, rgba(33, 150, 243, 0.1) 100%);
        }

        .wave-svg {
          width: 200%;
          height: 100%;
          animation: waveMove 4s linear infinite;
        }

        .wave-path {
          fill: rgba(33, 150, 243, 0.2);
        }

        .wave-path.wave-2 {
          fill: rgba(33, 150, 243, 0.15);
          animation: waveMove2 5s linear infinite;
        }

        .wave-path.wave-3 {
          fill: rgba(33, 150, 243, 0.1);
          animation: waveMove3 6s linear infinite;
        }

        @keyframes waveMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes waveMove2 {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(-75%); }
        }

        @keyframes waveMove3 {
          0% { transform: translateX(-10%); }
          100% { transform: translateX(-60%); }
        }
      `}</style>
    </div>
  );
};
