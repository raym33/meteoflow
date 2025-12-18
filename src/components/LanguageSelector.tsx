import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/translations';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, languageNames, languageFlags, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <span className="language-flag">{languageFlags[language]}</span>
        <span className="language-code">{language.toUpperCase()}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              className={`language-option ${lang === language ? 'active' : ''}`}
              onClick={() => handleSelect(lang)}
            >
              <span className="option-flag">{languageFlags[lang]}</span>
              <span className="option-name">{languageNames[lang]}</span>
              {lang === language && (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      <style>{`
        .language-selector {
          position: relative;
        }

        .language-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition);
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 500;
        }

        .language-button:hover {
          background: var(--accent-subtle);
          border-color: var(--accent);
        }

        .language-flag {
          font-size: 16px;
          line-height: 1;
        }

        .language-code {
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .language-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          right: 0;
          min-width: 160px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          z-index: 1000;
          animation: dropdownFadeIn 0.15s ease;
        }

        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .language-option {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 14px;
          background: none;
          border: none;
          cursor: pointer;
          transition: var(--transition);
          color: var(--text-primary);
          font-size: 13px;
          text-align: left;
        }

        .language-option:hover {
          background: var(--bg-subtle);
        }

        .language-option.active {
          background: var(--accent-subtle);
          color: var(--accent);
        }

        .option-flag {
          font-size: 18px;
          line-height: 1;
        }

        .option-name {
          flex: 1;
          font-weight: 500;
        }

        .language-option svg {
          color: var(--accent);
        }

        @media (max-width: 480px) {
          .language-code {
            display: none;
          }

          .language-button {
            padding: 8px;
          }

          .language-dropdown {
            right: -8px;
          }
        }
      `}</style>
    </div>
  );
};
