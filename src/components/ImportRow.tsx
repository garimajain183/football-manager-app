import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import styles from '../styles/ImportRow.module.css';

interface ImportRowProps {
    flag: string;
    name: string;
    jerseyNumber: number;
    starter: string;
    position: string;
    height: string;
    weight: string;
    nationality: string;
    appearances: number;
    minutesPlayed: number;
  }
  
  const ImportRow: React.FC<ImportRowProps> = ({
    flag,
    name,
    jerseyNumber,
    starter,
    position,
    height,
    weight,
    nationality,
    appearances,
    minutesPlayed,
  }) => {
    return (
      <div className={styles.row}>
        <div className={styles.nameCell}>
          <img src={flag} alt={`${nationality} flag`} className={styles.flag} />
          <span>{name}</span>
        </div>
        <div className={styles.cell}>{jerseyNumber}</div>
        <div className={styles.cell}>{starter}</div>
        <div className={styles.cell}>{position}</div>
        <div className={styles.cell}>{height}</div>
        <div className={styles.cell}>{weight}</div>
        <div className={styles.cell}>{nationality}</div>
        <div className={styles.cell}>{appearances}</div>
        <div className={styles.cell}>{minutesPlayed}</div>
        <div className={styles.moreOptions}>
          <FiMoreHorizontal />
        </div>
      </div>
    );
  };
  
  export default ImportRow;