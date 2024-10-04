import {BrowserRouter,Route,Router,Routes} from 'react-router-dom';
import About from "./pages/About";
import DashBoard from "./pages/DashBoard";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from './Components/Header';
import Footercomp from "./Components/Footer";


export default function App() {
  return (
    <BrowserRouter>
    <Header/> 
    <Routes>
      <Route path="/About" element={<About/>}/>
      <Route path="/DashBoard" element={<DashBoard/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/Projects" element={<Projects/>}/>
      <Route path="/Signin" element={<Signin/>}/>
      <Route path="/Signup" element={<Signup/>}/>
    </Routes>
    <Footercomp/>
    </BrowserRouter>
  )
}
