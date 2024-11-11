// SoccerField.tsx
import React, { useState, useMemo, useEffect } from 'react';
import styles from '../styles/SoccerField.module.css';
import { Player } from '../types';

interface SoccerFieldProps {
    players: Player[];
    onPlayerClick: (player: Player) => void; // Function to handle player click
}

interface PositionStyle {
  top: string;
  left: string;
}

// Predefined positions for each role
const positions = {
  Goalkeeper: [{ top: '75%', left: '5%' }],
  Defender: [
    { top: '65%', left: '10%' },
    { top: '65%', left: '30%' },
    { top: '65%', left: '50%' },
    { top: '65%', left: '70%' },
  ],
  Midfielder: [
    { top: '50%', left: '20%' },
    { top: '50%', left: '40%' },
    { top: '50%', left: '60%' },
    { top: '50%', left: '80%' },
  ],
  Forward: [
    { top: '35%', left: '30%' },
    { top: '35%', left: '50%' },
    { top: '35%', left: '70%' },
    { top: '35%', left: '80%' },
  ],
};

// Cache of assigned positions for each player
const assignedPositions = new Map<string, PositionStyle>();

function getUniquePosition(role: string, playerId: string): PositionStyle | null {
  // If the player already has an assigned position, return it
  if (assignedPositions.has(playerId)) {
    return assignedPositions.get(playerId) || null;
  }

  const availablePositions = positions[role as keyof typeof positions];
  if (!availablePositions) return null;

  // Find the first unassigned position for the role
  for (let pos of availablePositions) {
    const alreadyAssigned = Array.from(assignedPositions.values()).some(
      assignedPos => assignedPos.top === pos.top && assignedPos.left === pos.left
    );

    if (!alreadyAssigned) {
      assignedPositions.set(playerId, pos); // Assign and cache the position
      return pos;
    }
  }
  return null; // No available position if all are assigned
}

// Main function to get position for each player based on role
function getPositionSize(role: string, playerId: string): PositionStyle {
  const position = getUniquePosition(role, playerId);
  if (position) {
    return position;
  } else {
    throw new Error(`No available positions left for role: ${role}`);
  }
}

const SoccerField: React.FC<SoccerFieldProps> = ({ players, onPlayerClick }) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  // Memoize player positions to avoid recalculating positions on every render
  const playerPositions = useMemo(() => {
    return players.map((player) => ({
      ...player,
      positionStyle: getPositionSize(player.position, player.id),
    }));
  }, [players]);

  useEffect(() => {
    handlePlayerClick(players[0]);
  }, [players]);

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayerId(player.id); // Update selected player state
    onPlayerClick(player);
  };

  return (
    <div className={styles.field}>
      {playerPositions.map((player) => (
        <div
          key={player.id}
          className={`${styles.player} ${selectedPlayerId === player.id ? styles.selected : ''}`}
          style={player.positionStyle}
          onClick={() => handlePlayerClick(player)} // Trigger function on click
        >
          <div className={styles.jerseyNumber}>{player.jerseyNumber}</div>
          <div className={styles.playerName}>{player.playerName}</div>
        </div>
      ))}
    </div>
  );
};

export default SoccerField;
