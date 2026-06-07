import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/layout/AdminSidebar';
import AdminNavbar from '../components/layout/AdminNavbar';

const AdminLayout = () => (
  <div className="flex min-h-screen bg-gray-50">
    <AdminSidebar />
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminNavbar />
      <main className="flex-1 p-4 sm:p-6 pb-20 lg:pb-6">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AdminLayout;
