import React from 'react';
import type { CurrentWeather, AirQuality, Location } from '../types/weather';
import { DropletIcon, WindIcon, EyeIcon } from './Icons';
import { windDirectionToCardinal, formatTime } from '../services/weatherApi';
import { ClickableValue } from './HistoricalModal';
import { WeatherIconAnimated } from './WeatherIconAnimated';
import { useLanguage } from '../i18n/LanguageContext';

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
  airQuality: AirQuality;
  location: Location;
  lastUpdated: string;
  lat: number;
  lon: number;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  airQuality,
  location,
  lastUpdated,
  lat,
  lon,
}) => {
  const { t } = useLanguage();

  // Weather code descriptions
  const getWeatherDescription = (code: number): string => {
    if (code === 0) return t.clearSky;
    if (code >= 1 && code <= 2) return t.mainlyClear;
    if (code === 3) return t.overcast;
    if (code >= 45 && code <= 48) return t.fog;
    if (code >= 51 && code <= 57) return t.drizzle;
    if (code >= 61 && code <= 67) return code >= 65 ? t.heavyRain : t.rain;
    if (code >= 71 && code <= 77) return code >= 75 ? t.heavySnow : t.snow;
    if (code >= 80 && code <= 82) return t.rain;
    if (code >= 85 && code <= 86) return t.heavySnow;
    if (code >= 95 && code <= 99) return t.thunderstorm;
    return t.partlyCloudy;
  };

  // AQI labels
  const getAqiLabel = (category: string): { label: string; color: string } => {
    const labelMap: Record<string, { label: string; color: string }> = {
      'good': { label: t.aqiGood, color: '#4caf50' },
      'moderate': { label: t.aqiFair, color: '#8bc34a' },
      'unhealthy-sensitive': { label: t.aqiModerate, color: '#ffeb3b' },
      'unhealthy': { label: t.aqiPoor, color: '#ff9800' },
      'very-unhealthy': { label: t.aqiVeryPoor, color: '#f44336' },
      'hazardous': { label: t.aqiVeryPoor, color: '#9c27b0' },
    };
    return labelMap[category] || labelMap['good'];
  };

  const aqiInfo = getAqiLabel(airQuality.category);

  const getTempColor = (temp: number): string => {
    if (temp <= 0) return 'var(--temp-cold)';
    if (temp <= 10) return 'var(--temp-cool)';
    if (temp <= 20) return 'var(--temp-mild)';
    if (temp <= 30) return 'var(--temp-warm)';
    return 'var(--temp-hot)';
  };

  const getUVLevel = (uv: number): { label: string; color: string } => {
    if (uv <= 2) return { label: t.uvLow, color: 'var(--success)' };
    if (uv <= 5) return { label: t.uvModerate, color: 'var(--warning)' };
    if (uv <= 7) return { label: t.uvHigh, color: '#ff6d00' };
    if (uv <= 10) return { label: t.uvVeryHigh, color: 'var(--danger)' };
    return { label: t.uvExtreme, color: '#9c27b0' };
  };

  const uvInfo = getUVLevel(weather.uvIndex);

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <div className="location">
          <h1 className="location-name">{location.name}</h1>
          <p className="location-region">{[location.region, location.country].filter(Boolean).join(', ')}</p>
        </div>
        <div className="status">
          <span className="status-dot" />
          <span className="status-time">{formatTime(lastUpdated)}</span>
        </div>
      </div>

      <div className="temperature-main">
        <div className="temperature-display">
          <ClickableValue
            value={weather.temperature}
            unit="°C"
            type="temperature"
            title={t.feelsLike}
            lat={lat}
            lon={lon}
          >
            <span className="temperature-value" style={{ color: getTempColor(weather.temperature) }}>
              {Math.round(weather.temperature)}
            </span>
            <span className="temperature-unit">°C</span>
          </ClickableValue>
        </div>
        <div className="weather-condition">
          <div className="weather-icon-container">
            <WeatherIconAnimated
              weatherCode={weather.weatherCode}
              isDay={weather.isDay}
              size={90}
            />
          </div>
          <span className="condition-text">{getWeatherDescription(weather.weatherCode)}</span>
        </div>
      </div>

      <div className="temperature-details">
        <div className="temp-detail">
          <span className="temp-detail-label">{t.feelsLike}</span>
          <span className="temp-detail-value" style={{ color: getTempColor(weather.apparentTemperature) }}>
            {Math.round(weather.apparentTemperature)}°
          </span>
        </div>
        <div className="temp-detail">
          <span className="temp-detail-label">{t.dewPoint}</span>
          <span className="temp-detail-value">{Math.round(weather.dewPoint)}°</span>
        </div>
        <div className="temp-detail">
          <span className="temp-detail-label">{t.humidity}</span>
          <span className="temp-detail-value">{weather.humidity}%</span>
        </div>
      </div>

      <div className="metrics-grid">
        <ClickableValue
          value={weather.windSpeed}
          unit="km/h"
          type="wind"
          title={t.windSpeed}
          lat={lat}
          lon={lon}
          className="metric-clickable"
        >
          <div className="metric">
            <div className="metric-icon">
              <WindIcon size={16} />
            </div>
            <div className="metric-content">
              <span className="metric-value">{Math.round(weather.windSpeed)}</span>
              <span className="metric-unit">km/h</span>
              <span className="metric-label">{windDirectionToCardinal(weather.windDirection)}</span>
            </div>
          </div>
        </ClickableValue>

        <ClickableValue
          value={weather.humidity}
          unit="%"
          type="humidity"
          title={t.humidity}
          lat={lat}
          lon={lon}
          className="metric-clickable"
        >
          <div className="metric">
            <div className="metric-icon">
              <DropletIcon size={16} />
            </div>
            <div className="metric-content">
              <span className="metric-value">{weather.humidity}</span>
              <span className="metric-unit">%</span>
              <span className="metric-label">{t.humidity}</span>
            </div>
          </div>
        </ClickableValue>

        <div className="metric">
          <div className="metric-icon">
            <EyeIcon size={16} />
          </div>
          <div className="metric-content">
            <span className="metric-value">{(weather.visibility / 1000).toFixed(0)}</span>
            <span className="metric-unit">km</span>
            <span className="metric-label">{t.visibility}</span>
          </div>
        </div>

        <div className="metric">
          <div className="metric-icon" style={{ background: uvInfo.color, color: 'white' }}>
            UV
          </div>
          <div className="metric-content">
            <span className="metric-value">{Math.round(weather.uvIndex)}</span>
            <span className="metric-label" style={{ color: uvInfo.color }}>{uvInfo.label}</span>
          </div>
        </div>

        <ClickableValue
          value={weather.pressure}
          unit="hPa"
          type="pressure"
          title={t.pressure}
          lat={lat}
          lon={lon}
          className="metric-clickable"
        >
          <div className="metric">
            <div className="metric-icon pressure-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div className="metric-content">
              <span className="metric-value">{Math.round(weather.pressure)}</span>
              <span className="metric-unit">hPa</span>
              <span className="metric-label">{t.pressure}</span>
            </div>
          </div>
        </ClickableValue>

        <div className="metric">
          <div className="metric-icon aqi-icon" style={{ background: aqiInfo.color }}>
            {airQuality.aqi ?? 0}
          </div>
          <div className="metric-content">
            <span className="metric-value" style={{ color: aqiInfo.color }}>{aqiInfo.label}</span>
            <span className="metric-label">{t.airQuality}</span>
          </div>
        </div>
      </div>

      <style>{`
        .weather-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: clamp(16px, 4vw, 24px);
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 3vw, 24px);
          height: 100%;
          min-width: 0;
        }

        .weather-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          flex-wrap: wrap;
        }

        .location {
          min-width: 0;
          flex: 1;
        }

        .location-name {
          font-size: clamp(18px, 4vw, 22px);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 4px 0;
          letter-spacing: -0.3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .location-region {
          font-size: clamp(11px, 2.5vw, 13px);
          color: var(--text-tertiary);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          background: var(--bg-subtle);
          border-radius: 16px;
          flex-shrink: 0;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: var(--success);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .status-time {
          font-size: 11px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .temperature-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .temperature-display {
          display: flex;
          align-items: flex-start;
        }

        .temperature-value {
          font-size: clamp(48px, 15vw, 72px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -3px;
        }

        .temperature-unit {
          font-size: clamp(16px, 4vw, 24px);
          font-weight: 500;
          color: var(--text-tertiary);
          margin-top: clamp(8px, 2vw, 12px);
          margin-left: 2px;
        }

        .weather-condition {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
        }

        .weather-icon-container {
          width: 90px;
          height: 90px;
          min-width: 90px;
          min-height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-lg);
          background: var(--bg-subtle);
          padding: 4px;
        }

        .condition-text {
          font-size: clamp(12px, 3vw, 14px);
          font-weight: 500;
          color: var(--text-secondary);
          text-align: center;
        }

        .temperature-details {
          display: flex;
          gap: clamp(12px, 4vw, 24px);
          padding: clamp(12px, 3vw, 16px) 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          flex-wrap: wrap;
        }

        .temp-detail {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 60px;
        }

        .temp-detail-label {
          font-size: clamp(10px, 2.5vw, 11px);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
        }

        .temp-detail-value {
          font-size: clamp(16px, 4vw, 20px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 120px), 1fr));
          gap: clamp(8px, 2vw, 12px);
        }

        .metric {
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
          padding: clamp(10px, 2.5vw, 14px);
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: var(--transition);
          min-width: 0;
        }

        .metric:hover {
          background: var(--accent-subtle);
        }

        .metric-icon {
          width: clamp(28px, 6vw, 32px);
          height: clamp(28px, 6vw, 32px);
          background: var(--bg-elevated);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          font-size: 10px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .metric-icon.aqi-icon {
          color: white;
          font-size: 9px;
        }

        .metric-content {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 3px;
          min-width: 0;
        }

        .metric-value {
          font-size: clamp(14px, 3.5vw, 18px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .metric-unit {
          font-size: clamp(10px, 2.5vw, 12px);
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .metric-label {
          font-size: clamp(9px, 2vw, 11px);
          color: var(--text-tertiary);
          width: 100%;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .metric-clickable {
          display: contents;
        }

        .metric-clickable .metric {
          cursor: pointer;
          position: relative;
        }

        .metric-clickable .metric::after {
          content: '';
          position: absolute;
          top: 4px;
          right: 4px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.6;
        }

        .metric-clickable:hover .metric {
          background: var(--accent-subtle);
        }

        @media (max-width: 400px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .temperature-main {
            flex-direction: column;
            align-items: flex-start;
          }

          .weather-condition {
            flex-direction: row;
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  );
};
