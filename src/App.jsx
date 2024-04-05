import { Route, Routes } from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./login";
// import Home from "./Home";
import Dashbord from "./dashboard";
// import Register from './Register';
import Listing from "./listing";
import UploadExcel from "./uploadExcel";
import ListUpload from "./listUpload";
import Inventory from "./inventory";

// import Cateogry from './cateogry';
function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/dashboard" element={<Dashbord />} />
        {/* <Route  path='/Register' element={<Register />} /> */}
        <Route path="/listing" element={<Listing />} />
        <Route path="/listUpload" element={<ListUpload />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/uploadExcel" element={<UploadExcel />} />
        {/* <Route  path='/Cateogry' element={<Cateogry />} /> */}
      </Routes>
    </div>
  );
}

export default App;
