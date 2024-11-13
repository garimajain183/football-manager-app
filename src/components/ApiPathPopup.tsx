// src/components/ApiPathPopup.tsx
import React, { useState } from 'react';
import { Modal, TextInput, Button } from '@mantine/core';

interface ApiPathPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiPath: string) => void;
}

const ApiPathPopup: React.FC<ApiPathPopupProps> = ({ isOpen, onClose, onSave }) => {
  const [apiPath, setApiPath] = useState('');

  const handleSave = () => {
    localStorage.setItem('apiPath', apiPath); // Save to localStorage
    onSave(apiPath);
    onClose();
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Set API Path">
      <TextInput
        label="API Path"
        placeholder="Enter the base API URL"
        value={apiPath}
        onChange={(e) => setApiPath(e.target.value)}
      />
      <Button onClick={handleSave} style={{ marginTop: 10 }}>
        Save
      </Button>
    </Modal>
  );
};

export default ApiPathPopup;
