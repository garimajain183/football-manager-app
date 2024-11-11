// Represents an individual player in a roster file
export interface Player {
    id: string;
    goals: number | null;
    saves: number;
    fileId: string;
    height: number;
    weight: number;
    assists: number | null;
    flagImg: string;
    starter: boolean;
    position: string;
    createdAt: string;
    playerImg: string;
    updatedAt: string;
    playerName: string;
    appearances: number;
    cleanSheets: number;
    nationality: string;
    jerseyNumber: number;
    minutesPlayed: number;
  }

// Represents an imported roster file
export interface RosterFile {
  id: string; // Unique identifier for the roster file
  fileName: string; // Name of the roster file
  createdAt: string; // Timestamp when the file was created
}

// Optional: API Response Types

// API response type for fetching a list of roster files
export type RosterFileListResponse = RosterFile[];

// API response type for fetching players within a specific roster file
export interface RosterPlayersResponse {
  fileId: string; // ID of the roster file
  fileName: string; // Name of the roster file
  createdAt: string; // Timestamp when the file was created
  players: Player[]; // List of players in the file
}

export const emplyPlayers: Player[] = [];

export const samplePlayers: Player[] = [
    {
      id: "60bd1771-ff98-4681-a6e4-8baf9f317478",
      goals: null,
      saves: 76,
      fileId: "8d094fb6-66ae-4ce5-b122-4e20850aef77",
      height: 185,
      weight: 80,
      assists: null,
      flagImg: "https://cdn-icons-png.flaticon.com/512/197/197506.png",
      starter: true,
      position: "Goalkeeper",
      createdAt: "2024-10-23T19:09:55.388324",
      playerImg: "https://images.psg.media/media/33317/card_21-22_navas.png?center=0.5,0.5&mode=crop&width=400&height=600",
      updatedAt: "2024-10-23T19:09:55.388324",
      playerName: "Keylor Navas",
      appearances: 26,
      cleanSheets: 10,
      nationality: "Costa Rican",
      jerseyNumber: 1,
      minutesPlayed: 2308,
    },
    {
      id: "60bd1772-ff98-4681-a6e4-8baf9f317479",
      goals: null,
      saves: 2,
      fileId: "8d094fb7-66ae-4ce5-b122-4e20850aef78",
      height: 181,
      weight: 73,
      assists: 5,
      flagImg: "https://cdn-icons-png.flaticon.com/512/197/197484.png",
      starter: true,
      position: "Defender",
      createdAt: "2024-10-23T19:09:55.388324",
      playerImg: "https://images.psg.media/media/33318/card_21-22_hakimi.png?center=0.5,0.5&mode=crop&width=400&height=600",
      updatedAt: "2024-10-23T19:09:55.388324",
      playerName: "Achraf Hakimi",
      appearances: 41,
      cleanSheets: 15,
      nationality: "Moroccan",
      jerseyNumber: 2,
      minutesPlayed: 3293,
    },
    {
      id: "60bd1773-ff98-4681-a6e4-8baf9f317480",
      goals: 3,
      saves: 3,
      fileId: "8d094fb8-66ae-4ce5-b122-4e20850aef79",
      height: 183,
      weight: 77,
      assists: 2,
      flagImg: "https://cdn-icons-png.flaticon.com/512/197/197560.png",
      starter: true,
      position: "Defender",
      createdAt: "2024-10-23T19:09:55.388324",
      playerImg: "https://images.psg.media/media/33319/card_21-22_kimpembe.png?center=0.5,0.5&mode=crop&width=400&height=600",
      updatedAt: "2024-10-23T19:09:55.388324",
      playerName: "Presnel Kimpembe",
      appearances: 41,
      cleanSheets: 13,
      nationality: "French",
      jerseyNumber: 3,
      minutesPlayed: 3545,
    },
    {
      id: "60bd1774-ff98-4681-a6e4-8baf9f317481",
      goals: 5,
      saves: 1,
      fileId: "8d094fb9-66ae-4ce5-b122-4e20850aef80",
      height: 184,
      weight: 82,
      assists: 1,
      flagImg: "https://cdn-icons-png.flaticon.com/512/197/197572.png",
      starter: true,
      position: "Defender",
      createdAt: "2024-10-23T19:09:55.388324",
      playerImg: "https://images.psg.media/media/33320/card_21-22_ramos.png?center=0.5,0.5&mode=crop&width=400&height=600",
      updatedAt: "2024-10-23T19:09:55.388324",
      playerName: "Sergio Ramos",
      appearances: 13,
      cleanSheets: 8,
      nationality: "Spanish",
      jerseyNumber: 4,
      minutesPlayed: 8444,
    },
    {
      id: "60bd1775-ff98-4681-a6e4-8baf9f317482",
      goals: 2,
      saves: 5,
      fileId: "8d094fb10-66ae-4ce5-b122-4e20850aef81",
      height: 183,
      weight: 75,
      assists: 3,
      flagImg: "https://cdn-icons-png.flaticon.com/512/197/197386.png",
      starter: true,
      position: "Defender",
      createdAt: "2024-10-23T19:09:55.388324",
      playerImg: "https://images.psg.media/media/33321/card_21-22_marquinhos.png?center=0.5,0.5&mode=crop&width=400&height=600",
      updatedAt: "2024-10-23T19:09:55.388324",
      playerName: "Marquinhos",
      appearances: 40,
      cleanSheets: 14,
      nationality: "Brazilian",
      jerseyNumber: 5,
      minutesPlayed: 3582,
    },
    {
      id: "60bd1776-ff98-4681-a6e4-8baf9f317483",
      goals: 4,
      saves: 4,
      fileId: "8d094fb11-66ae-4ce5-b122-4e20850aef82",
      height: 165,
      weight: 60,
      assists: 7,
      flagImg: "https://cdn-icons-png.flaticon.com/512/197/197626.png",
      starter: true,
      position: "Midfielder",
      createdAt: "2024-10-23T19:09:55.388324",
      playerImg: "https://images.psg.media/media/33322/card_21-22_verratti.png?center=0.5,0.5&mode=crop&width=400&height=600",
      updatedAt: "2024-10-23T19:09:55.388324",
      playerName: "Marco Verratti",
      appearances: 32,
      cleanSheets: 5,
      nationality: "Italian",
      jerseyNumber: 6,
      minutesPlayed: 2621,
    },
    {
      id: "60bd1777-ff98-4681-a6e4-8baf9f317484",
      goals: 22,
      saves: 3,
      fileId: "8d094fb12-66ae-4ce5-b122-4e20850aef83",
      height: 178,
      weight: 73,
      assists: 12,
      flagImg: "https://cdn-icons-png.flaticon.com/512/197/197560.png",
      starter: true,
      position: "Forward",
      createdAt: "2024-10-23T19:09:55.388324",
      playerImg: "https://images.psg.media/media/33323/card_21-22_mbappe.png?center=0.5,0.5&mode=crop&width=400&height=600",
      updatedAt: "2024-10-23T19:09:55.388324",
      playerName: "Kylian Mbappé",
      appearances: 46,
      cleanSheets: 10,
      nationality: "French",
      jerseyNumber: 7,
      minutesPlayed: 3908,
    },
    {
      id: "60bd1778-ff98-4681-a6e4-8baf9f317485",
      goals: 2,
      saves: 4,
      fileId: "8d094fb13-66ae-4ce5-b122-4e20850aef84",
      height: 180,
      weight: 75,
      assists: 8,
      flagImg: "https://cdn-icons-png.flaticon.com/512/197/197604.png",
      starter: false,
      position: "Midfielder",
      createdAt: "2024-10-23T19:09:55.388324",
      playerImg: "https://images.psg.media/media/33324/card_21-22_paredes.png?center=0.5,0.5&mode=crop&width=400&height=600",
      updatedAt: "2024-10-23T19:09:55.388324",
      playerName: "Leandro Paredes",
      appearances: 22,
      cleanSheets: 3,
      nationality: "Argentinian",
      jerseyNumber: 8,
      minutesPlayed: 1245,
    },
    {
      id: "60bd1779-ff98-4681-a6e4-8baf9f317486",
      goals: 4,
      saves: 1,
      fileId: "8d094fb14-66ae-4ce5-b122-4e20850aef85",
      height: 181,
      weight: 75,
      assists: 1,
      flagImg: "https://cdn-icons-png.flaticon.com/512/197/197604.png",
      starter: false,
      position: "Forward",
      createdAt: "2024-10-23T19:09:55.388324",
      playerImg: "https://images.psg.media/media/33325/card_21-22_icardi.png?center=0.5,0.5&mode=crop&width=400&height=600",
      updatedAt: "2024-10-23T19:09:55.388324",
      playerName: "Mauro Icardi",
      appearances: 30,
      cleanSheets: 2,
      nationality: "Argentinian",
      jerseyNumber: 9,
      minutesPlayed: 1310,
    },
    {
      id: "60bd1780-ff98-4681-a6e4-8baf9f317487",
      goals: 15,
      saves: 3,
      fileId: "8d094fb15-66ae-4ce5-b122-4e20850aef86",
      height: 175,
      weight: 68,
      assists: 10,
      flagImg: "https://cdn-icons-png.flaticon.com/512/197/197386.png",
      starter: true,
      position: "Forward",
      createdAt: "2024-10-23T19:09:55.388324",
      playerImg: "https://images.psg.media/media/33326/card_21-22_neymar.png?center=0.5,0.5&mode=crop&width=400&height=600",
      updatedAt: "2024-10-23T19:09:55.388324",
      playerName: "Neymar Jr",
      appearances: 28,
      cleanSheets: 6,
      nationality: "Brazilian",
      jerseyNumber: 10,
      minutesPlayed: 2328,
    },
    {
      id: "60bd1781-ff98-4681-a6e4-8baf9f317488",
      goals: 23,
      saves: 6,
      fileId: "8d094fb16-66ae-4ce5-b122-4e20850aef87",
      height: 170,
      weight: 72,
      assists: 12,
      flagImg: "https://cdn-icons-png.flaticon.com/512/197/197560.png",
      starter: true,
      position: "Forward",
      createdAt: "2024-10-23T19:09:55.388324",
      playerImg: "https://images.psg.media/media/33327/card_21-22_messi.png?center=0.5,0.5&mode=crop&width=400&height=600",
      updatedAt: "2024-10-23T19:09:55.388324",
      playerName: "Lionel Messi",
      appearances: 35,
      cleanSheets: 9,
      nationality: "Argentinian",
      jerseyNumber: 30,
      minutesPlayed: 3150,
    },
  ];
  
  