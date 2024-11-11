import { create } from 'zustand';
import {
  fetchRosterFiles,
  fetchPlayersByRosterFile,
  uploadRosterFile,
  updateFileName,
  deleteFileById,
  updatePlayerDetails,
  deletePlayerById,
} from '../api/rosterApi';
import { RosterFile, Player } from '../types';

export interface RosterState {
  rosterFiles: RosterFile[];
  players: Player[];
  isLoading: boolean;
  loadRosterFiles: () => Promise<void>;
  loadPlayersByRoster: (fileId: string | number) => Promise<void>;
  addRosterFile: (file: File) => Promise<void>;
  updateRosterFileName: (fileId: string, fileName: string) => Promise<void>;
  deleteRosterFileById: (fileId: string) => Promise<void>;
  updateRoasterPlayerDetail: (playerData: Partial<Player>) => Promise<void>;
  deletePlayerById: (playerId: string) => Promise<void>;
}

export const useRosterStore = create<RosterState>(set => ({
  rosterFiles: [],
  players: [],
  isLoading: false,

  // Load all roster files
  loadRosterFiles: async () => {
    set({ isLoading: true });
    try {
      const data = await fetchRosterFiles();
      set({ rosterFiles: data, isLoading: false });
    } catch (error) {
      console.error('Error fetching roster files', error);
      set({ isLoading: false });
    }
  },

  // Load players by roster file ID
  loadPlayersByRoster: async fileId => {
    set({ isLoading: true });
    try {
      const data = await fetchPlayersByRosterFile(fileId);
      set({ players: data, isLoading: false });
    } catch (error) {
      console.error('Error fetching players', error);
      set({ isLoading: false });
    }
  },

  // Upload a new roster file
  addRosterFile: async file => {
    set({ isLoading: true });
    try {
      await uploadRosterFile(file);
      const data = await fetchRosterFiles(); // Reload roster files after upload
      set({ rosterFiles: data, isLoading: false });
    } catch (error) {
      console.error('Error uploading roster file', error);
      set({ isLoading: false });
    }
  },

  // Update roster file name
  updateRosterFileName: async (fileId, fileName) => {
    set({ isLoading: true });
    try {
      await updateFileName(fileId, fileName);
  
      // Update the file name directly in the rosterFiles array
      set((state) => ({
        rosterFiles: state.rosterFiles.map(file =>
          file.id === fileId ? { ...file, fileName } : file
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error updating roster file name', error);
      set({ isLoading: false });
    }
  },

  // Delete roster file by ID
  deleteRosterFileById: async (fileId) => {
    set({ isLoading: true });
    try {
      await deleteFileById(fileId); // Server call to delete the file
  
      // Remove the file from the rosterFiles array without making an additional server call
      set((state) => ({
        rosterFiles: state.rosterFiles.filter(file => file.id !== fileId),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error deleting roster file', error);
      set({ isLoading: false });
    }
  },
  

  // Update player details
  updateRoasterPlayerDetail: async (playerData) => {
    set({ isLoading: true });
    try {
      await updatePlayerDetails(playerData.id + "", playerData); // Server call to update player details
  
      // Update the player details directly in the players array
      set((state) => ({
        players: state.players.map(player =>
          player.id === playerData.id ? { ...player, ...playerData } : player
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error updating player details', error);
      set({ isLoading: false });
    }
  },
  
  // Delete player by ID
  deletePlayerById: async (playerId) => {
    set({ isLoading: true });
    try {
      await deletePlayerById(playerId); // Server call to delete the player
  
      // Remove the player from the players array without making an additional server call
      set((state) => ({
        players: state.players.filter(player => player.id !== playerId),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error deleting player', error);
      set({ isLoading: false });
    }
  },
  
}));
