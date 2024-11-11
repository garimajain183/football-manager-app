import React, { useEffect, useState, useMemo } from 'react';
import { Button, Modal, ActionIcon, Stack, TextInput } from '@mantine/core';
import { IconSearch, IconTrash } from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable, MRT_ColumnDef, MRT_Row } from 'mantine-react-table';
import { useRosterStore } from '../store/useRosterStore';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ImportListPage.module.css';
import FileImporter from '../components/FileImporter';
import ColumnSelectorModal from '../components/ColumnSelectorModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

export interface RosterFile {
  id: string; // Unique identifier for the roster file
  fileName: string; // Name of the roster file
  createdAt: string; // Timestamp when the file was created
}

const Home: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [rosterFileToDelete, setRosterFileToDelete] = useState<RosterFile | null>(null);

  const loadRosterFiles = useRosterStore((state) => state.loadRosterFiles);
  const deleteRosterFileById = useRosterStore((state) => state.deleteRosterFileById);
  const rosterFiles = useRosterStore((state) => state.rosterFiles);
  const navigate = useNavigate();

  useEffect(() => {
    if (rosterFiles.length == 0) {
      loadRosterFiles();
    }
  }, []);

  const handleDeleteRosterFile = (roasterFile: RosterFile) => {
    console.log(`Deleting roster file with id: ${roasterFile.id}`);
    setRosterFileToDelete(roasterFile);
    setIsDeleteModalOpen(true);
  };

  const handleRowClick = (fileId: string) => {
    navigate(`/rosters/${fileId}`);
  };

  const filteredData = useMemo(() => {
    return rosterFiles
      .filter((file: RosterFile) => file.fileName.toLowerCase().includes(searchTerm))
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [rosterFiles, searchTerm, currentPage, itemsPerPage]);

  const columns = useMemo<MRT_ColumnDef<RosterFile>[]>(
    () => [
      {
        accessorKey: 'fileName',
        header: 'Roster Name',
        Cell: ({ cell, row }) => (
          <div onClick={() => handleRowClick(row.original.id)} style={{ cursor: 'pointer' }}>
            {cell.getValue() as string} {/* Assert that the value is a string */}
          </div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Import Date',
        Cell: ({ cell }) => {
          const dateValue = cell.getValue() as string; // Assert that this is a string
          return new Date(dateValue).toLocaleDateString();
        },
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        enableSorting: false,
        Cell: ({ row }: { row: MRT_Row<RosterFile> }) => (
          <Button
            variant="outline"
            color="red"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteRosterFile(row.original);
            }}
          >
            Delete Import
          </Button>
        ),
      },
    ],
    [handleRowClick]
  );

  const table = useMantineReactTable({
    columns,
    data: filteredData,
    enableSorting: true,
    renderTopToolbar: null, // This removes the top toolbar
    enableColumnFilters: false,
    enableGlobalFilter: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    mantineTableProps: {
      sx: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff',
      },
    },
  });

  const handleImportTeam = () => {
    console.log("Import Team button clicked");
    setIsImportModalOpen(true);
  };

  const confirmDelete = () => {
    if (rosterFileToDelete) {
      console.log('Deleting roasterFile:', rosterFileToDelete);
      deleteRosterFileById(rosterFileToDelete.id);
      setIsDeleteModalOpen(false);
      setRosterFileToDelete(null);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.topRow}>
        <h1 className={styles.title}>Import List</h1>
        <div className={styles.searchAndButton}>
          <TextInput
            placeholder="Find Roster"
            className={styles.searchBox}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            icon={<IconSearch size={16} />} // Add search icon inside the input
          />
          <Button
            className={styles.importButton}
            onClick={handleImportTeam}
          >
            Import Team
          </Button>
        </div>
      </div>
      <MantineReactTable table={table} />

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <FileImporter onClose={() => setIsImportModalOpen(false)} isOpen={true} />
          </div>
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={confirmDelete}
      />

      {/* Column Selector Modal */}
      {isModalOpen && (
        <ColumnSelectorModal
          columns={columns.map((col) => col.header as string)}
          selectedColumns={columns.map((col) => col.accessorKey as string)}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => setIsModalOpen(false)} // Adjust this as needed
        />
      )}
    </div>
  );
};

export default Home;
