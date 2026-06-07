import React from 'react';
import { Outlet } from 'react-router-dom';
import BuyerNavbar from '../components/layout/Navbar';
import BuyerFooter from '../components/layout/Footer';
import AuthModal from '../components/auth/AuthModal';
import { BuyerProvider } from '../context/BuyerContext';

export default function BuyerLayout() {
  return (
    <BuyerProvider>
      <div className="min-h-screen flex flex-col bg-[#faf9f6]">
        <BuyerNavbar />
        <AuthModal />
        <main className="flex-1">
          <Outlet />
        </main>
        <BuyerFooter />
      </div>
    </BuyerProvider>
  );
}
