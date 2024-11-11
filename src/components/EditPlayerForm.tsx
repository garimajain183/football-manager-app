import React, { useEffect, useState } from 'react';
import styles from '../styles/EditPlayerForm.module.css';
import { Player } from '../types';

interface EditPlayerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Player) => void;
  initialData: Player;
}

const EditPlayerForm: React.FC<EditPlayerFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<Player>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleRadioChange = (starter: boolean) => {
    setFormData({ ...formData, starter });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Edit Player</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel}>Player Name</label>
            <input
              type="text"
              name="playerName"
              value={formData?.playerName}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel}>Jersey Number</label>
            <input
              type="number"
              name="jerseyNumber"
              value={formData?.jerseyNumber}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel}>Height</label>
            <input
              type="number"
              name="height"
              value={formData?.height}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel}>Weight</label>
            <input
              type="number"
              name="weight"
              value={formData?.weight}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel}>Nationality</label>
            <input
              type="text"
              name="nationality"
              value={formData?.nationality}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel}>Position</label>
            <select
              name="position"
              value={formData?.position}
              onChange={handleChange}
              className={styles.selectField}
            >
              <option value="Goalkeeper">Goalkeeper</option>
              <option value="Defender">Defender</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Forward">Forward</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel}>Starter</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="starter"
                  value="no"
                  checked={!formData?.starter}
                  onChange={() => handleRadioChange(false)}
                  className={styles.radioButton}
                />
                No
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="starter"
                  value="yes"
                  checked={formData?.starter}
                  onChange={() => handleRadioChange(true)}
                  className={styles.radioButton}
                />
                Yes
              </label>
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>Edit Player</button>
        </form>
      </div>
    </div>
  );
};

export default EditPlayerForm;
