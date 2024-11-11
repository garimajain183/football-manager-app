import React from 'react';
import styles from '../styles/Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const goToFirstPage = () => onPageChange(1);
  const goToLastPage = () => onPageChange(totalPages);
  const goToNextPage = () => onPageChange(Math.min(currentPage + 1, totalPages));
  const goToPreviousPage = () => onPageChange(Math.max(currentPage - 1, 1));

  return (
    <div className={styles.paginationContainer}>
      <button onClick={goToFirstPage} className={styles.pageButton} disabled={currentPage === 1}>
        &laquo;
      </button>
      <button onClick={goToPreviousPage} className={styles.pageButton} disabled={currentPage === 1}>
        &lsaquo;
      </button>
      <span className={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
      <button onClick={goToNextPage} className={styles.pageButton} disabled={currentPage === totalPages}>
        &rsaquo;
      </button>
      <button onClick={goToLastPage} className={styles.pageButton} disabled={currentPage === totalPages}>
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
