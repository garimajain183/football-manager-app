import React, { useState, useEffect } from 'react';
import { TextInput, Button, Group, ActionIcon } from '@mantine/core';
import { IconArrowLeft, IconBaselineDensitySmall, IconEdit, IconSearch, IconShape } from '@tabler/icons-react';
import { useParams, useNavigate } from 'react-router-dom';
import PlayerTable from '../components/PlayerTable';
import SoccerField from '../components/SoccerField';
import PlayerCard from '../components/PlayerCard';
import NotEnoughStartersPopup from '../components/NotEnoughStartersPopup';
import NoPlayerData from '../components/NoPlayerData';
import { Player, RosterFile } from '../types';
import { useRosterStore } from '../store/useRosterStore';
import styles from '../styles/TeamOverviewPage.module.css';

const requiredPositions = {
  Goalkeeper: 1,
  Defender: 4,
  Midfielder: 3,
  Forward: 3,
};

const TeamOverviewPage: React.FC = () => {
  const { fileId } = useParams<{ fileId: string }>(); // Get fileId from route parameters
  const [view, setView] = useState<'table' | 'formation'>('table');
  const [search, setSearch] = useState<string>('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>();
  const [teamName, setTeamName] = useState<string>('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [roleCounts, setRoleCounts] = useState({ Goalkeeper: 0, Defender: 0, Midfielder: 0, Forward: 0 });
  const [roleStatus, setRoleStatus] = useState<string | null>(null);

  const loadPlayersByRoster = useRosterStore((state) => state.loadPlayersByRoster);
  const rosterFiles = useRosterStore((state) => state.rosterFiles);
  const loadRosterFiles = useRosterStore((state) => state.loadRosterFiles);
  const updateRosterFileName = useRosterStore((state) => state.updateRosterFileName);
  const players = useRosterStore((state) => state.players);
  const navigate = useNavigate();

  useEffect(() => {
    if (fileId) {
      // Load players for the specific roster
      loadPlayersByRoster(fileId);
    }
  }, [fileId, teamName]);

  useEffect(() => {
    // In case roadter files are not present, this happens in case of page open directly from this link
    if (rosterFiles.length == 0) {
      loadRosterFiles();
    }

    // Find the roster file by fileId to get the roster name
    const rosterFile = rosterFiles.find((file: RosterFile) => file.id === fileId);
    if (rosterFile) {
      setTeamName(rosterFile.fileName);
    }
  }, [rosterFiles]);

  // Calculate role counts and determine if requirements are met
  useEffect(() => {
    const counts = { Goalkeeper: 0, Defender: 0, Midfielder: 0, Forward: 0 };

    players.forEach((player) => {
      const position = player.position as keyof typeof counts;
      if (counts[position] !== undefined) {
        counts[position]++;
      }
    });

    setRoleCounts(counts);

    const status = Object.keys(requiredPositions).some((role) => {
      const required = requiredPositions[role as keyof typeof requiredPositions];
      const current = counts[role as keyof typeof counts];
      return current >= required;
    }) ? 'All conditions met' : 'Not enough players';

    setRoleStatus(status);
  }, [players]);

  const handleToggleView = (newView: 'table' | 'formation') => {
    setView(newView);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
    if (fileId) {
      updateRosterFileName(fileId, e.target.value);
    }
  };

  const handleNameBlur = () => {
    setIsEditingName(false);
  };

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Top Row: Breadcrumb, Team Name, Search, View Toggle */}
      <div className={styles.topRow}>
        <div className={styles.breadcrumbContainer}>
          <span className={styles.breadcrumb} onClick={() => navigate('/')}>
            <IconArrowLeft size={16} style={{ marginRight: '5px' }} /> Import List
          </span>
          <span className={styles.breadcrumbSeparator}> &gt; </span>
          {isEditingName ? (
            <TextInput
              value={teamName}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              autoFocus
              className={styles.teamNameInput}
            />
          ) : (
            <h1 onClick={() => setIsEditingName(true)} className={styles.teamName}>
              {teamName}
              <ActionIcon onClick={() => setIsEditingName(true)}>
                <IconEdit size={16} />
              </ActionIcon>
            </h1>
          )}
        </div>

        <div className={styles.controlsContainer}>
          <TextInput
            placeholder="Find Player"
            onChange={handleInputTextChange}
            value={search}
            icon={<IconSearch size={16} />}
            className={styles.searchBox}
          />
          <Group spacing="xs">
            <Button variant={view === 'table' ? 'filled' : 'outline'} onClick={() => handleToggleView('table')}>
              <IconBaselineDensitySmall size={16} style={{ marginRight: '5px' }} /> Roster Details
            </Button>
            <Button variant={view === 'formation' ? 'filled' : 'outline'} onClick={() => handleToggleView('formation')}>
              <IconShape  size={16} style={{ marginRight: '5px' }} /> Formation Overview
            </Button>
          </Group>
        </div>
      </div>

      {/* Content Area */}
      <div className={styles.content}>
        {view === 'table' ? (
          <PlayerTable searchPlayer={search} players={players} />
        ) : (
          <div className={styles.formationContainer}>
            <div className={styles.fieldContainer}>
              {players.length === 0 ? (
                <NoPlayerData isOpen={true} onClose={() => {}} />
              ) : (
                <SoccerField players={players} onPlayerClick={(player) => setSelectedPlayer(player)} />
              )}
            </div>
            <div className={styles.playerContainer}>
              {selectedPlayer && <PlayerCard player={selectedPlayer} />}
            </div>
            {roleStatus === 'Not enough players' && (
              <NotEnoughStartersPopup
                data={[
                  { position: 'Goalkeeper', required: 1, current: roleCounts.Goalkeeper },
                  { position: 'Defender', required: 4, current: roleCounts.Defender },
                  { position: 'Midfielder', required: 3, current: roleCounts.Midfielder },
                  { position: 'Forward', required: 3, current: roleCounts.Forward },
                ]}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamOverviewPage;
