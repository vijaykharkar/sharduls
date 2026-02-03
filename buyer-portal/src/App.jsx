import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import BulkEnquiry from './pages/BulkEnquiry';
import BecomeSupplier from './pages/BecomeSupplier';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<Cart />} />
        <Route path="bulk-enquiry" element={<BulkEnquiry />} />
        <Route path="become-supplier" element={<BecomeSupplier />} />
      </Route>
    </Routes>
  );
}

export default App;
