import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface RainRadarProps {
  lat: number;
  lon: number;
}

interface RadarFrame {
  time: number;
  path: string;
}

export const RainRadarCard: React.FC<RainRadarProps> = ({ lat, lon }) => {
  const { language } = useLanguage();
  const [radarFrames, setRadarFrames] = useState<RadarFrame[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof window.setInterval> | null>(null);

  // Fetch radar data from RainViewer API
  const fetchRadarData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://api.rainviewer.com/public/weather-maps.json');
      if (!response.ok) throw new Error('Failed to fetch radar data');
      const data = await response.json();

      // Get past frames and forecast frames
      const past = data.radar?.past || [];
      const nowcast = data.radar?.nowcast || [];

      const frames: RadarFrame[] = [
        ...past.map((frame: { time: number; path: string }) => ({
          time: frame.time,
          path: frame.path,
        })),
        ...nowcast.slice(0, 3).map((frame: { time: number; path: string }) => ({
          time: frame.time,
          path: frame.path,
        })),
      ];

      setRadarFrames(frames);
      setCurrentFrame(past.length - 1); // Start at most recent past frame
      setLoading(false);
    } catch (err) {
      setError('Unable to load radar data');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRadarData();
    // Refresh radar data every 10 minutes
    const refreshInterval = setInterval(fetchRadarData, 10 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, [fetchRadarData]);

  // Animation control
  useEffect(() => {
    if (isPlaying && radarFrames.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % radarFrames.length);
      }, 500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, radarFrames.length]);

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString(language === 'en' ? 'en-US' : language, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getFrameLabel = (index: number): string => {
    if (radarFrames.length === 0) return '';
    const pastCount = radarFrames.filter(f => f.time * 1000 < Date.now()).length;
    if (index < pastCount) {
      return formatTime(radarFrames[index].time);
    }
    return `+${(index - pastCount + 1) * 10}min`;
  };

  // Calculate zoom level based on desired coverage (approx 100km radius)
  const zoom = 7;
  const tileSize = 256;

  // Convert lat/lon to tile coordinates (returns fractional values for precise positioning)
  const getTileCoordsExact = (lat: number, lon: number, zoom: number) => {
    const n = Math.pow(2, zoom);
    const x = (lon + 180) / 360 * n;
    const latRad = lat * Math.PI / 180;
    const y = (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n;
    return { x, y };
  };

  const exactCoords = getTileCoordsExact(lat, lon, zoom);
  const tileX = Math.floor(exactCoords.x);
  const tileY = Math.floor(exactCoords.y);

  // Calculate the position of the city marker within the 3x3 tile grid
  // The fractional part (0-1) represents position within the center tile
  // We need to map this to the full grid where center tile is in the middle (33.33% - 66.66%)
  const fracX = exactCoords.x - tileX; // 0 to 1 within center tile
  const fracY = exactCoords.y - tileY; // 0 to 1 within center tile

  // Map to full grid: center tile spans from 33.33% to 66.66%
  // So position = 33.33% + (fraction * 33.33%)
  const markerX = (1 + fracX) / 3 * 100; // (1 + frac) because center tile is column 2 of 3
  const markerY = (1 + fracY) / 3 * 100; // (1 + frac) because center tile is row 2 of 3

  // Get surrounding tiles for better coverage
  const tiles = [
    { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
    { dx: -1, dy: 0 },  { dx: 0, dy: 0 },  { dx: 1, dy: 0 },
    { dx: -1, dy: 1 },  { dx: 0, dy: 1 },  { dx: 1, dy: 1 },
  ];

  const currentRadarPath = radarFrames[currentFrame]?.path || '';

  const radarLabels: Record<string, { title: string; noData: string; past: string; forecast: string }> = {
    es: { title: 'Radar de Lluvia', noData: 'Sin datos de radar', past: 'Pasado', forecast: 'Pronóstico' },
    en: { title: 'Rain Radar', noData: 'No radar data', past: 'Past', forecast: 'Forecast' },
    fr: { title: 'Radar de Pluie', noData: 'Pas de données radar', past: 'Passé', forecast: 'Prévision' },
    de: { title: 'Regenradar', noData: 'Keine Radardaten', past: 'Vergangen', forecast: 'Vorhersage' },
    pt: { title: 'Radar de Chuva', noData: 'Sem dados de radar', past: 'Passado', forecast: 'Previsão' },
  };

  const labels = radarLabels[language] || radarLabels.es;

  return (
    <div className="radar-card">
      <div className="radar-header">
        <h3 className="radar-title">{labels.title}</h3>
        <div className="radar-time">
          {radarFrames[currentFrame] && (
            <span className={currentFrame >= radarFrames.filter(f => f.time * 1000 < Date.now()).length ? 'forecast' : ''}>
              {getFrameLabel(currentFrame)}
            </span>
          )}
        </div>
      </div>

      <div className="radar-container" ref={mapRef}>
        {loading ? (
          <div className="radar-loading">
            <div className="loading-spinner" />
          </div>
        ) : error ? (
          <div className="radar-error">{error}</div>
        ) : (
          <>
            {/* Base map tiles (OpenStreetMap) */}
            <div className="map-layer base-map">
              {tiles.map(({ dx, dy }) => (
                <img
                  key={`base-${dx}-${dy}`}
                  src={`https://tile.openstreetmap.org/${zoom}/${tileX + dx}/${tileY + dy}.png`}
                  alt=""
                  style={{
                    gridColumn: dx + 2,
                    gridRow: dy + 2,
                  }}
                  loading="lazy"
                />
              ))}
            </div>

            {/* Radar overlay */}
            {currentRadarPath && (
              <div className="map-layer radar-layer">
                {tiles.map(({ dx, dy }) => (
                  <img
                    key={`radar-${dx}-${dy}-${currentFrame}`}
                    src={`https://tilecache.rainviewer.com${currentRadarPath}/${tileSize}/${zoom}/${tileX + dx}/${tileY + dy}/4/1_1.png`}
                    alt=""
                    style={{
                      gridColumn: dx + 2,
                      gridRow: dy + 2,
                    }}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ))}
              </div>
            )}

            {/* Center marker - positioned at exact city coordinates */}
            <div
              className="center-marker"
              style={{ left: `${markerX}%`, top: `${markerY}%` }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" fill="var(--accent)" fillOpacity="0.3" />
                <circle cx="12" cy="12" r="4" fill="var(--accent)" />
              </svg>
            </div>

            {/* Legend */}
            <div className="radar-legend">
              <div className="legend-gradient" />
              <div className="legend-labels">
                <span>0</span>
                <span>mm/h</span>
                <span>50+</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Timeline controls */}
      <div className="radar-controls">
        <button
          className="control-btn"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          )}
        </button>

        <div className="timeline">
          <div className="timeline-track">
            <div className="timeline-past" style={{ width: `${(radarFrames.filter(f => f.time * 1000 < Date.now()).length / radarFrames.length) * 100}%` }} />
            <div
              className="timeline-marker"
              style={{ left: `${(currentFrame / Math.max(1, radarFrames.length - 1)) * 100}%` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max={Math.max(0, radarFrames.length - 1)}
            value={currentFrame}
            onChange={(e) => {
              setCurrentFrame(parseInt(e.target.value));
              setIsPlaying(false);
            }}
            className="timeline-slider"
          />
        </div>

        <div className="timeline-labels">
          <span className="past-label">{labels.past}</span>
          <span className="forecast-label">{labels.forecast}</span>
        </div>
      </div>

      <style>{`
        .radar-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: clamp(12px, 3vw, 20px);
          display: flex;
          flex-direction: column;
          gap: 12px;
          height: 100%;
          min-height: 350px;
        }

        .radar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .radar-title {
          font-size: clamp(14px, 3.5vw, 16px);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .radar-time {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 4px 10px;
          background: var(--bg-subtle);
          border-radius: 12px;
        }

        .radar-time .forecast {
          color: var(--accent);
        }

        .radar-container {
          flex: 1;
          min-height: 200px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          position: relative;
          background: var(--bg-subtle);
        }

        .map-layer {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
        }

        .map-layer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .base-map {
          filter: saturate(0.7) brightness(0.95);
        }

        .dark .base-map {
          filter: invert(1) hue-rotate(180deg) saturate(0.5) brightness(0.8);
        }

        .radar-layer {
          opacity: 0.7;
          mix-blend-mode: multiply;
        }

        .dark .radar-layer {
          mix-blend-mode: screen;
          opacity: 0.85;
        }

        .center-marker {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 10;
          pointer-events: none;
        }

        .radar-legend {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: var(--bg-elevated);
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 9px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: var(--shadow-sm);
        }

        .legend-gradient {
          width: 80px;
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(90deg,
            transparent 0%,
            #00ff00 20%,
            #ffff00 40%,
            #ff8800 60%,
            #ff0000 80%,
            #ff00ff 100%
          );
        }

        .legend-labels {
          display: flex;
          justify-content: space-between;
          color: var(--text-tertiary);
        }

        .radar-loading,
        .radar-error {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: var(--text-tertiary);
          font-size: 13px;
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--border);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .radar-controls {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .control-btn {
          width: 36px;
          height: 36px;
          border: 1px solid var(--border);
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          flex-shrink: 0;
        }

        .control-btn:hover {
          background: var(--accent-subtle);
          border-color: var(--accent);
          color: var(--accent);
        }

        .timeline {
          flex: 1;
          position: relative;
          height: 36px;
          display: flex;
          align-items: center;
        }

        .timeline-track {
          position: absolute;
          left: 0;
          right: 0;
          height: 6px;
          background: var(--border);
          border-radius: 3px;
          overflow: hidden;
        }

        .timeline-past {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          background: var(--text-tertiary);
          opacity: 0.5;
        }

        .timeline-marker {
          position: absolute;
          top: 50%;
          width: 12px;
          height: 12px;
          background: var(--accent);
          border: 2px solid var(--bg-elevated);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          z-index: 2;
          pointer-events: none;
        }

        .timeline-slider {
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          height: 24px;
          opacity: 0;
          cursor: pointer;
          z-index: 3;
        }

        .timeline-labels {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: var(--text-tertiary);
        }

        .forecast-label {
          color: var(--accent);
        }
      `}</style>
    </div>
  );
};
