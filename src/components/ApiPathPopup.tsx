// src/components/ApiPathPopup.tsx
import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button, Stack } from '@mantine/core';
import { setupMocks } from '../api/mock';
import { updateApiBaseUrl } from '../api/axios';

interface ApiPathPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiPath: string) => void;
}

const ApiPathPopup: React.FC<ApiPathPopupProps> = ({ isOpen, onClose, onSave }) => {
  const [apiPath, setApiPath] = useState('');

  useEffect(() => {
    // Load existing API path from localStorage
    const storedApiPath = localStorage.getItem('apiPath');
    if (storedApiPath) {
      setApiPath(storedApiPath);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('apiPath', apiPath); // Save to localStorage
    updateApiBaseUrl(); // Update Axios baseURL
    onSave(apiPath); // Pass the apiPath back to the parent component or context
    onClose();
  };

  const handleUseMockApi = () => {
    setupMocks(); // Set up mock API
    const mockApiPath = 'http://dummyAPI'; // Example mock API path, adjust as needed
    localStorage.setItem('apiPath', mockApiPath); // Save mock API path to localStorage
    updateApiBaseUrl(); // Update Axios baseURL
    onSave(mockApiPath); // Pass the mockApiPath back to the parent component or context
    onClose();
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Set API Path">
      <Stack>
        <TextInput
          label="API Path"
          placeholder="Enter the base URL of the API"
          value={apiPath}
          onChange={(e) => setApiPath(e.target.value)}
        />
        <Button onClick={handleSave}>Save</Button>
        <Button variant="outline" color="gray" onClick={handleUseMockApi}>
          Use Mock API
        </Button>
      </Stack>
    </Modal>
  );
};

export default ApiPathPopup;
