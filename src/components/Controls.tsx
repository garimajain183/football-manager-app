import React, { useState } from 'react';
import styles from '../styles/Controls.module.css';

interface ControlsProps {
  itemsPerPage: number;
  totalItems: number;
  onItemsPerPageChange: (value: number) => void;
  onSearch: (value: string) => void;
}

const Controls: React.FC<ControlsProps> = ({
  itemsPerPage,
  totalItems,
  onItemsPerPageChange,
  onSearch,
}) => {
  const [search, setSearch] = useState('');

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onItemsPerPageChange(Number(event.target.value));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <div className={styles.controlsContainer}>
      <label className={styles.label}>Show</label>
      <select value={itemsPerPage} onChange={handleDropdownChange} className={styles.dropdown}>
        <option value="50">50</option>
        <option value="25">25</option>
        <option value="10">10</option>
      </select>
      <span className={styles.itemCount}>
        1-{itemsPerPage > totalItems ? totalItems : itemsPerPage} of {totalItems} items
      </span>
      <input
        type="text"
        placeholder="Find Roster"
        value={search}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
    </div>
  );
};

export default Controls;
