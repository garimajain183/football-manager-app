import React from 'react';
import { Table, Button, Menu } from '@mantine/core';
import { FiMoreVertical as IconDots, FiEdit as IconEdit, FiTrash as IconTrash } from 'react-icons/fi';
import { Player } from '../types';
import styles from '../styles/ImportTable.module.css';
import { IconPlus } from '@tabler/icons-react';

interface ImportTableProps {
  players: Player[];
  visibleColumns: string[];
  onOpenColumnSelector: () => void;
}

const ImportTable: React.FC<ImportTableProps> = ({ players }) => {
  return (
    <div className={styles.tableContainer}>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Jersey Number</th>
            <th>Starter</th>
            <th>Position</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Nationality</th>
            <th>Appearances</th>
            <th>Minutes Played</th>
            <th>
              <Button variant="subtle" size="xs" onClick={() => console.log('Add player')}>
                <IconPlus size={16} />
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.playerName}</td>
              <td>{player.jerseyNumber}</td>
              <td>{player.starter ? 'Yes' : 'No'}</td>
              <td>{player.position}</td>
              <td>{player.height} m</td>
              <td>{player.weight} kg</td>
              <td>{player.nationality}</td>
              <td>{player.appearances}</td>
              <td>{player.minutesPlayed}</td>
              <td>
                <Menu>
                  <Menu.Target>
                    <Button className={styles.buttonSubtle}>
                      <IconDots className={styles.buttonSubtleIcon} />
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item onClick={() => console.log('Edit player', player.id)}>
                      <IconEdit size={16} style={{ marginRight: 8 }} />
                      Edit Player
                    </Menu.Item>
                    <Menu.Item color="red" onClick={() => console.log('Delete player', player.id)}>
                      <IconTrash size={16} style={{ marginRight: 8 }} />
                      Delete Player
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ImportTable;
