import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CLRIALLFORMS from './pages/CLRIALLFORMS';
import CLRIForm from './pages/CLRIForm';
import CLRIShowData from './pages/CLRIShowData';
import FormPage from './pages/CostBuffingFormPage';
import HomePage from './pages/HomePage';
import EmergencyLightForm from './pages/Electrical/EmergencyLight';
import EmergencyDoorForm from './pages/Electrical/EmergencyDoorForm';
import RingTraveller from './pages/Production/RingTraveller';
import Ring from './pages/Production/Ring';
import MachienHealth from './pages/MachineHealth';
import MachineHealthFormAll from './pages/MachineHealthFormAll';
import VerifyForm from './pages/VerifyForm';
import MachineHealthView from './pages/MachineHealthView';

function App() {
  return (
    <div className="App">
        <Navbar/>
        {/* <Ring/> */}
        {/* <RingTraveller/> */}
        {/* <CLRIForm/> */}
        {/* <CLRIShowData/> */}
        {/* <CLRIALLFORMS/> */}
        {/* <FormPage/> */}
        {/* <MachienHealth/> */}
        {/* <MachineHealthFormAll/> */}

        <Routes>
          <Route path="/" element={<HomePage/>} ></Route>    
          <Route path="/clri-form" element={<CLRIForm/>} ></Route>    
          <Route path="/show-all" element={<CLRIALLFORMS/>}></Route>    
          <Route path="/details/:id" element={<CLRIShowData/>}></Route>    
          <Route path="/cost-buffing-form" element={<FormPage/>}></Route>
          <Route path="/clri-form" element={<CLRIForm/>} ></Route>   
          <Route path="/emergency-light-form" element={<EmergencyLightForm/>}></Route>  
          <Route path="/emergency-door-form" element={<EmergencyDoorForm/>}></Route>

          <Route path="/machine-health-form" element={<MachienHealth/>}></Route>     
          <Route path="/get-all-mchealth-forms" element={<MachineHealthFormAll/>}></Route>
          <Route path="/machine-health-details/:id" element={<MachineHealthView/>}></Route>      
          <Route path="/verify-machine-health/:id" element={<VerifyForm/>}></Route>  

        </Routes>

    </div>
  );
}

export default App;
