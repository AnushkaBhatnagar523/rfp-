'use client';

import React, { useState, useRef } from 'react';
import styles from './Tabs.module.css';

interface TabItem {
  label: string;
  id: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
}

export default function Tabs({ items, defaultActiveId }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultActiveId || items[0]?.id);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % items.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = items.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const nextItem = items[nextIndex];
    if (nextItem) {
      setActiveId(nextItem.id);
      tabRefs.current[nextItem.id]?.focus();
    }
  };

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabList} role="tablist" aria-label="Content Tabs">
        {items.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              ref={(el) => { tabRefs.current[item.id] = el; }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tab-panel-${item.id}`}
              id={`tab-btn-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`${styles.tabBtn} ${isActive ? styles.active : ''}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className={styles.tabPanels}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <div
              key={item.id}
              id={`tab-panel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`tab-btn-${item.id}`}
              hidden={!isActive}
              className={`${styles.tabPanel} ${isActive ? styles.fadeIn : ''}`}
            >
              {item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
