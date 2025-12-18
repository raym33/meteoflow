import React, { useState, useRef, useEffect } from 'react';
import type { Location } from '../types/weather';
import { SearchIcon, MapPinIcon, CrosshairIcon } from './Icons';
import { useLanguage } from '../i18n/LanguageContext';

interface LocationSearchProps {
  onSelect: (location: Location) => void;
  onSearch: (query: string) => void;
  searchResults: Location[];
  searching: boolean;
  onUseCurrentLocation: () => void;
  currentLocation: Location | null;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({
  onSelect,
  onSearch,
  searchResults,
  searching,
  onUseCurrentLocation,
  currentLocation,
}) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  const handleSelect = (location: Location) => {
    setQuery('');
    setIsOpen(false);
    onSelect(location);
  };

  const handleCurrentLocation = () => {
    setQuery('');
    setIsOpen(false);
    onUseCurrentLocation();
  };

  return (
    <div className="location-search" ref={containerRef}>
      <div className="search-input-container">
        <SearchIcon size={18} className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={t.searchPlaceholder}
          className="search-input"
        />
        {currentLocation && (
          <button
            className="current-location-btn"
            onClick={() => setIsOpen(!isOpen)}
            title={`${currentLocation.name}${currentLocation.country ? `, ${currentLocation.country}` : ''}`}
          >
            <MapPinIcon size={18} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="search-dropdown">
          <button className="dropdown-item use-location" onClick={handleCurrentLocation}>
            <CrosshairIcon size={18} />
            <span>{t.useCurrentLocation}</span>
          </button>

          {searching && (
            <div className="dropdown-item loading">
              <span>{t.loading}</span>
            </div>
          )}

          {!searching && searchResults.length === 0 && query.length >= 2 && (
            <div className="dropdown-item no-results">
              <span>{t.noResults}</span>
            </div>
          )}

          {searchResults.map((location, index) => (
            <button
              key={`${location.latitude}-${location.longitude}-${index}`}
              className="dropdown-item"
              onClick={() => handleSelect(location)}
            >
              <MapPinIcon size={16} />
              <div className="location-info">
                <span className="location-name">{location.name}</span>
                <span className="location-region">
                  {[location.region, location.country].filter(Boolean).join(', ')}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      <style>{`
        .location-search {
          position: relative;
          width: 100%;
          max-width: min(320px, calc(100vw - 32px));
        }

        .search-input-container {
          display: flex;
          align-items: center;
          background: var(--bg-elevated, var(--surface-elevated));
          border: 1px solid var(--border, var(--border-color));
          border-radius: var(--radius-lg, 12px);
          padding: 0 clamp(10px, 2.5vw, 12px);
          transition: all 0.2s ease;
        }

        .search-input-container:focus-within {
          border-color: var(--accent, var(--accent-color));
          box-shadow: 0 0 0 3px var(--accent-subtle, var(--accent-glow));
        }

        .search-icon {
          color: var(--text-tertiary);
          flex-shrink: 0;
        }

        .search-input {
          flex: 1;
          height: clamp(40px, 10vw, 44px);
          border: none;
          background: transparent;
          color: var(--text-primary);
          font-size: clamp(13px, 3.5vw, 14px);
          padding: 0 clamp(8px, 2vw, 12px);
          outline: none;
          min-width: 0;
        }

        .search-input::placeholder {
          color: var(--text-tertiary);
        }

        .current-location-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(28px, 7vw, 32px);
          height: clamp(28px, 7vw, 32px);
          border: none;
          background: var(--bg-subtle, var(--surface-hover));
          border-radius: var(--radius-sm, 8px);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
        }

        .current-location-btn:hover {
          background: var(--accent, var(--accent-color));
          color: white;
        }

        .search-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: var(--bg-elevated, var(--surface-elevated));
          border: 1px solid var(--border, var(--border-color));
          border-radius: var(--radius-lg, 12px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          z-index: 100;
          max-height: min(320px, 50vh);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: clamp(10px, 2.5vw, 12px);
          width: 100%;
          padding: clamp(10px, 2.5vw, 12px) clamp(12px, 3vw, 16px);
          border: none;
          background: transparent;
          color: var(--text-primary);
          font-size: clamp(13px, 3.5vw, 14px);
          text-align: left;
          cursor: pointer;
          transition: background 0.15s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .dropdown-item:hover {
          background: var(--bg-subtle, var(--surface-hover));
        }

        .dropdown-item.use-location {
          border-bottom: 1px solid var(--border, var(--border-color));
          color: var(--accent, var(--accent-color));
          font-weight: 500;
        }

        .dropdown-item.loading,
        .dropdown-item.no-results {
          color: var(--text-tertiary);
          cursor: default;
        }

        .dropdown-item.loading:hover,
        .dropdown-item.no-results:hover {
          background: transparent;
        }

        .location-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow: hidden;
          min-width: 0;
          flex: 1;
        }

        .location-name {
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .location-region {
          font-size: clamp(10px, 2.5vw, 12px);
          color: var(--text-tertiary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (hover: none) {
          .dropdown-item:hover {
            background: transparent;
          }

          .dropdown-item:active {
            background: var(--bg-subtle, var(--surface-hover));
          }

          .current-location-btn:hover {
            background: var(--bg-subtle, var(--surface-hover));
            color: var(--text-secondary);
          }

          .current-location-btn:active {
            background: var(--accent, var(--accent-color));
            color: white;
          }
        }
      `}</style>
    </div>
  );
};
