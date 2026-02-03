import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './supplier/pages/SignInPage';
import SignUpPage from './supplier/pages/SignUpPage';
import DashboardHome from './supplier/pages/DashboardHome';
import ProfilePage from './supplier/pages/ProfilePage';
import CatalogUploadPage from './supplier/pages/CatalogUploadPage';
import SupportPage from './supplier/pages/SupportPage';
import DashboardLayout from './supplier/components/DashboardLayout';

function App() {
  return (
    <Routes>
      <Route path="/supplier/signin" element={<SignInPage />} />
      <Route path="/supplier/signup" element={<SignUpPage />} />
      
      <Route path="/supplier" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="catalog" element={<CatalogUploadPage />} />
        <Route path="support" element={<SupportPage />} />
      </Route>

      <Route path="/" element={<SignInPage />} />
    </Routes>
  );
}

export default App;
