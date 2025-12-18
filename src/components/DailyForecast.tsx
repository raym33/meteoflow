import React, { useState } from 'react';
import type { DailyForecast } from '../types/weather';
import { DropletIcon, WindIcon } from './Icons';
import { formatDate } from '../services/weatherApi';
import { WeatherIconAnimated } from './WeatherIconAnimated';
import { useLanguage } from '../i18n/LanguageContext';

interface DailyForecastCardProps {
  days: DailyForecast[];
}

export const DailyForecastCard: React.FC<DailyForecastCardProps> = ({ days }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const { t, language } = useLanguage();

  const allTemps = days.flatMap(d => [d.temperatureMin, d.temperatureMax]);
  const minTemp = Math.min(...allTemps);
  const maxTemp = Math.max(...allTemps);
  const tempRange = maxTemp - minTemp || 1;

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

  const getDayName = (dateStr: string, index: number): string => {
    if (index === 0) return t.today;
    if (index === 1) return t.tomorrow;
    return formatDate(dateStr, { weekday: 'short' }, language);
  };

  const getDateStr = (dateStr: string): string => {
    return formatDate(dateStr, { day: 'numeric', month: 'short' }, language);
  };

  const getBarPosition = (min: number, max: number) => {
    const left = ((min - minTemp) / tempRange) * 100;
    const right = 100 - ((max - minTemp) / tempRange) * 100;
    return { left: `${left}%`, right: `${right}%` };
  };

  const getTempColor = (temp: number): string => {
    if (temp <= 0) return '#2196f3';
    if (temp <= 10) return '#00bcd4';
    if (temp <= 20) return '#4caf50';
    if (temp <= 30) return '#ff9800';
    return '#f44336';
  };

  const getGradient = (min: number, max: number): string => {
    return `linear-gradient(90deg, ${getTempColor(min)}, ${getTempColor(max)})`;
  };

  const toggleDay = (index: number) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  return (
    <div className="daily-card">
      <div className="daily-header">
        <h3 className="daily-title">{t.next10Days}</h3>
        <div className="temp-range-legend">
          <span>{Math.round(minTemp)}°</span>
          <div className="legend-bar" />
          <span>{Math.round(maxTemp)}°</span>
        </div>
      </div>

      <div className="days-container">
        {days.map((day, index) => {
          const isExpanded = expandedDay === index;

          return (
            <div
              key={day.date}
              className={`day-item ${index === 0 ? 'today' : ''} ${isExpanded ? 'expanded' : ''}`}
              onClick={() => toggleDay(index)}
            >
              <div className="day-main">
                <div className="day-left">
                  <span className="day-name">{getDayName(day.date, index)}</span>
                  <span className="day-date">{getDateStr(day.date)}</span>
                </div>

                <div className="day-icon">
                  <WeatherIconAnimated weatherCode={day.weatherCode} size={40} />
                  {day.precipitationProbability > 0 && (
                    <span className="day-precip">
                      <DropletIcon size={10} />
                      {day.precipitationProbability}%
                    </span>
                  )}
                </div>

                <div className="day-temps">
                  <span className="temp-min" style={{ color: getTempColor(day.temperatureMin) }}>
                    {Math.round(day.temperatureMin)}°
                  </span>
                  <div className="temp-bar-wrapper">
                    <div className="temp-bar-bg" />
                    <div
                      className="temp-bar-fill"
                      style={{
                        ...getBarPosition(day.temperatureMin, day.temperatureMax),
                        background: getGradient(day.temperatureMin, day.temperatureMax),
                      }}
                    />
                  </div>
                  <span className="temp-max" style={{ color: getTempColor(day.temperatureMax) }}>
                    {Math.round(day.temperatureMax)}°
                  </span>
                </div>

                <div className="day-expand">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </div>
              </div>

              {isExpanded && (
                <div className="day-details">
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">{t.condition}</span>
                      <span className="detail-value">{getWeatherDescription(day.weatherCode)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">{t.precipitation}</span>
                      <span className="detail-value">{day.precipitationSum?.toFixed(1) ?? 0} mm</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">{t.maxWind}</span>
                      <span className="detail-value">
                        <WindIcon size={12} />
                        {Math.round(day.windSpeedMax ?? 0)} km/h
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">{t.uvIndex}</span>
                      <span className="detail-value">{Math.round(day.uvIndexMax ?? 0)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .daily-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: clamp(16px, 4vw, 24px);
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 3vw, 20px);
          min-width: 0;
          overflow: hidden;
        }

        .daily-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .daily-title {
          font-size: clamp(14px, 3.5vw, 16px);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .temp-range-legend {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: clamp(9px, 2vw, 11px);
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .legend-bar {
          width: clamp(40px, 10vw, 60px);
          height: 4px;
          border-radius: 2px;
          background: linear-gradient(90deg, #2196f3, #00bcd4, #4caf50, #ff9800, #f44336);
        }

        .days-container {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .day-item {
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition);
          overflow: hidden;
        }

        .day-item:hover {
          background: var(--bg-subtle);
        }

        .day-item.today {
          background: var(--accent-subtle);
        }

        .day-item.expanded {
          background: var(--bg-subtle);
        }

        .day-main {
          display: grid;
          grid-template-columns: minmax(60px, 90px) 50px 1fr 20px;
          align-items: center;
          gap: clamp(8px, 2vw, 16px);
          padding: clamp(10px, 2.5vw, 14px) clamp(10px, 2.5vw, 16px);
        }

        .day-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .day-name {
          font-size: clamp(12px, 3vw, 14px);
          font-weight: 600;
          color: var(--text-primary);
          text-transform: capitalize;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .day-date {
          font-size: clamp(10px, 2.5vw, 12px);
          color: var(--text-tertiary);
        }

        .day-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          color: var(--accent);
          width: 45px;
          min-width: 45px;
        }

        .day-precip {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: clamp(8px, 2vw, 10px);
          color: #2196f3;
          font-weight: 500;
        }

        .day-temps {
          display: flex;
          align-items: center;
          gap: clamp(6px, 2vw, 12px);
          min-width: 0;
        }

        .temp-min,
        .temp-max {
          font-size: clamp(12px, 3vw, 14px);
          font-weight: 600;
          width: clamp(28px, 7vw, 36px);
          flex-shrink: 0;
        }

        .temp-min {
          text-align: right;
        }

        .temp-bar-wrapper {
          flex: 1;
          height: 5px;
          position: relative;
          min-width: clamp(40px, 15vw, 80px);
        }

        .temp-bar-bg {
          position: absolute;
          inset: 0;
          background: var(--border);
          border-radius: 3px;
        }

        .temp-bar-fill {
          position: absolute;
          top: 0;
          bottom: 0;
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        .day-expand {
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .day-details {
          padding: 0 clamp(10px, 2.5vw, 16px) clamp(10px, 2.5vw, 16px);
          border-top: 1px solid var(--border);
          padding-top: clamp(10px, 2.5vw, 12px);
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 120px), 1fr));
          gap: clamp(8px, 2vw, 12px);
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-label {
          font-size: clamp(9px, 2vw, 11px);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-weight: 500;
        }

        .detail-value {
          font-size: clamp(12px, 3vw, 14px);
          font-weight: 500;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .detail-value svg {
          color: var(--accent);
        }

        @media (max-width: 480px) {
          .day-main {
            grid-template-columns: minmax(50px, 70px) 40px 1fr 16px;
          }

          .temp-range-legend {
            display: none;
          }

          .day-precip {
            display: none;
          }
        }

        @media (hover: none) {
          .day-item:hover {
            background: transparent;
          }

          .day-item.today:hover {
            background: var(--accent-subtle);
          }

          .day-item.expanded:hover {
            background: var(--bg-subtle);
          }
        }
      `}</style>
    </div>
  );
};
