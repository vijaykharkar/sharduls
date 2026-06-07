import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const WebsiteLayout = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <main className="pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
