import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import TeamOverviewPage from '../pages/TeamOverviewPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Home page */}
      <Route path="/" element={<Home />} />

      {/* Roster management pages */}
      <Route path="/rosters/:fileId" element={<TeamOverviewPage />} />
    </Routes>
  );
};

export default AppRoutes;
