import React from 'react';
import styles from '../styles/ConfirmDeleteModal.module.css'

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Are you sure?</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>
        <p className={styles.message}>This action cannot be undone.</p>
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
          <button onClick={onDelete} className={styles.deleteButton}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
