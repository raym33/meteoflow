import React, { useState, useEffect } from 'react';
import type { Alert } from '../services/alertsApi';
import { getAlertIcon, getAlertColor, fetchAllAlerts } from '../services/alertsApi';
import { getLocaleForLanguage } from '../services/weatherApi';
import { useLanguage } from '../i18n/LanguageContext';

interface AlertsCardProps {
  lat: number;
  lon: number;
  weatherCode: number;
  temperature: number;
  windSpeed: number;
  precipitation: number;
}

export const AlertsCard: React.FC<AlertsCardProps> = ({
  lat,
  lon,
  weatherCode,
  temperature,
  windSpeed,
  precipitation,
}) => {
  const { t, language } = useLanguage();
  const locale = getLocaleForLanguage(language);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const loadAlerts = async () => {
      setLoading(true);
      try {
        const data = await fetchAllAlerts(lat, lon, weatherCode, temperature, windSpeed, precipitation);
        setAlerts(data);
      } catch (error) {
        console.error('Error loading alerts:', error);
      }
      setLoading(false);
    };

    loadAlerts();

    // Refresh every 5 minutes
    const interval = setInterval(loadAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [lat, lon, weatherCode, temperature, windSpeed, precipitation]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatTime = (isoString?: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString(locale, {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const severityLabels: Record<Alert['severity'], string> = {
    extreme: t.severityExtreme,
    severe: t.severitySevere,
    moderate: t.severityModerate,
    minor: t.severityMinor,
    info: t.severityInfo,
  };

  const alertLabel = alerts.length === 1 ? t.alertSingular : t.alertPlural;

  if (loading) {
    return (
      <div className="alerts-loading">
        <div className="loading-spinner" />
        <span>{t.loadingAlerts}</span>

        <style>{`
          .alerts-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 40px;
            color: var(--text-tertiary);
          }

          .loading-spinner {
            width: 24px;
            height: 24px;
            border: 2px solid var(--border);
            border-top-color: var(--accent);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="alerts-empty">
        <div className="empty-icon">✓</div>
        <h4>{t.noAlerts}</h4>
        <p>{t.noAlertsDescription}</p>

        <style>{`
          .alerts-empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: clamp(20px, 5vw, 40px);
            gap: 12px;
          }

          .empty-icon {
            width: 48px;
            height: 48px;
            background: var(--success);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
          }

          .alerts-empty h4 {
            margin: 0;
            font-size: clamp(14px, 3.5vw, 16px);
            color: var(--text-primary);
          }

          .alerts-empty p {
            margin: 0;
            font-size: clamp(11px, 2.5vw, 13px);
            color: var(--text-tertiary);
            max-width: 250px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="alerts-container">
      <div className="alerts-summary">
        <span className="alert-count">{alerts.length} {alertLabel}</span>
        <div className="severity-badges">
          {['extreme', 'severe', 'moderate'].map(severity => {
            const count = alerts.filter(a => a.severity === severity).length;
            if (count === 0) return null;
            return (
              <span
                key={severity}
                className="severity-badge"
                style={{ background: getAlertColor(severity as Alert['severity']) }}
              >
                {count}
              </span>
            );
          })}
        </div>
      </div>

      <div className="alerts-list">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`alert-item ${expandedId === alert.id ? 'expanded' : ''}`}
            onClick={() => toggleExpand(alert.id)}
          >
            <div className="alert-header">
              <span className="alert-icon">{getAlertIcon(alert.type)}</span>
              <div className="alert-info">
                <div className="alert-title-row">
                  <span className="alert-title">{alert.title}</span>
                  <span
                    className="alert-severity"
                    style={{ background: getAlertColor(alert.severity) }}
                  >
                    {severityLabels[alert.severity] || t.severityUnknown}
                  </span>
                </div>
                <span className="alert-location">{alert.location}</span>
              </div>
              <svg
                className="expand-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {expandedId === alert.id && (
              <div className="alert-details">
                <p className="alert-description">{alert.description}</p>

                <div className="alert-meta">
                  {alert.startTime && (
                    <div className="meta-item">
                      <span className="meta-label">{t.start}</span>
                      <span className="meta-value">{formatTime(alert.startTime)}</span>
                    </div>
                  )}
                  {alert.endTime && (
                    <div className="meta-item">
                      <span className="meta-label">{t.end}</span>
                      <span className="meta-value">{formatTime(alert.endTime)}</span>
                    </div>
                  )}
                  {alert.magnitude && (
                    <div className="meta-item">
                      <span className="meta-label">{t.magnitude}</span>
                      <span className="meta-value">M{alert.magnitude.toFixed(1)}</span>
                    </div>
                  )}
                  {alert.distance && (
                    <div className="meta-item">
                      <span className="meta-label">{t.distance}</span>
                      <span className="meta-value">{alert.distance} km</span>
                    </div>
                  )}
                </div>

                <div className="alert-footer">
                  <span className="alert-source">{t.source}: {alert.source}</span>
                  {alert.url && (
                    <a
                      href={alert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="alert-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t.moreInfo} →
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .alerts-container {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 3vw, 16px);
          height: 100%;
        }

        .alerts-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: clamp(8px, 2vw, 12px);
          border-bottom: 1px solid var(--border);
        }

        .alert-count {
          font-size: clamp(12px, 3vw, 14px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .severity-badges {
          display: flex;
          gap: 6px;
        }

        .severity-badge {
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 600;
          color: white;
        }

        .alerts-list {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 2vw, 12px);
          overflow-y: auto;
          flex: 1;
          min-height: 0;
        }

        .alert-item {
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s;
        }

        .alert-item:hover {
          background: var(--accent-subtle);
        }

        .alert-header {
          display: flex;
          align-items: flex-start;
          gap: clamp(10px, 2.5vw, 12px);
          padding: clamp(10px, 2.5vw, 14px);
        }

        .alert-icon {
          font-size: clamp(20px, 5vw, 24px);
          flex-shrink: 0;
        }

        .alert-info {
          flex: 1;
          min-width: 0;
        }

        .alert-title-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          flex-wrap: wrap;
        }

        .alert-title {
          font-size: clamp(12px, 3vw, 14px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .alert-severity {
          padding: 2px 6px;
          border-radius: 4px;
          font-size: clamp(9px, 2vw, 10px);
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .alert-location {
          font-size: clamp(10px, 2.5vw, 12px);
          color: var(--text-tertiary);
          display: block;
          margin-top: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .expand-icon {
          color: var(--text-tertiary);
          transition: transform 0.2s;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .alert-item.expanded .expand-icon {
          transform: rotate(180deg);
        }

        .alert-details {
          padding: 0 clamp(10px, 2.5vw, 14px) clamp(10px, 2.5vw, 14px);
          border-top: 1px solid var(--border);
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .alert-description {
          font-size: clamp(11px, 2.5vw, 13px);
          color: var(--text-secondary);
          line-height: 1.5;
          margin: clamp(8px, 2vw, 12px) 0;
        }

        .alert-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 100px), 1fr));
          gap: clamp(8px, 2vw, 12px);
          margin-bottom: clamp(8px, 2vw, 12px);
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .meta-label {
          font-size: clamp(9px, 2vw, 10px);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .meta-value {
          font-size: clamp(12px, 3vw, 14px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .alert-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: clamp(8px, 2vw, 10px);
          border-top: 1px solid var(--border);
        }

        .alert-source {
          font-size: clamp(9px, 2vw, 11px);
          color: var(--text-tertiary);
        }

        .alert-link {
          font-size: clamp(11px, 2.5vw, 12px);
          color: var(--accent);
          text-decoration: none;
          font-weight: 500;
        }

        .alert-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
