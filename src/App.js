import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CLRIALLFORMS from './pages/CLRIALLFORMS';
import CLRIForm from './pages/CLRIForm';
import CLRIShowData from './pages/CLRIShowData';
import FormPage from './pages/CostBuffingFormPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
        <Navbar/>
        {/* <CLRIForm/> */}
        {/* <CLRIShowData/> */}
        {/* <CLRIALLFORMS/> */}
        {/* <FormPage/> */}

        <Routes>
          <Route path="/" element={<HomePage/>} ></Route>    
          <Route path="/clri-form" element={<CLRIForm/>} ></Route>    
          <Route path="/show-all" element={<CLRIALLFORMS/>}></Route>    
          <Route path="/details/:id" element={<CLRIShowData/>}></Route>    
          <Route path="/cost-buffing-form" element={<FormPage/>}></Route>    
        </Routes>

    </div>
  );
}

export default App;
