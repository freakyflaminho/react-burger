import React from 'react';
import styles from './scrollable-panel.module.css';

type Props = {
  onScroll?: React.UIEventHandler;
  extraClass?: string;
  children: React.ReactNode;
};

const ScrollablePanel = ({ onScroll, extraClass, children }: Props) => {
  return (
    <div className={`${styles.scrollablePanel} ${extraClass}`} onScroll={onScroll}>
      {children}
    </div>
  );
};

export default ScrollablePanel;
