import React from 'react';
import { Outlet } from 'react-router-dom';
import { SupplierProvider } from '../context/SupplierContext';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

const SupplierLayout = () => (
  <SupplierProvider>
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-white rounded-3xl">
        <div className="flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  </SupplierProvider>
);

export default SupplierLayout;
