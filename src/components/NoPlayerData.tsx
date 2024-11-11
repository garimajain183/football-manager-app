import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/NoPlayerData.module.css';

export interface NoPlayerDataProps {
  isOpen: boolean;
  onClose: () => void;
}

const NoPlayerData: React.FC<NoPlayerDataProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigate = () => {
    navigate('/import-list');
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button onClick={onClose} className={styles.closeButton}>×</button>
        <div className={styles.icon}>⚠️</div>
        <h2 className={styles.title}>No player data found</h2>
        <p className={styles.message}>Please import your roster first</p>
        <button onClick={handleNavigate} className={styles.button}>
          Go to Import List page
        </button>
      </div>
    </div>
  );
};

export default NoPlayerData;
