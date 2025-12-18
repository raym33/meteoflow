import React, { useState } from 'react';
import type { HourlyForecast } from '../types/weather';
import { DropletIcon } from './Icons';
import { WeatherIconAnimated } from './WeatherIconAnimated';
import { useLanguage } from '../i18n/LanguageContext';

interface HourlyForecastCardProps {
  hours: HourlyForecast[];
}

export const HourlyForecastCard: React.FC<HourlyForecastCardProps> = ({ hours }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  // Select 10 hours evenly spread across 24 hours (every ~2.5 hours)
  const indices = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27];
  const displayHours = indices.map(i => hours[Math.min(i, hours.length - 1)]).filter(Boolean);
  const numPoints = displayHours.length;

  const formatHour = (timeStr: string, originalIndex: number): string => {
    if (originalIndex === 0) return t.now;
    const hour = new Date(timeStr).getHours();
    return `${hour}:00`;
  };

  const isDay = (timeStr: string): boolean => {
    const hour = new Date(timeStr).getHours();
    return hour >= 7 && hour < 20;
  };

  const temps = displayHours.map(h => h.temperature);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const tempRange = maxTemp - minTemp || 1;

  const getY = (temp: number): number => {
    return 75 - ((temp - minTemp) / tempRange) * 55;
  };

  const getX = (index: number): number => {
    const padding = 5; // percentage padding on each side
    const usableWidth = 100 - (padding * 2);
    return padding + (index / (numPoints - 1)) * usableWidth;
  };

  const createPath = (): string => {
    const points = displayHours.map((h, i) => ({
      x: getX(i),
      y: getY(h.temperature)
    }));

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      path += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
    }

    return path;
  };

  const createAreaPath = (): string => {
    const linePath = createPath();
    const lastX = getX(numPoints - 1);
    const firstX = getX(0);
    return `${linePath} L ${lastX} 95 L ${firstX} 95 Z`;
  };

  const getTempColor = (temp: number): string => {
    if (temp <= 0) return '#2196f3';
    if (temp <= 10) return '#00bcd4';
    if (temp <= 20) return '#4caf50';
    if (temp <= 30) return '#ff9800';
    return '#f44336';
  };

  const selectedHour = selectedIndex !== null ? displayHours[selectedIndex] : null;

  return (
    <div className="hourly-card">
      <div className="hourly-header">
        <div>
          <h3 className="hourly-title">{t.next24Hours}</h3>
          <p className="hourly-subtitle">
            {selectedHour ? (
              <>
                <span style={{ color: getTempColor(selectedHour.temperature) }}>
                  {Math.round(selectedHour.temperature)}°
                </span>
                {' '}{t.atTime}{' '}{formatHour(selectedHour.time, selectedIndex === 0 ? 0 : 1)}
              </>
            ) : (
              <>{t.max} {Math.round(maxTemp)}° · {t.min} {Math.round(minTemp)}°</>
            )}
          </p>
        </div>
        {selectedHour && selectedHour.precipitationProbability > 0 && (
          <div className="rain-badge">
            <DropletIcon size={12} />
            <span>{selectedHour.precipitationProbability}%</span>
          </div>
        )}
      </div>

      <div className="chart-and-hours">
        {/* SVG Chart */}
        <div className="chart-container">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="temp-chart"
          >
            <defs>
              <linearGradient id="tempGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Horizontal guide lines */}
            <line x1="0" y1="20" x2="100" y2="20" stroke="var(--border)" strokeWidth="0.3" strokeDasharray="2" />
            <line x1="0" y1="47" x2="100" y2="47" stroke="var(--border)" strokeWidth="0.3" strokeDasharray="2" />
            <line x1="0" y1="75" x2="100" y2="75" stroke="var(--border)" strokeWidth="0.3" strokeDasharray="2" />

            {/* Area fill */}
            <path d={createAreaPath()} fill="url(#tempGradient)" />

            {/* Line */}
            <path
              d={createPath()}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Vertical line when selected */}
            {selectedIndex !== null && (
              <line
                x1={getX(selectedIndex)}
                y1={getY(displayHours[selectedIndex].temperature) + 3}
                x2={getX(selectedIndex)}
                y2="95"
                stroke="var(--accent)"
                strokeWidth="0.3"
                strokeDasharray="1"
              />
            )}

            {/* Points */}
            {displayHours.map((h, i) => (
              <g key={i}>
                {/* Invisible larger hit area */}
                <circle
                  cx={getX(i)}
                  cy={getY(h.temperature)}
                  r="5"
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setSelectedIndex(i)}
                  onMouseLeave={() => setSelectedIndex(null)}
                  onTouchStart={() => setSelectedIndex(i)}
                />
                {/* Visible point */}
                <circle
                  cx={getX(i)}
                  cy={getY(h.temperature)}
                  r={selectedIndex === i ? 2.5 : 1.5}
                  fill={selectedIndex === i ? getTempColor(h.temperature) : 'var(--bg-elevated)'}
                  stroke={selectedIndex === i ? 'var(--bg-elevated)' : 'var(--accent)'}
                  strokeWidth="0.5"
                  style={{ transition: 'all 0.2s', pointerEvents: 'none' }}
                />
              </g>
            ))}
          </svg>

          {/* Temperature labels on the right */}
          <div className="chart-labels">
            <span>{Math.round(maxTemp)}°</span>
            <span>{Math.round((maxTemp + minTemp) / 2)}°</span>
            <span>{Math.round(minTemp)}°</span>
          </div>
        </div>

        {/* Hour boxes - aligned with chart points */}
        <div className="hours-grid">
          {displayHours.map((hour, index) => (
            <div
              key={hour.time}
              className={`hour-item ${index === 0 ? 'current' : ''} ${selectedIndex === index ? 'selected' : ''}`}
              onMouseEnter={() => setSelectedIndex(index)}
              onMouseLeave={() => setSelectedIndex(null)}
              onTouchStart={() => setSelectedIndex(index)}
            >
              <span className="hour-time">{formatHour(hour.time, index)}</span>
              <div className="hour-icon">
                <WeatherIconAnimated
                  weatherCode={hour.weatherCode}
                  isDay={isDay(hour.time)}
                  size={28}
                />
              </div>
              <span className="hour-temp" style={{ color: getTempColor(hour.temperature) }}>
                {Math.round(hour.temperature)}°
              </span>
              {hour.precipitationProbability > 0 && (
                <div className="hour-rain">
                  <DropletIcon size={8} />
                  {hour.precipitationProbability}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hourly-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: clamp(16px, 4vw, 24px);
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 3vw, 16px);
          height: 100%;
          min-width: 0;
          overflow: hidden;
        }

        .hourly-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          flex-wrap: wrap;
        }

        .hourly-title {
          font-size: clamp(14px, 3.5vw, 16px);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 4px 0;
        }

        .hourly-subtitle {
          font-size: clamp(11px, 2.5vw, 13px);
          color: var(--text-tertiary);
          margin: 0;
        }

        .rain-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          background: rgba(33, 150, 243, 0.1);
          color: #2196f3;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 500;
          flex-shrink: 0;
        }

        .chart-and-hours {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .chart-container {
          position: relative;
          height: clamp(80px, 12vw, 100px);
          width: 100%;
        }

        .temp-chart {
          width: 100%;
          height: 100%;
          display: block;
        }

        .chart-labels {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 15% 0 22%;
          font-size: clamp(8px, 2vw, 10px);
          color: var(--text-tertiary);
          font-weight: 500;
          background: linear-gradient(90deg, transparent, var(--bg-elevated) 40%);
          padding-left: 16px;
          padding-right: 4px;
        }

        .hours-grid {
          display: grid;
          grid-template-columns: repeat(${numPoints}, 1fr);
          gap: 4px;
          padding-top: 8px;
        }

        .hour-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: clamp(8px, 2vw, 12px) 4px;
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition);
          min-width: 0;
        }

        .hour-item:hover,
        .hour-item.selected {
          background: var(--accent-subtle);
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .hour-item.current {
          background: linear-gradient(135deg, var(--accent) 0%, #4a90d9 100%);
          border-color: transparent;
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .hour-item.current .hour-time,
        .hour-item.current .hour-temp {
          color: white !important;
        }

        .hour-item.current .hour-rain {
          background: rgba(255,255,255,0.25);
          color: white;
        }

        .hour-icon {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hour-time {
          font-size: clamp(9px, 2vw, 11px);
          font-weight: 600;
          color: var(--text-secondary);
          letter-spacing: 0.2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .hour-temp {
          font-size: clamp(12px, 3vw, 15px);
          font-weight: 700;
        }

        .hour-rain {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: clamp(7px, 1.8vw, 9px);
          color: #2196f3;
          background: rgba(33, 150, 243, 0.1);
          padding: 2px 4px;
          border-radius: 4px;
        }

        @media (max-width: 600px) {
          .hours-grid {
            grid-template-columns: repeat(5, 1fr);
          }

          .hour-item:nth-child(n+6) {
            display: none;
          }
        }

        @media (max-width: 400px) {
          .hour-item {
            padding: 6px 2px;
          }

          .hour-icon {
            width: 24px;
            height: 24px;
          }
        }

        @media (hover: none) {
          .hour-item:hover {
            background: var(--bg-subtle);
            transform: none;
            box-shadow: none;
          }

          .hour-item.selected {
            background: var(--accent-subtle);
            transform: translateY(-2px);
          }

          .hour-item.current:hover {
            background: linear-gradient(135deg, var(--accent) 0%, #4a90d9 100%);
          }
        }
      `}</style>
    </div>
  );
};
