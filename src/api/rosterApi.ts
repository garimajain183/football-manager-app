import { Player } from '../types';
import axios from './axios';

// List of imported roster files
export const fetchRosterFiles = async () => {
  const response = await axios.get('/api/file');
  return response.data;
};

// List of players inside a roster file by file ID
export const fetchPlayersByRosterFile = async (fileId: string | number) => {
  const response = await axios.get(`/api/roster/${fileId}`);
  return response.data;
};

// Upload roster file
export const uploadRosterFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post('/api/roster', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Update file name
export const updateFileName = async (
  fileId: string | number,
  newName: string
) => {
  const response = await axios.patch('/api/file', { fileId, newName });
  return response.data;
};

// Delete file by ID
export const deleteFileById = async (fileId: string | number) => {
  const response = await axios.delete(`/api/file/${fileId}`);
  return response.data;
};

// Update player details
export const updatePlayerDetails = async (
  playerId: string | number,
  playerData: Partial<Player>
) => {
  const response = await axios.patch(`/api/roster`, {
    playerId,
    ...playerData,
  });
  return response.data;
};

// Remove player by ID
export const deletePlayerById = async (playerId: string | number) => {
  const response = await axios.delete(`/api/roster/${playerId}`);
  return response.data;
};
