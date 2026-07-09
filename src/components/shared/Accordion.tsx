'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Accordion.module.css';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter((i) => i !== index));
      } else {
        setOpenIndexes([...openIndexes, index]);
      }
    } else {
      if (openIndexes.includes(index)) {
        setOpenIndexes([]);
      } else {
        setOpenIndexes([index]);
      }
    }
  };

  return (
    <div className={styles.accordionContainer}>
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div key={index} className={`${styles.accordionItem} ${isOpen ? styles.open : ''} glass`}>
            <button
              className={styles.headerButton}
              onClick={() => handleToggle(index)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
              id={`accordion-header-${index}`}
            >
              <span className={styles.titleText}>{item.title}</span>
              <ChevronDown size={18} className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`} />
            </button>
            <div
              id={`accordion-content-${index}`}
              className={`${styles.contentWrapper} ${isOpen ? styles.contentOpen : ''}`}
              role="region"
              aria-labelledby={`accordion-header-${index}`}
            >
              <div className={styles.contentInner}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
