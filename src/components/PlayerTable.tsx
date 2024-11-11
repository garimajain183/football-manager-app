import React, { useEffect, useState, useMemo } from 'react';
import {
  Button,
  TextInput,
  Modal,
  Checkbox,
  ActionIcon,
  Pagination,
  Menu,
  Stack,
} from '@mantine/core';
import {
  IconSearch,
  IconPlus,
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconPlus as IconAdd,
} from '@tabler/icons-react';
import { Player } from '../types';
import { MantineReactTable, useMantineReactTable, MRT_ColumnDef, MRT_Row } from 'mantine-react-table';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import EditPlayerForm from './EditPlayerForm';
import { useRosterStore } from '../store/useRosterStore';

export interface PlayerTableProps {
  searchPlayer: string;
  players: Player[];
}

// Main Component
const PlayerTable: React.FC<PlayerTableProps> = ({ searchPlayer, players }) => {
  const [search, setSearch] = useState('');
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'playerName',
    'position',
    'nationality',
    'jerseyNumber',
    'appearances',
    'goals',
  ]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditPlayerModelOpen, setIsEditPlayerModelOpen] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null);
  const [playerToEdit, setPlayerToEdit] = useState<Player | null>(null);

  const updateRoasterPlayerDetail = useRosterStore((state) => state.updateRoasterPlayerDetail);
  const deletePlayerById = useRosterStore((state) => state.deletePlayerById);

  useEffect(() => {
    setSearch(searchPlayer);
  }, [searchPlayer]);

  // Memoize filtered data to avoid recalculating on each render
  const filteredData = useMemo(
    () =>
        players
        .filter(
          (player: Player) =>
            player.playerName.toLowerCase().includes(search.toLowerCase()) ||
            player.position.toLowerCase().includes(search.toLowerCase())
        )
        .slice((page - 1) * pageSize, page * pageSize),
    [search, page, pageSize, players]
  );

  // Memoize columns with visibility filter
  const filteredColumns = useMemo<MRT_ColumnDef<Player>[]>(
    () =>
      [
        {
          accessorKey: 'playerName',
          header: 'Player Name',
          enableSorting: true,
        },
        {
          accessorKey: 'jerseyNumber',
          header: 'Jersey Number',
          enableSorting: true,
        },
        {
          accessorKey: 'starter',
          header: 'Starter',
          enableSorting: true,
        },
        {
          accessorKey: 'position',
          header: 'Position',
        },
        {
          accessorKey: 'height',
          header: 'Height',
        },
        {
          accessorKey: 'weight',
          header: 'Weight',
        },
        {
          accessorKey: 'nationality',
          header: 'Nationality',
        },
        {
          accessorKey: 'appearances',
          header: 'Appearances',
          enableSorting: true,
        },
        {
          accessorKey: 'minutesPlayed',
          header: 'Minutes Played',
          enableSorting: true,
        },
        {
          accessorKey: 'actions',
          header: 'Actions',
          enableSorting: false,
          Cell: ({ row }: { row: MRT_Row<Player> }) => (
            <Menu>
              <Menu.Target>
                <ActionIcon>
                  <IconDotsVertical />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<IconEdit />} onClick={() => handleEditProfile(row.original)}>
                  Edit Player
                </Menu.Item>
                <Menu.Item icon={<IconTrash />} color="red" onClick={() => handleDeleteProfile(row.original)}>
                  Delete Player
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ),
        },
      ].filter((col) => visibleColumns.includes(col.accessorKey as string) || col.accessorKey === 'actions'),
    [visibleColumns]
  );

  const toggleColumnVisibility = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]
    );
  };

  const handleEditProfile = (player: Player) => {
    console.log('Edit profile for:', player);
    setPlayerToEdit(player);
    setIsEditPlayerModelOpen(true);
  };

  const handleDeleteProfile = (player: Player) => {
    setPlayerToDelete(player);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (playerToDelete) {
      console.log('Deleting player:', playerToDelete);
      deletePlayerById(playerToDelete.id);
      setIsDeleteModalOpen(false);
      setPlayerToDelete(null);
    }
  };

  // Initialize the table without wrapping it in useMemo
  const table = useMantineReactTable({
    columns: filteredColumns,
    data: filteredData,
    enableSorting: true,
    renderTopToolbar: null,

    enableColumnFilters: false, // Disables the filter icon
    enableGlobalFilter: false, // Disables the search icon
    enableDensityToggle: false, // Disables the density toggle icon
    enableFullScreenToggle: false, // Disables the fullscreen icon

    mantineTableProps: {
        sx: {
          backgroundColor: '#2c2c2c',
          color: '#ffffff',
        },
      },
  });

  return (
    <div>
      {/* Column Selection Modal */}
      <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Columns" centered>
        <Stack>
          {filteredColumns.map((column) =>
            typeof column.header === 'string' && (
              <Checkbox
                key={column.accessorKey}
                label={column.header}
                checked={visibleColumns.includes(column.accessorKey as string)}
                onChange={() => toggleColumnVisibility(column.accessorKey as string)}
              />
            )
          )}
        </Stack>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={confirmDelete}
      />

      <EditPlayerForm isOpen={isEditPlayerModelOpen} onClose={function (): void {
            setIsEditPlayerModelOpen(false);
          } } onSubmit={function (data: Player): void {
            updateRoasterPlayerDetail(data);
            setIsEditPlayerModelOpen(false);
          } } initialData={playerToEdit!} />

      {/* Table */}
      <MantineReactTable table={table} />
    </div>
  );
};

export default PlayerTable;
