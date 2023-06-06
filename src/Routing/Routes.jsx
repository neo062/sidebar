import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminCategories from '../admin-panel/categories/AdminCategories';
import { Login } from '../admin-panel/login/AdminLogin';

const MainRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/category/*"
          element={
            isAuthenticated ? (
              <AdminCategories />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
