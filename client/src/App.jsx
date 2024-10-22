import {BrowserRouter,Route,Router,Routes} from 'react-router-dom';
import About from "./pages/About";
import DashBoard from "./pages/DashBoard";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from './Components/Header';
import Footercomp from "./Components/Footer";
import PrivateRoute from './Components/PrivateRoute';


export default function App() {
  return (
    <BrowserRouter>
    <Header/> 
    <Routes>
      <Route path="/About" element={<About/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/Projects" element={<Projects/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/DashBoard" element={<DashBoard/>}/>
      </Route>
      <Route path="/Sign-in" element={<Signin/>}/>
      <Route path="/Signup" element={<Signup/>}/>
    </Routes>
    <Footercomp/>
    </BrowserRouter>
  )
}
