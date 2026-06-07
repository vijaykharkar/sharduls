import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const WebsiteLayout = lazy(() => import('./layouts/WebsiteLayout'));
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const WhyChooseUsPage = lazy(() => import('./pages/WhyChooseUsPage'));
const QualitySystemsPage = lazy(() => import('./pages/QualitySystemsPage'));
const BulkEnquiryPage = lazy(() => import('./pages/BulkEnquiryPage'));
const SustainabilityCBAMPage = lazy(() => import('./pages/SustainabilityCBAMPage'));
const CableManagementPage = lazy(() => import('./pages/CableManagementPage'));
const FixingsFastenersPage = lazy(() => import('./pages/FixingsFastenersPage'));
const CNCComponentsPage = lazy(() => import('./pages/CNCComponentsPage'));
const ElectricalComponentsPage = lazy(() => import('./pages/ElectricalComponentsPage'));
const EarthingAccessoriesPage = lazy(() => import('./pages/EarthingAccessoriesPage'));
const HighPrecisionPartsPage = lazy(() => import('./pages/HighPrecisionPartsPage'));
const LugsConnectorsPage = lazy(() => import('./pages/LugsConnectorsPage'));
const SpringTypePage = lazy(() => import('./pages/SpringTypePage'));
const SubAssemblyPartsPage = lazy(() => import('./pages/SubAssemblyPartsPage'));
const ThermoPlasticPartsPage = lazy(() => import('./pages/ThermoPlasticPartsPage'));
const KittingPartsPage = lazy(() => import('./pages/KittingPartsPage'));
const SwitchboardComponentsPage = lazy(() => import('./pages/SwitchboardComponentsPage'));
const ThreeDPrintingPage = lazy(() => import('./pages/ThreeDPrintingPage'));
const OtherProductsPage = lazy(() => import('./pages/OtherProductsPage'));

const websiteRoutes = (
  <Route path="/" element={<WebsiteLayout />}>
    <Route index element={<HomePage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="why-choose-us" element={<WhyChooseUsPage />} />
    <Route path="quality-systems" element={<QualitySystemsPage />} />
    <Route path="bulk-enquiry" element={<BulkEnquiryPage />} />
    <Route path="sustainability" element={<SustainabilityCBAMPage />} />
    {/* Product Category Pages */}
    <Route path="products/cable-management" element={<CableManagementPage />} />
    <Route path="products/fixings-fasteners" element={<FixingsFastenersPage />} />
    <Route path="products/cnc-components" element={<CNCComponentsPage />} />
    <Route path="products/electrical-components" element={<ElectricalComponentsPage />} />
    <Route path="products/earthing-accessories" element={<EarthingAccessoriesPage />} />
    <Route path="products/high-precision-parts" element={<HighPrecisionPartsPage />} />
    <Route path="products/lugs-connectors" element={<LugsConnectorsPage />} />
    <Route path="products/springs" element={<SpringTypePage />} />
    <Route path="products/sub-assembly" element={<SubAssemblyPartsPage />} />
    <Route path="products/thermo-plastic" element={<ThermoPlasticPartsPage />} />
    <Route path="products/kitting" element={<KittingPartsPage />} />
    <Route path="products/switchboard-components" element={<SwitchboardComponentsPage />} />
    <Route path="products/3d-printing" element={<ThreeDPrintingPage />} />
    <Route path="products/other" element={<OtherProductsPage />} />
  </Route>
);

export default websiteRoutes;
