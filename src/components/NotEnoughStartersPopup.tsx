// NotEnoughStartersPopup.tsx
import React from 'react';
import styles from '../styles/NotEnoughStartersPopup.module.css';

interface PositionStatus {
  position: string;
  required: number;
  current: number;
}

interface NotEnoughStartersPopupProps {
  data: PositionStatus[];
}

const NotEnoughStartersPopup: React.FC<NotEnoughStartersPopupProps> = ({ data }) => {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupCard}>
        <span className={styles.warningIcon}>⚠️</span>
        <h2>Not enough starters</h2>
        <p>Your team doesn’t have enough starters for one or more of the positions in the 4-3-3 formation</p>
        
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Positions</span>
            <span>Required</span>
            <span>Current</span>
          </div>
          {data.map((positionStatus, index) => (
            <div key={index} className={styles.tableRow}>
              <span>{positionStatus.position}</span>
              <span>{positionStatus.required}</span>
              <span className={positionStatus.current < positionStatus.required ? styles.insufficient : ''}>
                {positionStatus.current}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotEnoughStartersPopup;
