import React from 'react';
import styles from '../styles/PlayerCard.module.css';
import { Player } from '../types';

export interface PlayerCardProps {
  player?: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <div className={styles.card}>
      {player?.playerName ? (
        <div>
          <div className={styles.jerseyNumber}>{player?.jerseyNumber}</div>
          <img src={player?.playerImg} alt={`${player?.playerName}`} className={styles.playerImage} />
          <h2 className={styles.playerName}>{player?.playerName}</h2>
          <p className={styles.position}>{player?.position}</p>
          <div className={styles.details}>
            <div>
              <span className={styles.detailLabel}>Height</span>
              <p>{player?.height}</p>
            </div>
            <div>
              <span className={styles.detailLabel}>Weight</span>
              <p>{player?.weight}</p>
            </div>
            <div>
              <span className={styles.detailLabel}>Nationality</span>
              <p>
                <img src={player?.flagImg} alt={player?.nationality} style={{ width: '20px', marginRight: '4px' }} /> 
                {player?.nationality}
              </p>
            </div>
          </div>
          <div className={styles.statSection}>
            <div className={styles.stat}>
              <div className={styles.statValue}>{player?.appearances}</div>
              <div className={styles.statLabel}>Appearances</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>{player?.minutesPlayed}</div>
              <div className={styles.statLabel}>Minutes Played</div>
            </div>
          </div>
          <div className={styles.statSection}>
            <div className={styles.stat}>
              <div className={styles.statValue}>{player?.cleanSheets}</div>
              <div className={styles.statLabel}>Clean sheets</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>{player?.saves}</div>
              <div className={styles.statLabel}>Saves</div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.noPlayer}>
          <p>No Player Selected</p>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
