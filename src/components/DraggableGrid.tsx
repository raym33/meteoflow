import React, { useState, useRef, useEffect, createContext, useContext } from 'react';

// ============================================================================
// SCREEN SIZE DETECTION
// ============================================================================

export type ScreenType = 'mobile' | 'tablet' | 'desktop' | 'large';

export interface ScreenInfo {
  type: ScreenType;
  width: number;
  height: number;
  isTouch: boolean;
  orientation: 'portrait' | 'landscape';
  pixelRatio: number;
}

const getScreenInfo = (): ScreenInfo => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  let type: ScreenType;
  if (width < 640) type = 'mobile';
  else if (width < 1024) type = 'tablet';
  else if (width < 1440) type = 'desktop';
  else type = 'large';

  return {
    type,
    width,
    height,
    isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    orientation: width > height ? 'landscape' : 'portrait',
    pixelRatio: window.devicePixelRatio || 1,
  };
};

// Screen context
const ScreenContext = createContext<ScreenInfo>(getScreenInfo());

export const ScreenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<ScreenInfo>(getScreenInfo);

  useEffect(() => {
    const handleResize = () => setScreen(getScreenInfo());
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <ScreenContext.Provider value={screen}>
      {children}
    </ScreenContext.Provider>
  );
};

export const useScreen = () => useContext(ScreenContext);

// ============================================================================
// CARD SIZE SYSTEM - 2 SIZES ONLY
// ============================================================================

export type CardSize = 'small' | 'large';

export interface CardConfig {
  id: string;
  title: string;
  size: CardSize;
  order: number;
  visible: boolean;
}

// Get columns based on screen type
const getColumnCount = (screenType: ScreenType): number => {
  switch (screenType) {
    case 'mobile': return 2;
    case 'tablet': return 4;
    case 'desktop': return 6;
    case 'large': return 8;
    default: return 4;
  }
};

// Card spans based on size
const getCardSpan = (size: CardSize, screenType: ScreenType): number => {
  if (screenType === 'mobile') {
    return size === 'large' ? 2 : 1;
  }
  if (screenType === 'tablet') {
    return size === 'large' ? 4 : 2;
  }
  return size === 'large' ? 4 : 2;
};

// ============================================================================
// DRAGGABLE CARD COMPONENT
// ============================================================================

interface DraggableCardProps {
  id: string;
  title: string;
  size: CardSize;
  children: React.ReactNode;
  onSizeChange?: (id: string, size: CardSize) => void;
  onDragStart?: (id: string) => void;
  onDragEnd?: (id: string) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: () => void;
  onDrop?: (e: React.DragEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  isDragging?: boolean;
  draggedOver?: boolean;
}

export const DraggableCard: React.FC<DraggableCardProps> = ({
  id,
  title,
  size,
  children,
  onSizeChange,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  onTouchStart,
  isDragging,
  draggedOver,
}) => {
  const screen = useScreen();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('cardId', id);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.(id);
  };

  const handleDragEnd = () => {
    onDragEnd?.(id);
  };

  const toggleSize = () => {
    if (onSizeChange) {
      onSizeChange(id, size === 'small' ? 'large' : 'small');
    }
  };

  const span = getCardSpan(size, screen.type);

  return (
    <div
      ref={cardRef}
      className={`draggable-card ${size} ${isDragging ? 'dragging' : ''} ${draggedOver ? 'drag-over' : ''}`}
      draggable={!screen.isTouch || !isResizing}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onTouchStart={onTouchStart}
      style={{
        gridColumn: `span ${span}`,
      }}
    >
      <div className="card-header">
        <div className="drag-handle">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="5" r="2" />
            <circle cx="12" cy="5" r="2" />
            <circle cx="19" cy="5" r="2" />
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
            <circle cx="5" cy="19" r="2" />
            <circle cx="12" cy="19" r="2" />
            <circle cx="19" cy="19" r="2" />
          </svg>
        </div>
        <span className="card-title">{title}</span>
        <button
          className="size-toggle"
          onClick={toggleSize}
          onMouseDown={() => setIsResizing(true)}
          onMouseUp={() => setIsResizing(false)}
          title={size === 'small' ? 'Ampliar' : 'Reducir'}
        >
          {size === 'small' ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="4 14 10 14 10 20" />
              <polyline points="20 10 14 10 14 4" />
              <line x1="14" y1="10" x2="21" y2="3" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          )}
        </button>
      </div>
      <div className="card-content">
        {children}
      </div>

      <style>{`
        .draggable-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          cursor: grab;
          overflow: hidden;
          min-height: 0;
        }

        .draggable-card:active {
          cursor: grabbing;
        }

        .draggable-card.dragging {
          opacity: 0.5;
          transform: scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .draggable-card.drag-over {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-subtle);
        }

        .draggable-card.small {
          min-height: clamp(180px, 35vw, 240px);
        }

        .draggable-card.large {
          min-height: clamp(280px, 50vw, 400px);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: clamp(8px, 2vw, 12px);
          padding: clamp(10px, 2.5vw, 14px) clamp(12px, 3vw, 16px);
          border-bottom: 1px solid var(--border);
          background: var(--bg-subtle);
          flex-shrink: 0;
        }

        .drag-handle {
          color: var(--text-tertiary);
          cursor: grab;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s, background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .drag-handle:hover {
          color: var(--text-secondary);
          background: var(--bg-elevated);
        }

        .card-title {
          flex: 1;
          font-size: clamp(12px, 3vw, 14px);
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .size-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(24px, 6vw, 28px);
          height: clamp(24px, 6vw, 28px);
          border: none;
          background: var(--bg-elevated);
          border-radius: var(--radius-sm);
          color: var(--text-tertiary);
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .size-toggle:hover {
          background: var(--accent-subtle);
          color: var(--accent);
        }

        .card-content {
          flex: 1;
          padding: clamp(12px, 3vw, 16px);
          overflow: auto;
          min-height: 0;
        }

        @media (hover: none) {
          .drag-handle {
            display: none;
          }

          .draggable-card {
            cursor: default;
          }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// DRAGGABLE GRID CONTAINER
// ============================================================================

interface DraggableGridProps {
  cards: CardConfig[];
  onReorder: (cards: CardConfig[]) => void;
  onSizeChange: (id: string, size: CardSize) => void;
  renderCard: (config: CardConfig) => React.ReactNode;
}

export const DraggableGrid: React.FC<DraggableGridProps> = ({
  cards,
  onReorder,
  onSizeChange,
  renderCard,
}) => {
  const screen = useScreen();
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const columns = getColumnCount(screen.type);

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (targetId !== draggedId) {
      setDragOverId(targetId);
    }
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('cardId');

    if (sourceId && sourceId !== targetId) {
      const newCards = [...cards];
      const sourceIndex = newCards.findIndex(c => c.id === sourceId);
      const targetIndex = newCards.findIndex(c => c.id === targetId);

      if (sourceIndex !== -1 && targetIndex !== -1) {
        const [removed] = newCards.splice(sourceIndex, 1);
        newCards.splice(targetIndex, 0, removed);

        // Update order
        newCards.forEach((card, index) => {
          card.order = index;
        });

        onReorder(newCards);
      }
    }

    setDraggedId(null);
    setDragOverId(null);
  };

  // Touch drag support
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent, cardId: string) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };

    // Long press to start drag
    const timer = setTimeout(() => {
      setDraggedId(cardId);
    }, 500);

    const cleanup = () => {
      clearTimeout(timer);
      document.removeEventListener('touchend', cleanup);
      document.removeEventListener('touchmove', handleTouchMove);
    };

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const moveTouch = moveEvent.touches[0];
      const dx = moveTouch.clientX - (touchStartPos.current?.x || 0);
      const dy = moveTouch.clientY - (touchStartPos.current?.y || 0);

      if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
        clearTimeout(timer);
      }
    };

    document.addEventListener('touchend', cleanup);
    document.addEventListener('touchmove', handleTouchMove);
  };

  const visibleCards = cards
    .filter(c => c.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div
      ref={gridRef}
      className="draggable-grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {visibleCards.map((config) => (
        <DraggableCard
          key={config.id}
          id={config.id}
          title={config.title}
          size={config.size}
          onSizeChange={onSizeChange}
          onDragStart={setDraggedId}
          onDragEnd={() => setDraggedId(null)}
          onDragOver={(e) => handleDragOver(e, config.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, config.id)}
          onTouchStart={(e) => handleTouchStart(e, config.id)}
          isDragging={draggedId === config.id}
          draggedOver={dragOverId === config.id}
        >
          {renderCard(config)}
        </DraggableCard>
      ))}

      <style>{`
        .draggable-grid {
          display: grid;
          gap: clamp(12px, 3vw, 20px);
          width: 100%;
          align-content: start;
        }

        @media (max-width: 640px) {
          .draggable-grid {
            gap: clamp(8px, 2vw, 12px);
          }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// SCREEN INFO DISPLAY COMPONENT
// ============================================================================

export const ScreenInfoDisplay: React.FC = () => {
  const screen = useScreen();

  return (
    <div className="screen-info">
      <div className="screen-badge" data-type={screen.type}>
        {screen.type.toUpperCase()}
      </div>
      <span className="screen-dims">
        {screen.width}×{screen.height}
      </span>
      {screen.isTouch && <span className="touch-badge">TOUCH</span>}
      <span className="orientation-badge">{screen.orientation}</span>

      <style>{`
        .screen-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 600;
          font-family: monospace;
        }

        .screen-badge {
          padding: 4px 8px;
          border-radius: 4px;
          color: white;
        }

        .screen-badge[data-type="mobile"] {
          background: #ef4444;
        }

        .screen-badge[data-type="tablet"] {
          background: #f59e0b;
        }

        .screen-badge[data-type="desktop"] {
          background: #22c55e;
        }

        .screen-badge[data-type="large"] {
          background: #3b82f6;
        }

        .screen-dims {
          color: var(--text-secondary);
        }

        .touch-badge {
          padding: 2px 6px;
          background: var(--accent);
          color: white;
          border-radius: 4px;
        }

        .orientation-badge {
          padding: 2px 6px;
          background: var(--bg-subtle);
          color: var(--text-tertiary);
          border-radius: 4px;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// LOCAL STORAGE PERSISTENCE
// ============================================================================

const STORAGE_KEY = 'meteoflow_card_layout';

export const saveCardLayout = (cards: CardConfig[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch (e) {
    console.error('Error saving card layout:', e);
  }
};

export const loadCardLayout = (defaultCards: CardConfig[]): CardConfig[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as CardConfig[];
      // Merge with defaults to handle new cards
      return defaultCards.map(defaultCard => {
        const savedCard = parsed.find(c => c.id === defaultCard.id);
        return savedCard ? { ...defaultCard, ...savedCard } : defaultCard;
      });
    }
  } catch (e) {
    console.error('Error loading card layout:', e);
  }
  return defaultCards;
};
