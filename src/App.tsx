import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { useWeather, useDarkMode } from './hooks/useWeather';
import { LocationSearch } from './components/LocationSearch';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { HourlyForecastCard } from './components/HourlyForecast';
import { DailyForecastCard } from './components/DailyForecast';
import { AirQualityCard, SunTimesCard, WindCard, MarineCard, InfoCardStyles } from './components/InfoCards';
import { AlertsCard } from './components/AlertsCard';
import { RainRadarCard } from './components/RainRadar';
import { SunIcon, MoonIcon, RefreshIcon } from './components/Icons';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { LanguageSelector } from './components/LanguageSelector';
import {
  ScreenProvider,
  DraggableGrid,
  ScreenInfoDisplay,
  saveCardLayout,
  loadCardLayout,
  type CardConfig,
  type CardSize,
} from './components/DraggableGrid';

// Lazy load 3D landscape engine for better performance
const LandscapeEngine = lazy(() =>
  import('./components/LandscapeEngine').then(m => ({ default: m.LandscapeEngine }))
);

// Default card configurations (titles will be translated in component)
const DEFAULT_CARDS: CardConfig[] = [
  { id: 'current', title: 'currentWeather', size: 'large', order: 0, visible: true },
  { id: 'hourly', title: 'hourlyForecast', size: 'large', order: 1, visible: true },
  { id: 'radar', title: 'radar', size: 'large', order: 2, visible: true },
  { id: 'alerts', title: 'alerts', size: 'small', order: 3, visible: true },
  { id: 'daily', title: 'dailyForecast', size: 'large', order: 4, visible: true },
  { id: 'air', title: 'airQuality', size: 'small', order: 5, visible: true },
  { id: 'sun', title: 'sunrise', size: 'small', order: 6, visible: true },
  { id: 'wind', title: 'wind', size: 'small', order: 7, visible: true },
  { id: 'marine', title: 'marine', size: 'small', order: 8, visible: true },
];


// Main App Content (uses screen context)
const AppContent: React.FC = () => {
  const {
    data,
    loading,
    error,
    location,
    setLocation,
    refresh,
    searchResults,
    search,
    searching,
    useCurrentLocation,
  } = useWeather();

  const [isDark, toggleDark] = useDarkMode();
  const { t } = useLanguage();
  const [cards, setCards] = useState<CardConfig[]>(() => loadCardLayout(DEFAULT_CARDS));
  const [isEditMode, setIsEditMode] = useState(false);

  // Save layout when cards change
  useEffect(() => {
    saveCardLayout(cards);
  }, [cards]);

  // Handle card size change
  const handleSizeChange = useCallback((id: string, size: CardSize) => {
    setCards(prev => prev.map(card =>
      card.id === id ? { ...card, size } : card
    ));
  }, []);

  // Toggle card visibility
  const toggleCardVisibility = useCallback((id: string) => {
    setCards(prev => prev.map(card =>
      card.id === id ? { ...card, visible: !card.visible } : card
    ));
  }, []);

  // Handle card reordering via drag and drop
  const handleReorder = useCallback((reorderedCards: CardConfig[]) => {
    setCards(reorderedCards);
  }, []);

  // Reset layout
  const resetLayout = useCallback(() => {
    setCards(DEFAULT_CARDS);
  }, []);

  // Render card content
  const renderCardContent = useCallback((config: CardConfig) => {
    if (!data) return null;

    switch (config.id) {
      case 'current':
        return (
          <CurrentWeatherCard
            weather={data.current}
            airQuality={data.airQuality}
            location={data.location}
            lastUpdated={data.lastUpdated}
            lat={data.location.latitude}
            lon={data.location.longitude}
          />
        );
      case 'hourly':
        return <HourlyForecastCard hours={data.hourly} />;
      case 'radar':
        return <RainRadarCard lat={data.location.latitude} lon={data.location.longitude} />;
      case 'daily':
        return <DailyForecastCard days={data.daily} />;
      case 'alerts':
        return (
          <AlertsCard
            lat={data.location.latitude}
            lon={data.location.longitude}
            weatherCode={data.current.weatherCode}
            temperature={data.current.temperature}
            windSpeed={data.current.windSpeed}
            precipitation={data.current.precipitation || 0}
          />
        );
      case 'air':
        return <AirQualityCard airQuality={data.airQuality} />;
      case 'sun':
        return <SunTimesCard today={data.daily[0]} weather={data.current} lat={data.location.latitude} lon={data.location.longitude} />;
      case 'wind':
        return <WindCard weather={data.current} lat={data.location.latitude} lon={data.location.longitude} />;
      case 'marine':
        return data.marine ? <MarineCard marine={data.marine} /> : (
          <div className="no-marine">
            <p>{t.noMarineData}</p>
          </div>
        );
      default:
        return null;
    }
  }, [data]);

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <InfoCardStyles />

      {/* 3D Landscape Background */}
      {data && (
        <Suspense fallback={<div className="landscape-loading" />}>
          <LandscapeEngine
            weatherParams={{
              temperature: data.current.temperature,
              weatherCode: data.current.weatherCode,
              isDay: data.current.isDay,
              humidity: data.current.humidity,
              windSpeed: data.current.windSpeed,
              precipitation: data.current.precipitation || 0,
              cloudCover: data.current.cloudCover || 0,
              visibility: data.current.visibility,
            }}
            className="landscape-background"
          />
        </Suspense>
      )}

      {/* Glass overlay for content */}
      <div className="app-overlay">
        <header className="app-header">
          <div className="header-content">
            <div className="brand">
              <div className="brand-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="16" cy="16" r="6" fill="currentColor"/>
                  <line x1="16" y1="1" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="16" y1="26" x2="16" y2="31" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="1" y1="16" x2="6" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="26" y1="16" x2="31" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="brand-text">
                <span className="brand-name">MeteoFlow</span>
                <span className="brand-version">PRO</span>
              </div>
            </div>

            <div className="header-center">
              <LocationSearch
                onSelect={setLocation}
                onSearch={search}
                searchResults={searchResults}
                searching={searching}
                onUseCurrentLocation={useCurrentLocation}
                currentLocation={location}
              />
            </div>

            <div className="header-actions">
              <ScreenInfoDisplay />
              <LanguageSelector />
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`action-btn ${isEditMode ? 'active' : ''}`}
                aria-label={t.settings}
                title={t.settings}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
              </button>
              <button
                onClick={refresh}
                className={`action-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
                aria-label={t.retry}
              >
                <RefreshIcon size={20} />
              </button>
              <button onClick={toggleDark} className="action-btn" aria-label={isDark ? t.lightMode : t.darkMode}>
                {isDark ? <SunIcon size={20} /> : <MoonIcon size={20} />}
              </button>
            </div>
          </div>
        </header>

        {/* Edit Mode Panel */}
        {isEditMode && (
          <div className="edit-panel">
            <div className="edit-panel-content">
              <h3>{t.customizeDashboard}</h3>
              <p>{t.dragToReorder}</p>

              <div className="card-toggles">
                {cards.map(card => (
                  <label key={card.id} className="card-toggle">
                    <input
                      type="checkbox"
                      checked={card.visible}
                      onChange={() => toggleCardVisibility(card.id)}
                    />
                    <span className="toggle-label">{(t as any)[card.title] || card.title}</span>
                    <span className={`toggle-size ${card.size}`}>
                      {card.size === 'small' ? t.small.charAt(0).toUpperCase() : t.large.charAt(0).toUpperCase()}
                    </span>
                  </label>
                ))}
              </div>

              <button onClick={resetLayout} className="reset-btn">
                {t.resetLayout}
              </button>
            </div>
          </div>
        )}

        <main className="main-content">
          {loading && !data ? (
            <div className="loading-state">
              <div className="loading-spinner">
                <svg viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="80 40" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="loading-text">{t.loading}</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <div className="error-icon">!</div>
              <p className="error-text">{t.error}</p>
              <button onClick={useCurrentLocation} className="error-btn">{t.retry}</button>
            </div>
          ) : data ? (
            <DraggableGrid
              cards={cards}
              onReorder={handleReorder}
              onSizeChange={handleSizeChange}
              renderCard={renderCardContent}
            />
          ) : null}
        </main>

        <footer className="app-footer">
          <span>MeteoFlow PRO</span>
          <span className="footer-separator">•</span>
          <span>100+ {t.landscapes3D}</span>
          <span className="footer-separator">•</span>
          <span>{t.realTimeAlerts}</span>
          <span className="footer-separator">•</span>
          <span>Open-Meteo • USGS • NWS</span>
        </footer>
      </div>

      <style>{`
        :root {
          --bg-base: rgba(250, 250, 250, 0.85);
          --bg-elevated: rgba(255, 255, 255, 0.9);
          --bg-subtle: rgba(245, 245, 245, 0.8);
          --border: rgba(0, 0, 0, 0.08);
          --border-strong: rgba(0, 0, 0, 0.12);
          --text-primary: #1a1a1a;
          --text-secondary: #666666;
          --text-tertiary: #999999;
          --accent: #0066ff;
          --accent-subtle: rgba(0, 102, 255, 0.1);
          --success: #00c853;
          --warning: #ffab00;
          --danger: #ff3d00;
          --temp-cold: #2196f3;
          --temp-cool: #00bcd4;
          --temp-mild: #4caf50;
          --temp-warm: #ff9800;
          --temp-hot: #f44336;
          --radius-sm: 8px;
          --radius-md: 12px;
          --radius-lg: 16px;
          --radius-xl: 20px;
          --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
          --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
          --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.16);
          --glass-blur: blur(20px);
          --transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dark {
          --bg-base: rgba(13, 13, 13, 0.85);
          --bg-elevated: rgba(26, 26, 26, 0.9);
          --bg-subtle: rgba(20, 20, 20, 0.8);
          --border: rgba(255, 255, 255, 0.1);
          --border-strong: rgba(255, 255, 255, 0.15);
          --text-primary: #ffffff;
          --text-secondary: #a0a0a0;
          --text-tertiary: #666666;
          --accent: #4d94ff;
          --accent-subtle: rgba(77, 148, 255, 0.15);
          --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
          --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
          --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          font-size: 16px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
          background: #000;
          color: var(--text-primary);
          line-height: 1.5;
          overflow-x: hidden;
        }

        .app {
          min-height: 100vh;
          min-height: 100dvh;
          position: relative;
        }

        .landscape-background {
          position: fixed !important;
          inset: 0;
          z-index: 0;
        }

        .landscape-loading {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }

        .app-overlay {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(180deg, transparent 0%, var(--bg-base) 20%);
        }

        /* Header */
        .app-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--bg-elevated);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border-bottom: 1px solid var(--border);
        }

        .header-content {
          max-width: 1800px;
          margin: 0 auto;
          padding: 0 clamp(12px, 3vw, 24px);
          height: clamp(52px, 8vh, 68px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(8px, 2vw, 16px);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .brand-icon {
          width: clamp(32px, 5vw, 40px);
          height: clamp(32px, 5vw, 40px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
        }

        .brand-icon svg {
          width: 100%;
          height: 100%;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-size: clamp(14px, 2vw, 18px);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.5px;
        }

        .brand-version {
          font-size: 9px;
          color: var(--accent);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: var(--accent-subtle);
          padding: 1px 4px;
          border-radius: 4px;
          width: fit-content;
        }

        .header-center {
          flex: 1;
          max-width: 400px;
          min-width: 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: clamp(4px, 1vw, 8px);
          flex-shrink: 0;
        }

        .action-btn {
          width: clamp(36px, 5vw, 42px);
          height: clamp(36px, 5vw, 42px);
          border: 1px solid var(--border);
          background: var(--bg-elevated);
          backdrop-filter: var(--glass-blur);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .action-btn:hover {
          background: var(--accent-subtle);
          color: var(--accent);
          border-color: var(--accent);
        }

        .action-btn.active {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }

        .action-btn.loading svg {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Edit Panel */
        .edit-panel {
          background: var(--bg-elevated);
          border-bottom: 1px solid var(--border);
          padding: clamp(12px, 3vw, 20px);
        }

        .edit-panel-content {
          max-width: 1800px;
          margin: 0 auto;
        }

        .edit-panel h3 {
          font-size: clamp(14px, 3vw, 16px);
          margin-bottom: 4px;
          color: var(--text-primary);
        }

        .edit-panel p {
          font-size: clamp(11px, 2.5vw, 13px);
          color: var(--text-tertiary);
          margin-bottom: 12px;
        }

        .card-toggles {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }

        .card-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          background: var(--bg-subtle);
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: clamp(11px, 2.5vw, 12px);
          transition: var(--transition);
        }

        .card-toggle:hover {
          background: var(--accent-subtle);
        }

        .card-toggle input {
          width: 14px;
          height: 14px;
          accent-color: var(--accent);
        }

        .toggle-label {
          color: var(--text-primary);
        }

        .toggle-size {
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
        }

        .toggle-size.small {
          background: var(--border);
          color: var(--text-secondary);
        }

        .toggle-size.large {
          background: var(--accent);
          color: white;
        }

        .reset-btn {
          padding: 8px 16px;
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 12px;
          cursor: pointer;
          transition: var(--transition);
        }

        .reset-btn:hover {
          background: var(--danger);
          color: white;
          border-color: var(--danger);
        }

        /* Main Content */
        .main-content {
          flex: 1;
          max-width: 1800px;
          width: 100%;
          margin: 0 auto;
          padding: clamp(12px, 3vw, 24px);
        }

        /* Dashboard Grid */
        .dashboard-grid {
          display: grid;
          gap: clamp(12px, 2vw, 20px);
          align-content: start;
        }

        /* Loading State */
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          gap: 16px;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          color: var(--accent);
        }

        .loading-spinner svg {
          width: 100%;
          height: 100%;
          animation: spin 1s linear infinite;
        }

        .loading-text {
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* Error State */
        .error-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          gap: 12px;
          padding: 20px;
          text-align: center;
        }

        .error-icon {
          width: 48px;
          height: 48px;
          background: var(--danger);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
        }

        .error-text {
          font-size: 14px;
          color: var(--text-secondary);
          max-width: 280px;
        }

        .error-btn {
          padding: 10px 20px;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .error-btn:hover {
          opacity: 0.9;
        }

        /* No Marine Data */
        .no-marine {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          color: var(--text-tertiary);
          font-size: clamp(12px, 3vw, 14px);
          padding: 20px;
        }

        /* Footer */
        .app-footer {
          padding: clamp(10px, 2vw, 14px);
          text-align: center;
          font-size: clamp(9px, 2vw, 11px);
          color: var(--text-tertiary);
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 6px;
          background: var(--bg-elevated);
          backdrop-filter: var(--glass-blur);
          border-top: 1px solid var(--border);
        }

        .footer-separator {
          opacity: 0.5;
        }

        /* Card Glass Effect */
        .weather-card,
        .hourly-card,
        .daily-card,
        .info-card,
        .draggable-card {
          background: var(--bg-elevated) !important;
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          box-shadow: var(--shadow-md);
        }

        /* Mobile Adjustments */
        @media (max-width: 640px) {
          .brand-text {
            display: none;
          }

          .header-center {
            max-width: none;
          }

          .screen-info {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .header-actions {
            gap: 4px;
          }

          .action-btn {
            width: 36px;
            height: 36px;
          }

          .edit-panel {
            padding: 12px;
          }

          .card-toggles {
            gap: 6px;
          }

          .card-toggle {
            padding: 5px 8px;
            font-size: 11px;
          }
        }

        /* Safe area insets */
        @supports (padding: max(0px)) {
          .header-content {
            padding-left: max(clamp(12px, 3vw, 24px), env(safe-area-inset-left));
            padding-right: max(clamp(12px, 3vw, 24px), env(safe-area-inset-right));
          }

          .main-content {
            padding-left: max(clamp(12px, 3vw, 24px), env(safe-area-inset-left));
            padding-right: max(clamp(12px, 3vw, 24px), env(safe-area-inset-right));
            padding-bottom: max(clamp(12px, 3vw, 24px), env(safe-area-inset-bottom));
          }
        }

        /* Touch improvements */
        @media (hover: none) {
          .action-btn:hover {
            background: var(--bg-elevated);
            color: var(--text-secondary);
            border-color: var(--border);
          }

          .action-btn.active:hover {
            background: var(--accent);
            color: white;
          }

          .action-btn:active {
            background: var(--accent-subtle);
            color: var(--accent);
          }
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          :root {
            --border: rgba(0, 0, 0, 0.3);
            --border-strong: rgba(0, 0, 0, 0.5);
          }

          .dark {
            --border: rgba(255, 255, 255, 0.3);
            --border-strong: rgba(255, 255, 255, 0.5);
          }
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: var(--bg-subtle);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: var(--border-strong);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--text-tertiary);
        }
      `}</style>
    </div>
  );
};

// App wrapper with providers
const App: React.FC = () => (
  <LanguageProvider>
    <ScreenProvider>
      <AppContent />
    </ScreenProvider>
  </LanguageProvider>
);

export default App;
