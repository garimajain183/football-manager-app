// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { MantineProvider } from '@mantine/core';

const App: React.FC = () => {
  return (
    <MantineProvider>
    <Router>
      <AppRoutes />
    </Router>
    </MantineProvider>
  );
};

export default App;