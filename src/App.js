import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CLRIALLFORMS from './pages/CLRIALLFORMS';
import CLRIForm from './pages/CLRIForm';
import CLRIShowData from './pages/CLRIShowData';

function App() {
  return (
    <div className="App">
        <Navbar/>
        {/* <CLRIForm/> */}
        {/* <CLRIShowData/> */}
        {/* <CLRIALLFORMS/> */}

        <Routes>
          <Route path="/" element={<CLRIForm/>} ></Route>    
          <Route path="/show-all" element={<CLRIALLFORMS/>}></Route>    
          <Route path="/details/:id" element={<CLRIShowData/>}></Route>    
        </Routes>

    </div>
  );
}

export default App;
