import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';
import Home from './staticWeb/pages/Home';
import About from './staticWeb/pages/About';
import QualitySystems from './staticWeb/pages/QualitySystems';
import WhyChooseUs from './staticWeb/pages/WhyChooseUs';
import CableManagement from './staticWeb/pages/CableManagement';
import EarthingAccessories from './staticWeb/pages/EarthingAccessories';
import LugsConnectors from './staticWeb/pages/LugsConnectors';
import SwitchboardComponents from './staticWeb/pages/SwitchboardComponents';
import ElectricalComponents from './staticWeb/pages/ElectricalComponents';
import FixingsFasteners from './staticWeb/pages/FixingsFasteners';
import HighPrecisionParts from './staticWeb/pages/HighPrecisionParts';
import CNCComponents from './staticWeb/pages/CNCComponents';
import ThermoPlasticParts from './staticWeb/pages/ThermoPlasticParts';
import SubAssemblyParts from './staticWeb/pages/SubAssemblyParts';
import KittingParts from './staticWeb/pages/KittingParts';
import ThreeDPrinting from './staticWeb/pages/ThreeDPrinting';
import Contact from './staticWeb/pages/Contact';
import SpringType from './staticWeb/pages/SpringType';
import  SustainabilityCBAM from './staticWeb/pages/SustainabilityCBAM'
import OtherProducts from './staticWeb/pages/OtherProducts';


function App() {
  return (
    <Suspense fallback="Loading...">
      <div className="w-full overflow-x-hidden">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/quality" element={<QualitySystems />} />
            <Route path="/why-choose-us" element={<WhyChooseUs />} />
            <Route path="/cable-management" element={<CableManagement />} />
            <Route path="/earthing-accessories" element={<EarthingAccessories />} />
            <Route path="/lugs-connectors" element={<LugsConnectors />} />
            <Route path="/switchboard-components" element={<SwitchboardComponents />} />
            <Route path="/electrical-components" element={<ElectricalComponents />} />
            <Route path="/fixings-fasteners" element={<FixingsFasteners />} />
            <Route path="/high-precision-parts" element={<HighPrecisionParts />} />
            <Route path="/cnc-components" element={<CNCComponents />} />
            <Route path="/thermo-plastic-parts" element={<ThermoPlasticParts />} />
            <Route path="/sub-assembly-parts" element={<SubAssemblyParts />} />
            <Route path="/kitting-parts" element={<KittingParts />} />
            <Route path="/3d-printing" element={<ThreeDPrinting />} />
            <Route path='/spring-type' element={<SpringType />} />
            <Route path='/other-products' element={<OtherProducts />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sustainability-cbam" element={<SustainabilityCBAM />} />
          
          </Routes>
        </Router>
      </div>
    </Suspense>
  );
}

export default App
