import React from 'react';
import styles from '../styles/NotEnoughStartersModal.module.css';

export interface Position {
  name: string;
  required: number;
  current: number;
}

export interface NotEnoughStartersModalProps {
  isOpen: boolean;
  onClose: () => void;
  positions: Position[];
}

const NotEnoughStartersModal: React.FC<NotEnoughStartersModalProps> = ({
  isOpen,
  onClose,
  positions,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>×</button>
        <div className={styles.icon}>⚠️</div>
        <h2 className={styles.title}>Not enough starters</h2>
        <p className={styles.message}>
          Your team doesn’t have enough starters for one or more of the positions in the 4-3-3 formation
        </p>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Positions</span>
            <span>Required</span>
            <span>Current</span>
          </div>
          {positions.map((position, index) => (
            <div key={index} className={styles.tableRow}>
              <span className={styles.position}>{position.name}</span>
              <span className={styles.required}>{position.required}</span>
              <span className={styles.current}>{position.current}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotEnoughStartersModal;
