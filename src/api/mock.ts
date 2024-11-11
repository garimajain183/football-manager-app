import { samplePlayers } from '../types';
import axios from './axios';
import AxiosMockAdapter from 'axios-mock-adapter';

// Mock data for files and players
const mockFiles = [
  {
    id: '8d094fb6-66ae-4ce5-b122-4e20850aef77',
    fileName: 'psg-roster - players',
    createdAt: '2024-10-23T19:09:55.388Z',
  },
  {
    id: '9a123db7-75af-4a32-a2bc-7a9283b7f055',
    fileName: 'chelsea-roster - players',
    createdAt: '2024-10-24T10:15:30.000Z',
  },
];

const mockPlayers = [
  {
    fileId: '8d094fb6-66ae-4ce5-b122-4e20850aef77',
    fileName: 'psg-roster - players',
    createdAt: '2024-10-23T19:09:55.388Z',
    players: [
      {
        id: '60bd1771-ff98-4681-a6e4-8baf9f317478',
        goals: null,
        saves: 76,
        fileId: '8d094fb6-66ae-4ce5-b122-4e20850aef77',
        height: 185,
        weight: 80,
        assists: null,
        flagImg: 'https://cdn-icons-png.flaticon.com/512/197/197506.png',
        starter: true,
        position: 'Goalkeeper',
        createdAt: '2024-10-23T19:09:55.388324',
        playerImg:
          'https://images.psg.media/media/33317/card_21-22_navas.png?center=0.5,0.5&mode=crop&width=400&height=600',
        updatedAt: '2024-10-23T19:09:55.388324',
        playerName: 'Keylor Navas',
        appearances: 26,
        cleanSheets: 10,
        nationality: 'Costa Rican',
        jerseyNumber: 1,
        minutesPlayed: 2308,
      },
      // Additional players can be added here
    ],
  },
  // Additional roster files with players can be added here
];

// Initialize the mock adapter
const mock = new AxiosMockAdapter(axios);

export function setupMocks() {
  // GET /api/file - List of imported roster files
  mock.onGet('/api/file').reply(200, mockFiles);

  // GET /api/roster/:fileId - List of players inside a specific roster file
  mock.onGet(/\/api\/roster\/\w+/).reply(config => {
    const fileId = config.url?.split('/').pop();
    const roster = samplePlayers;
    return [200, roster || { message: 'Roster file not found' }];
  });

  // POST /api/file - Upload roster file
  mock.onPost('/api/roster').reply(200, 'File added successfully!');

  // PATCH /api/file - Update file name
  mock.onPatch('/api/file').reply(config => {
    const { fileName, fileId } = JSON.parse(config.data);
    const file = mockFiles.find(file => file.id === fileId);
    if (file) {
      file.fileName = fileName;
      return [200, 'File name successfully updated!'];
    }
    return [404, 'File not found'];
  });

  // DELETE /api/file/:fileId - Delete file by ID
  mock.onDelete(/\/api\/file\/\w+/).reply(config => {
    const fileId = config.url?.split('/').pop();
    const fileIndex = mockFiles.findIndex(file => file.id === fileId);
    if (fileIndex > -1) {
      mockFiles.splice(fileIndex, 1);
      return [200, 'File successfully removed!'];
    }
    return [404, 'File not found'];
  });

  // PATCH /api/roster - Update player details
  mock.onPatch('/api/roster').reply(config => {
    const { id, ...playerData } = JSON.parse(config.data);
    for (const roster of mockPlayers) {
      const player = roster.players.find(p => p.id === id);
      if (player) {
        Object.assign(player, playerData);
        return [200, 'Player successfully updated!'];
      }
    }
    return [404, 'Player not found'];
  });

  // DELETE /api/roster/:playerId - Remove player by ID
  mock.onDelete(/\/api\/roster\/\w+/).reply(config => {
    const playerId = config.url?.split('/').pop();
    for (const roster of mockPlayers) {
      const playerIndex = roster.players.findIndex(p => p.id === playerId);
      if (playerIndex > -1) {
        roster.players.splice(playerIndex, 1);
        return [200, 'Player successfully removed!'];
      }
    }
    return [404, 'Player not found'];
  });
}
