import React, { useState } from 'react';
import ImportTable from '../components/ImportTable';
import Controls from '../components/Controls';
import styles from '../styles/ImportListPage.module.css';
import Pagination from './Pagination';
import ColumnSelectorModal from './ColumnSelectorModal';
import { Player, samplePlayers } from '../types';
import FileImporter from './FileImporter';

const ImportListPage: React.FC = () => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState([
      'Player Name', 'Jersey Number', 'Starter', 'Position', 'Height', 'Weight', 'Nationality', 'Appearances', 'Minutes Played'
    ]);
  
    const allColumns = [
      'Player Name', 'Jersey Number', 'Starter', 'Position', 'Height', 'Weight', 'Nationality', 'Appearances', 'Minutes Played'
    ];

    const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  
    const handleItemsPerPageChange = (value: number) => {
      setItemsPerPage(value);
      setCurrentPage(1);
    };
  
    const handleSearch = (value: string) => {
      setSearchTerm(value.toLowerCase());
      setCurrentPage(1);
    };
  
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsImportModalOpen(false);
      };
  
    const handleConfirmColumns = (selectedColumns: string[]) => {
      setVisibleColumns(selectedColumns);
    };
  
    const filteredPlayers = samplePlayers.filter((player: Player) =>
      player.playerName.toLowerCase().includes(searchTerm)
    );
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredPlayers.slice(startIndex, endIndex);

    const handleImportTeam = () => {
        console.log("Import Team button clicked");
        setIsImportModalOpen(true);
        // Add logic here to open the import modal or navigate to the import form
      };
  
    return (
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>Import List</h1>
        <div className={styles.searchAndButton}>
          {/* <input
            type="text"
            placeholder="Find Roster"
            className={styles.searchBox}
          /> */}
          <button
            className={styles.importButton}
            onClick={handleImportTeam}
          >
            Import Team
          </button>
        </div>
        <div className={styles.controlsPaginationContainer}>
          <Controls
            itemsPerPage={itemsPerPage}
            totalItems={filteredPlayers.length}
            onItemsPerPageChange={handleItemsPerPageChange}
            onSearch={handleSearch}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredPlayers.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
        <ImportTable players={currentData} visibleColumns={visibleColumns} onOpenColumnSelector={handleOpenModal} />

        {/* Import Modal */}
      {isImportModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <FileImporter onClose={handleCloseModal} isOpen={true} />
          </div>
        </div>
      )}
      
        {/* {isModalOpen && (
          <ColumnSelectorModal
            columns={allColumns}
            selectedColumns={visibleColumns}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmColumns}
          />
        )} */}
      </div>
    );
  };
  
  export default ImportListPage;