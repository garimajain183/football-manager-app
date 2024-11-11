// ColumnSelectorModal.tsx
import React, { useState } from 'react';
import styles from '../styles/ColumnSelectorModal.module.css';

interface ColumnSelectorModalProps {
  columns: string[];
  selectedColumns: string[];
  onClose: () => void;
  onConfirm: (selectedColumns: string[]) => void;
}

const ColumnSelectorModal: React.FC<ColumnSelectorModalProps> = ({
  columns,
  selectedColumns,
  onClose,
  onConfirm,
}) => {
  const [selected, setSelected] = useState<string[]>(selectedColumns);

  const handleCheckboxChange = (column: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(column)
        ? prevSelected.filter((item) => item !== column)
        : [...prevSelected, column]
    );
  };

  const handleConfirm = () => {
    onConfirm(selected);
    onClose();
  };

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-content']}>
        <h3>Columns</h3>
        <input type="text" placeholder="Search..." className={styles['search-input']} />
        <div className={styles['column-list']}>
          {columns.map((column) => (
            <label key={column} className={styles['column-item']}>
              <input
                type="checkbox"
                checked={selected.includes(column)}
                onChange={() => handleCheckboxChange(column)}
              />
              {column}
            </label>
          ))}
        </div>
        <div className={styles['modal-actions']}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ColumnSelectorModal;
