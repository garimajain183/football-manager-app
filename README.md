# Roster Management System

This project is a **Roster Management System** that allows users to manage roster files and player information efficiently. Users can upload roster files, view and edit player details, switch between table and formation views, and perform CRUD operations on both files and individual players.

## Features

- Upload and manage roster files
- View roster files and players in a searchable table format
- Toggle between table view and a soccer field formation view for players
- Edit and delete players within a roster file
- Edit roster file names
- Lightweight and efficient state management with Zustand

## Technologies Used

- **Frontend**: React, Mantine UI, Zustand, Tabler Icons
- **Backend API**: REST API built with Node.js (provided as a separate service)
- **State Management**: Zustand for managing the application state
- **CSS Modules**: Modular CSS for styling

---

## Installation and Setup

### Prerequisites

- **Docker** (v20.10 or higher)
- **Docker Compose** (v1.29 or higher)
- **Node.js** and **npm** (for development without Docker)

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/Beam-Dynamics/frontend_challenge_v2_be.git
    cd frontend_challenge_v2_be/
    ```

2. Start the backend API using Docker:
    ```bash
    npm run start:docker
    ```
   OR
    ```bash
    docker-compose up -d
    ```

3. Access the REST API at `http://localhost:5001`.

### Frontend Setup

1. Navigate to the frontend repository and install dependencies:
    ```bash
    npm install
    ```

2. Start the development server:
    ```bash
    npm start
    ```

3. Access the application at `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint              | Description                        |
|--------|------------------------|------------------------------------|
| GET    | `/api/file`           | List of imported roster files      |
| GET    | `/api/roster/:fileId` | List of players in a roster file   |
| POST   | `/api/roster`         | Upload a new roster file           |
| PATCH  | `/api/file`           | Update a roster file's name        |
| DELETE | `/api/file/:fileId`   | Delete a roster file by ID         |
| PATCH  | `/api/roster`         | Update a player's details          |
| DELETE | `/api/roster/:playerId` | Delete a player by ID            |

---

## Architecture

### 1. Frontend (React with Zustand)

The frontend is built with **React** and utilizes **Zustand** for state management. It is organized as follows:

- **Components**: All UI components are modular, such as `PlayerTable`, `SoccerField`, `PlayerCard`, and `NotEnoughStartersPopup`. Each component is styled using CSS modules for scoped and modular styling.
- **State Management**: Zustand is used to manage the state of roster files and players in `useRosterStore`.
  - **Roster Files**: Handled with CRUD actions, allowing file upload, name update, and deletion without re-fetching data unnecessarily.
  - **Players**: CRUD operations for players, allowing direct in-place updates and deletions within `rosterFiles`.
- **UI**: Built with Mantine for consistent styling and UI components like buttons, modals, and input fields.

### 2. Backend (REST API)

The backend provides the API endpoints necessary for roster and player management. It's deployed as a standalone Docker service and interacts with the frontend over HTTP.

- **Endpoints**: The backend exposes various REST endpoints for managing roster files and player data.
- **File Management**: The backend allows file uploads via `POST /api/roster`, and file management (such as updating names and deleting files) is handled with PATCH and DELETE requests.

### Application Flow

1. **Roster Files**: Users can upload, view, and manage roster files.
2. **Players**: Within each roster file, users can view player information, update player details, and delete players.
3. **View Toggle**: Users can switch between a table view (showing player details in a grid) and a formation view (showing player positions on a soccer field).
4. **Search and Filter**: Search functionality allows users to filter players based on the input.

---

## Folder Structure

```plaintext
.
├── src
│   ├── components       # All UI components (e.g., PlayerTable, SoccerField)
│   ├── pages            # All pages (e.g., Home, TeamOverviewPage)
│   ├── store            # Zustand store for managing state (useRosterStore)
│   ├── api              # API functions to interact with backend (rosterApi.js)
│   ├── styles           # CSS modules for component-level styling
│   └── types            # Type definitions for TypeScript
├── README.md            # Project documentation
```

---

## State Management with Zustand

### Zustand Store (`useRosterStore`)

The `useRosterStore` Zustand store contains the following state variables and functions:

#### State Variables:

- **rosterFiles**: List of all imported roster files.
- **players**: List of players within a selected roster file.
- **isLoading**: Boolean flag for loading states.

#### Functions:

- **loadRosterFiles**: Loads all roster files from the backend.
- **loadPlayersByRoster**: Loads players for a specific roster file by `fileId`.
- **addRosterFile**: Uploads a new roster file.
- **updateRosterFileName**: Updates a roster file's name without re-fetching all files.
- **deleteRosterFileById**: Deletes a file by `fileId` without re-fetching all files.
- **updateRoasterPlayerDetail**: Updates player details in-place.
- **deletePlayerById**: Deletes a player by `playerId` without re-fetching all players.

---

## Usage

- **Upload a Roster File**: Click the "Import Team" button to upload a roster file (CSV format).
- **Manage Players**: Select a roster file to view and manage its players. You can search, edit, or delete players.
- **View Modes**: Toggle between "Roster Details" and "Formation Overview" to see players in a table or on a soccer field.
- **Edit Roster Names**: Click on the roster name to edit and update the name.

---

## API Path Configuration

This application allows you to configure a custom API path or use mock APIs.

### Setting the API Path
Upon loading the app, you will be prompted to enter the base API URL:
- **Enter API Path**: Type in the API URL and click **Save** to store it in `localStorage`.
- **Use Mock API**: Click **Use Mock API** to set up and use mock responses instead.

The API path will be saved in `localStorage` and automatically used for all API calls.

### Resetting the API Path
To reset the API path:
1. Open your browser's **Developer Console**.
2. Go to the **Application** tab.
3. Under **Storage**, find **Local Storage** and select the current domain.
4. Locate and delete the `apiPath` key to reset the API configuration.

The next time you load the app, you will be prompted to enter the API path again.
