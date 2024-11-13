// src/pages/Home.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Button, TextInput, ActionIcon } from '@mantine/core';
import { IconSearch, IconTrash } from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable, MRT_ColumnDef, MRT_Row } from 'mantine-react-table';
import { useRosterStore } from '../store/useRosterStore';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ImportListPage.module.css';
import FileImporter from '../components/FileImporter';
import ColumnSelectorModal from '../components/ColumnSelectorModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import ApiPathPopup from '../components/ApiPathPopup';
import { updateApiBaseUrl } from '../api/axios';

export interface RosterFile {
  id: string;
  fileName: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isApiPathPopupOpen, setIsApiPathPopupOpen] = useState(false);
  const [apiPath, setApiPath] = useState<string | null>(localStorage.getItem('apiPath'));
  const [rosterFileToDelete, setRosterFileToDelete] = useState<RosterFile | null>(null);

  const loadRosterFiles = useRosterStore((state) => state.loadRosterFiles);
  const deleteRosterFileById = useRosterStore((state) => state.deleteRosterFileById);
  const rosterFiles = useRosterStore((state) => state.rosterFiles);
  const navigate = useNavigate();

  useEffect(() => {
    // Open the API path popup if API path is not set in localStorage
    if (!apiPath) {
      setIsApiPathPopupOpen(true);
    } else if (rosterFiles.length === 0) {
      loadRosterFiles();
    }
  }, [apiPath]);

  const handleApiPathSave = (path: string) => {
    setApiPath(path); // Optionally, update component state if needed
  };

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
            {cell.getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Import Date',
        Cell: ({ cell }) => {
          const dateValue = cell.getValue() as string;
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
    renderTopToolbar: null,
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
    setIsImportModalOpen(true);
  };

  const confirmDelete = () => {
    if (rosterFileToDelete) {
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
            icon={<IconSearch size={16} />}
          />
          <Button className={styles.importButton} onClick={handleImportTeam}>
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
          onConfirm={() => setIsModalOpen(false)}
        />
      )}

      {/* API Path Popup */}
      <ApiPathPopup
        isOpen={isApiPathPopupOpen}
        onClose={() => setIsApiPathPopupOpen(false)}
        onSave={handleApiPathSave}
      />
    </div>
  );
};

export default Home;
