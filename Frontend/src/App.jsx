import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '@shared/components/common/ScrollToTop';
import Spinner from '@shared/components/common/Spinner';
import ProtectedRoute from '@shared/routes/ProtectedRoute';
import PortalGuard from '@shared/routes/PortalGuard';
import UnauthorizedPage from '@shared/pages/UnauthorizedPage';

/* ── Layouts ── */
const BuyerLayout = lazy(() => import('@modules/buyer/layouts/BuyerLayout'));
const WebsiteLayout = lazy(() => import('@modules/website/layouts/WebsiteLayout'));
const SupplierLayout = lazy(() => import('@modules/supplier/layouts/SupplierLayout'));
const AdminLayout = lazy(() => import('@modules/admin/layouts/AdminLayout'));

/* ── Buyer Pages ── */
const BuyerHome = lazy(() => import('@modules/buyer/pages/HomePage'));
const BuyerProducts = lazy(() => import('@modules/buyer/pages/ProductsPage'));
const BuyerProductDetail = lazy(() => import('@modules/buyer/pages/ProductDetailPage'));
const BuyerCart = lazy(() => import('@modules/buyer/pages/CartPage'));
const BuyerWishlist = lazy(() => import('@modules/buyer/pages/WishlistPage'));
const BuyerCheckout = lazy(() => import('@modules/buyer/pages/CheckoutPage'));
const BuyerProfile = lazy(() => import('@modules/buyer/pages/ProfilePage'));
const BuyerOrders = lazy(() => import('@modules/buyer/pages/OrdersPage'));
const NotFound = lazy(() => import('@modules/buyer/pages/NotFoundPage'));

/* ── Shared Auth Pages ── */
const LoginPage = lazy(() => import('@modules/supplier/pages/LoginPage'));
const RegisterPage = lazy(() => import('@modules/supplier/pages/RegisterPage'));

/* ── Supplier Pages ── */
const SupplierDashboard = lazy(() => import('@modules/supplier/pages/DashboardPage'));
const SupplierProfile = lazy(() => import('@modules/supplier/pages/ProfilePage'));
const SupplierOrders = lazy(() => import('@modules/supplier/pages/OrdersPage'));
const SupplierProducts = lazy(() => import('@modules/supplier/pages/ProductsPage'));
const SupplierPayments = lazy(() => import('@modules/supplier/pages/PaymentsPage'));
const SupplierSupport = lazy(() => import('@modules/supplier/pages/SupportPage'));

/* ── Admin Pages ── */
const AdminDashboard = lazy(() => import('@modules/admin/pages/AdminDashboardPage'));
const AdminSuppliers = lazy(() => import('@modules/admin/pages/AdminSuppliersPage'));
const AdminSupplierDetail = lazy(() => import('@modules/admin/pages/AdminSupplierDetailPage'));
const AdminProducts = lazy(() => import('@modules/admin/pages/AdminProductsPage'));
const AdminProductDetail = lazy(() => import('@modules/admin/pages/AdminProductDetailPage'));
const AdminOrders = lazy(() => import('@modules/admin/pages/AdminOrdersPage'));
const AdminPayments = lazy(() => import('@modules/admin/pages/AdminPaymentsPage'));
const AdminSettings = lazy(() => import('@modules/admin/pages/AdminSettingsPage'));

/* ── Website Pages ── */
const WebsiteHome = lazy(() => import('@modules/website/pages/HomePage'));
const WebsiteAbout = lazy(() => import('@modules/website/pages/AboutPage'));
const WebsiteContact = lazy(() => import('@modules/website/pages/ContactPage'));
const WebsiteWhyChooseUs = lazy(() => import('@modules/website/pages/WhyChooseUsPage'));
const WebsiteQuality = lazy(() => import('@modules/website/pages/QualitySystemsPage'));
const WebsiteBulkEnquiry = lazy(() => import('@modules/website/pages/BulkEnquiryPage'));
const WebsiteSustainability = lazy(() => import('@modules/website/pages/SustainabilityCBAMPage'));
const CableManagement = lazy(() => import('@modules/website/pages/CableManagementPage'));
const FixingsFasteners = lazy(() => import('@modules/website/pages/FixingsFastenersPage'));
const CNCComponents = lazy(() => import('@modules/website/pages/CNCComponentsPage'));
const ElectricalComponents = lazy(() => import('@modules/website/pages/ElectricalComponentsPage'));
const EarthingAccessories = lazy(() => import('@modules/website/pages/EarthingAccessoriesPage'));
const HighPrecisionParts = lazy(() => import('@modules/website/pages/HighPrecisionPartsPage'));
const LugsConnectors = lazy(() => import('@modules/website/pages/LugsConnectorsPage'));
const SpringType = lazy(() => import('@modules/website/pages/SpringTypePage'));
const SubAssemblyParts = lazy(() => import('@modules/website/pages/SubAssemblyPartsPage'));
const ThermoPlasticParts = lazy(() => import('@modules/website/pages/ThermoPlasticPartsPage'));
const KittingParts = lazy(() => import('@modules/website/pages/KittingPartsPage'));
const SwitchboardComponents = lazy(() => import('@modules/website/pages/SwitchboardComponentsPage'));
const ThreeDPrinting = lazy(() => import('@modules/website/pages/ThreeDPrintingPage'));
const OtherProducts = lazy(() => import('@modules/website/pages/OtherProductsPage'));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Spinner />}>
        <Routes>
          {/* ── Company Website (root) ── */}
          <Route path="/" element={<WebsiteLayout />}>
            <Route index element={<WebsiteHome />} />
            <Route path="about" element={<WebsiteAbout />} />
            <Route path="contact" element={<WebsiteContact />} />
            <Route path="why-choose-us" element={<WebsiteWhyChooseUs />} />
            <Route path="quality-systems" element={<WebsiteQuality />} />
            <Route path="bulk-enquiry" element={<WebsiteBulkEnquiry />} />
            <Route path="sustainability" element={<WebsiteSustainability />} />
            <Route path="products/cable-management" element={<CableManagement />} />
            <Route path="products/fixings-fasteners" element={<FixingsFasteners />} />
            <Route path="products/cnc-components" element={<CNCComponents />} />
            <Route path="products/electrical-components" element={<ElectricalComponents />} />
            <Route path="products/earthing-accessories" element={<EarthingAccessories />} />
            <Route path="products/high-precision-parts" element={<HighPrecisionParts />} />
            <Route path="products/lugs-connectors" element={<LugsConnectors />} />
            <Route path="products/springs" element={<SpringType />} />
            <Route path="products/sub-assembly" element={<SubAssemblyParts />} />
            <Route path="products/thermo-plastic" element={<ThermoPlasticParts />} />
            <Route path="products/kitting" element={<KittingParts />} />
            <Route path="products/switchboard-components" element={<SwitchboardComponents />} />
            <Route path="products/3d-printing" element={<ThreeDPrinting />} />
            <Route path="products/other" element={<OtherProducts />} />
          </Route>

          {/* ── Buyer Portal ── */}
          {/* PortalGuard blocks authenticated non-buyers (supplier/admin) from entering.
              Unauthenticated guests can still browse public buyer pages. */}
          <Route path="/buyer" element={<PortalGuard allowedRoles={['buyer']}><BuyerLayout /></PortalGuard>}>
            <Route index element={<BuyerHome />} />
            <Route path="products" element={<BuyerProducts />} />
            <Route path="product/:id" element={<BuyerProductDetail />} />
            <Route path="cart" element={<BuyerCart />} />
            <Route path="wishlist" element={<BuyerWishlist />} />
            <Route path="checkout" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerCheckout /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerProfile /></ProtectedRoute>} />
            <Route path="orders" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerOrders /></ProtectedRoute>} />
          </Route>

          {/* ── Shared Auth ── */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Aliases so /supplier/login and /supplier/register also work */}
          <Route path="/supplier/login" element={<LoginPage />} />
          <Route path="/supplier/register" element={<RegisterPage />} />

          {/* ── Supplier Portal ── */}
          <Route path="/supplier" element={<ProtectedRoute allowedRoles={['supplier']}><SupplierLayout /></ProtectedRoute>}>
            <Route index element={<SupplierDashboard />} />
            <Route path="dashboard" element={<SupplierDashboard />} />
            <Route path="profile" element={<SupplierProfile />} />
            <Route path="orders" element={<SupplierOrders />} />
            <Route path="products" element={<SupplierProducts />} />
            <Route path="payments" element={<SupplierPayments />} />
            <Route path="support" element={<SupplierSupport />} />
          </Route>

          {/* ── Admin Portal ── */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin', 'superadmin']}><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="suppliers" element={<AdminSuppliers />} />
            <Route path="suppliers/:id" element={<AdminSupplierDetail />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/:id" element={<AdminProductDetail />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* ── 403 Unauthorized ── */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
