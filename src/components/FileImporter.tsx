import React, { useState } from 'react';
import styles from '../styles/FileImporter.module.css';
import { useRosterStore } from '../store/useRosterStore';

export interface FileSummary {
  totalPlayers: number;
  goalkeepers: number;
  defenders: number;
  midfielders: number;
  forwards: number;
}

const FileImporter: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('No file selected');
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<FileSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const addRosterFile = useRosterStore((state) => state.addRosterFile); // Get addRosterFile function

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setSummary(null);
    setError(null);

    if (selectedFile) {
      if (!selectedFile.name.endsWith('.csv')) {
        setError("File must be in .csv format");
        setFile(null);
        setFileName("No file selected");
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
      processFile(selectedFile);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        parseCSVData(text);
      }
    };
    reader.onerror = () => setError("Error reading file");
    reader.readAsText(file);
  };

  const parseCSVData = (data: string) => {
    const rows = data.split('\n').filter(Boolean);
    let goalkeepers = 0;
    let defenders = 0;
    let midfielders = 0;
    let forwards = 0;

    const parseRow = (row: string) => {
        // This regular expression will match values within quotes and values not containing quotes
        const regex = /("([^"]*)")|([^,]+)/g;
        const result = [];
        let match;
        while ((match = regex.exec(row)) !== null) {
            result.push(match[2] || match[3]);
        }
        return result;
    };

    const headers = parseRow(rows[0]);

    rows.forEach((row, index) => {
        if (index === 0) return; // Skip header row
        const columns = parseRow(row);
        const positionIdx = headers.findIndex(header => header.trim().toLowerCase() === "position");
        
        if (positionIdx >= 0 && columns[positionIdx]) {
            const position = columns[positionIdx].trim().toLowerCase();
            switch (position) {
                case "goalkeeper":
                    goalkeepers++;
                    break;
                case "defender":
                    defenders++;
                    break;
                case "midfielder":
                    midfielders++;
                    break;
                case "forward":
                    forwards++;
                    break;
                default:
                    break;
            }
        }
    });

    setSummary({
        totalPlayers: goalkeepers + defenders + midfielders + forwards,
        goalkeepers,
        defenders,
        midfielders,
        forwards,
    });
};

  const handleImport = async () => {
    if (!file) return;
    setLoading(true); // Start loading

    try {
      await addRosterFile(file); // Call addRosterFile to upload file
      setLoading(false); // Stop loading when complete
      onClose(); // Close the modal
    } catch (err) {
      setError("Error uploading file. Please try again.");
      setLoading(false); // Stop loading on error
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Importer</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>
        <div className={styles.formGroup}>
          <label>Roster File</label>
          <div className={styles.fileInputWrapper}>
            <input
              type="text"
              className={styles.fileInput}
              value={fileName}
              readOnly
            />
            <label htmlFor="fileInput" className={styles.selectFileButton}>Select File</label>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept=".csv"
            />
          </div>
          <p className={styles.hint}>File must be in .csv format</p>
        </div>

        {error && <p className={styles.errorMessage}>Error: {error}</p>}

        {summary && (
          <div className={styles.summary}>
            <div className={styles.summaryItem}>
              <div className={styles.summaryItemLabel}>Total Players</div>
              <div className={styles.summaryItemValue}>{summary.totalPlayers}</div>
            </div>
            <div className={styles.summaryItem}>
              <div className={styles.summaryItemLabel}>Goalkeepers</div>
              <div className={styles.summaryItemValue}>{summary.goalkeepers}</div>
            </div>
            <div className={styles.summaryItem}>
              <div className={styles.summaryItemLabel}>Defenders</div>
              <div className={styles.summaryItemValue}>{summary.defenders}</div>
            </div>
            <div className={styles.summaryItem}>
              <div className={styles.summaryItemLabel}>Midfielders</div>
              <div className={styles.summaryItemValue}>{summary.midfielders}</div>
            </div>
            <div className={styles.summaryItem}>
              <div className={styles.summaryItemLabel}>Forwards</div>
              <div className={styles.summaryItemValue}>{summary.forwards}</div>
            </div>
          </div>
        )}

        <button
          onClick={handleImport}
          className={loading ? styles.importButtonLoading : styles.importButton}
          disabled={!summary || loading} // Disable button if no summary or loading
        >
          {loading ? 'Importing...' : 'Import'}
        </button>
      </div>
    </div>
  );
};

export default FileImporter;
