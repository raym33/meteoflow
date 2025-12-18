import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// HISTORICAL DATA TYPES
// ============================================================================

export type HistoryType = 'temperature' | 'humidity' | 'pressure' | 'wind' | 'precipitation' | 'uv' | 'air_quality';

interface HistoricalDataPoint {
  date: string;
  value: number;
  label?: string;
}

interface HistoricalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: HistoryType;
  title: string;
  currentValue: number;
  unit: string;
  lat: number;
  lon: number;
}

// ============================================================================
// FETCH HISTORICAL DATA FROM OPEN-METEO
// ============================================================================

const fetchHistoricalData = async (
  lat: number,
  lon: number,
  type: HistoryType,
  days: number = 7
): Promise<HistoricalDataPoint[]> => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  let variable = '';
  switch (type) {
    case 'temperature':
      variable = 'temperature_2m_max,temperature_2m_min';
      break;
    case 'humidity':
      variable = 'relative_humidity_2m_mean';
      break;
    case 'pressure':
      variable = 'pressure_msl_mean';
      break;
    case 'wind':
      variable = 'wind_speed_10m_max';
      break;
    case 'precipitation':
      variable = 'precipitation_sum';
      break;
    case 'uv':
      variable = 'uv_index_max';
      break;
    default:
      variable = 'temperature_2m_max';
  }

  try {
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}&daily=${variable}&timezone=auto`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('API error');

    const data = await response.json();
    const times = data.daily?.time || [];
    const values = data.daily?.[Object.keys(data.daily).find(k => k !== 'time') || ''] || [];

    return times.map((time: string, i: number) => ({
      date: time,
      value: values[i] ?? 0,
    }));
  } catch (error) {
    console.error('Error fetching historical data:', error);
    // Return mock data on error
    return generateMockData(days, type);
  }
};

const generateMockData = (days: number, type: HistoryType): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  const baseValues: Record<HistoryType, { base: number; variance: number }> = {
    temperature: { base: 20, variance: 8 },
    humidity: { base: 60, variance: 20 },
    pressure: { base: 1013, variance: 15 },
    wind: { base: 15, variance: 10 },
    precipitation: { base: 2, variance: 5 },
    uv: { base: 5, variance: 3 },
    air_quality: { base: 50, variance: 30 },
  };

  const { base, variance } = baseValues[type];

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(0, base + (Math.random() - 0.5) * variance * 2),
    });
  }

  return data;
};

// ============================================================================
// CHART COMPONENT
// ============================================================================

interface ChartProps {
  data: HistoricalDataPoint[];
  unit: string;
  color: string;
}

const HistoryChart: React.FC<ChartProps> = ({ data, unit, color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{ index: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const values = data.map(d => d.value);
    const minVal = Math.min(...values) * 0.9;
    const maxVal = Math.max(...values) * 1.1;
    const range = maxVal - minVal || 1;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Get CSS variables
    const style = getComputedStyle(document.documentElement);
    const textColor = style.getPropertyValue('--text-tertiary').trim() || '#999';
    const borderColor = style.getPropertyValue('--border').trim() || 'rgba(0,0,0,0.1)';

    // Draw grid lines
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
    }

    // Draw Y-axis labels
    ctx.fillStyle = textColor;
    ctx.font = '11px -apple-system, sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartHeight / 4) * i;
      const value = maxVal - (range / 4) * i;
      ctx.fillText(value.toFixed(1), padding.left - 8, y + 4);
    }

    // Draw X-axis labels
    ctx.textAlign = 'center';
    const step = Math.ceil(data.length / 7);
    data.forEach((d, i) => {
      if (i % step === 0 || i === data.length - 1) {
        const x = padding.left + (chartWidth / (data.length - 1)) * i;
        const date = new Date(d.date);
        const label = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
        ctx.fillText(label, x, height - padding.bottom + 20);
      }
    });

    // Draw area gradient
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, color + '40');
    gradient.addColorStop(1, color + '00');

    ctx.beginPath();
    data.forEach((d, i) => {
      const x = padding.left + (chartWidth / (data.length - 1)) * i;
      const y = padding.top + chartHeight - ((d.value - minVal) / range) * chartHeight;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(padding.left + chartWidth, height - padding.bottom);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    data.forEach((d, i) => {
      const x = padding.left + (chartWidth / (data.length - 1)) * i;
      const y = padding.top + chartHeight - ((d.value - minVal) / range) * chartHeight;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw points
    data.forEach((d, i) => {
      const x = padding.left + (chartWidth / (data.length - 1)) * i;
      const y = padding.top + chartHeight - ((d.value - minVal) / range) * chartHeight;

      ctx.beginPath();
      ctx.arc(x, y, hoveredPoint?.index === i ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = hoveredPoint?.index === i ? color : '#fff';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    });

  }, [data, color, hoveredPoint]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const padding = { left: 50, right: 20 };
    const chartWidth = rect.width - padding.left - padding.right;
    const index = Math.round(((x - padding.left) / chartWidth) * (data.length - 1));

    if (index >= 0 && index < data.length) {
      const pointX = padding.left + (chartWidth / (data.length - 1)) * index;
      setHoveredPoint({ index, x: pointX, y: e.clientY - rect.top });
    } else {
      setHoveredPoint(null);
    }
  };

  const handleMouseLeave = () => setHoveredPoint(null);

  return (
    <div className="chart-container">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ width: '100%', height: '100%' }}
      />
      {hoveredPoint && data[hoveredPoint.index] && (
        <div
          className="chart-tooltip"
          style={{
            left: hoveredPoint.x,
            top: hoveredPoint.y - 40,
          }}
        >
          <div className="tooltip-value">
            {data[hoveredPoint.index].value.toFixed(1)} {unit}
          </div>
          <div className="tooltip-date">
            {new Date(data[hoveredPoint.index].date).toLocaleDateString('es-ES', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            })}
          </div>
        </div>
      )}

      <style>{`
        .chart-container {
          position: relative;
          width: 100%;
          height: 250px;
        }

        .chart-tooltip {
          position: absolute;
          transform: translateX(-50%);
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          pointer-events: none;
          z-index: 10;
          animation: tooltipFade 0.15s ease;
        }

        @keyframes tooltipFade {
          from { opacity: 0; transform: translateX(-50%) translateY(5px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .tooltip-value {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .tooltip-date {
          font-size: 11px;
          color: var(--text-tertiary);
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// MAIN MODAL COMPONENT
// ============================================================================

export const HistoricalModal: React.FC<HistoricalModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  currentValue,
  unit,
  lat,
  lon,
}) => {
  const [data, setData] = useState<HistoricalDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<7 | 14 | 30>(7);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchHistoricalData(lat, lon, type, period).then(result => {
        setData(result);
        setLoading(false);
      });
    }
  }, [isOpen, lat, lon, type, period]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  const getColor = (): string => {
    switch (type) {
      case 'temperature': return '#ff6b6b';
      case 'humidity': return '#4ecdc4';
      case 'pressure': return '#a855f7';
      case 'wind': return '#3b82f6';
      case 'precipitation': return '#06b6d4';
      case 'uv': return '#f59e0b';
      case 'air_quality': return '#22c55e';
      default: return '#6366f1';
    }
  };

  const stats = data.length > 0 ? {
    min: Math.min(...data.map(d => d.value)),
    max: Math.max(...data.map(d => d.value)),
    avg: data.reduce((sum, d) => sum + d.value, 0) / data.length,
    trend: data[data.length - 1]?.value - data[0]?.value,
  } : null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container" ref={modalRef}>
        <div className="modal-header">
          <div className="modal-title-section">
            <h2 className="modal-title">{title}</h2>
            <div className="current-value" style={{ color: getColor() }}>
              {currentValue.toFixed(1)} <span className="current-unit">{unit}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-content">
          <div className="period-selector">
            {([7, 14, 30] as const).map(p => (
              <button
                key={p}
                className={`period-btn ${period === p ? 'active' : ''}`}
                onClick={() => setPeriod(p)}
              >
                {p} días
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner" />
              <span>Cargando historial...</span>
            </div>
          ) : (
            <>
              <HistoryChart data={data} unit={unit} color={getColor()} />

              {stats && (
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Mínimo</span>
                    <span className="stat-value">{stats.min.toFixed(1)} {unit}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Máximo</span>
                    <span className="stat-value">{stats.max.toFixed(1)} {unit}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Promedio</span>
                    <span className="stat-value">{stats.avg.toFixed(1)} {unit}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Tendencia</span>
                    <span className={`stat-value trend ${stats.trend >= 0 ? 'up' : 'down'}`}>
                      {stats.trend >= 0 ? '↑' : '↓'} {Math.abs(stats.trend).toFixed(1)} {unit}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: backdropFade 0.2s ease;
        }

        @keyframes backdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-container {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: modalSlide 0.3s ease;
        }

        @keyframes modalSlide {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: clamp(16px, 4vw, 24px);
          border-bottom: 1px solid var(--border);
        }

        .modal-title-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .modal-title {
          font-size: clamp(16px, 4vw, 20px);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .current-value {
          font-size: clamp(24px, 6vw, 32px);
          font-weight: 700;
          line-height: 1.2;
        }

        .current-unit {
          font-size: 0.5em;
          font-weight: 500;
          opacity: 0.7;
        }

        .modal-close {
          width: 40px;
          height: 40px;
          border: none;
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .modal-close:hover {
          background: var(--danger);
          color: white;
          transform: rotate(90deg);
        }

        .modal-content {
          padding: clamp(16px, 4vw, 24px);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 4vw, 24px);
        }

        .period-selector {
          display: flex;
          gap: 8px;
          background: var(--bg-subtle);
          padding: 4px;
          border-radius: var(--radius-md);
          width: fit-content;
        }

        .period-btn {
          padding: 8px 16px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 500;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s;
        }

        .period-btn:hover {
          color: var(--text-primary);
        }

        .period-btn.active {
          background: var(--bg-elevated);
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 250px;
          gap: 12px;
          color: var(--text-tertiary);
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: clamp(8px, 2vw, 12px);
        }

        .stat-item {
          background: var(--bg-subtle);
          padding: clamp(12px, 3vw, 16px);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-label {
          font-size: clamp(10px, 2.5vw, 11px);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-size: clamp(14px, 3.5vw, 16px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .stat-value.trend.up {
          color: #22c55e;
        }

        .stat-value.trend.down {
          color: #ef4444;
        }

        @media (max-width: 480px) {
          .modal-backdrop {
            padding: 0;
            align-items: flex-end;
          }

          .modal-container {
            max-width: 100%;
            max-height: 85vh;
            border-radius: var(--radius-xl) var(--radius-xl) 0 0;
            animation: modalSlideUp 0.3s ease;
          }

          @keyframes modalSlideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// CLICKABLE VALUE COMPONENT (for triggering history)
// ============================================================================

interface ClickableValueProps {
  value: number;
  unit: string;
  type: HistoryType;
  title: string;
  lat: number;
  lon: number;
  className?: string;
  children?: React.ReactNode;
}

export const ClickableValue: React.FC<ClickableValueProps> = ({
  value,
  unit,
  type,
  title,
  lat,
  lon,
  className,
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className={`clickable-value ${className || ''}`}
        onClick={() => setIsModalOpen(true)}
        title="Ver historial"
      >
        {children || `${value.toFixed(1)} ${unit}`}
        <span className="history-indicator">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </span>
      </button>

      <HistoricalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={type}
        title={title}
        currentValue={value}
        unit={unit}
        lat={lat}
        lon={lon}
      />

      <style>{`
        .clickable-value {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          padding: 2px 6px;
          margin: -2px -6px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font: inherit;
          color: inherit;
          transition: all 0.2s;
          position: relative;
        }

        .clickable-value:hover {
          background: var(--accent-subtle);
        }

        .clickable-value:hover .history-indicator {
          opacity: 1;
          transform: scale(1);
        }

        .history-indicator {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.2s;
          color: var(--accent);
        }
      `}</style>
    </>
  );
};
