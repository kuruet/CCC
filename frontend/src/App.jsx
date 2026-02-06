
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
// import { Route, Routes, useLocation} from 'react-router-dom'
import Contact from "./pages/Contact";
import About from "./pages/About";
import Service from "./pages/Service";
import Workshop from "./pages/Workshop";
import Register from "./pages/Register";
import PrivacyPolicy from "./pages/Privacy"
import Condition from "./pages/Condition";
import Refund from "./pages/Refund"
import Disclaimer from "./pages/Disclaimer"
import Dashboard from "./pages/Dashboard"



const App = () => {


  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/service" element={<Service />} />
      <Route path="/workshop" element={<Workshop/>} />
      <Route path="/workshop/register" element={<Register/>} />
      <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
      <Route path="/terms-and-conditions" element={<Condition/>}/>
      <Route path="/refund-policy" element={<Refund/>}/>
        <Route path="/disclaimer" element={<Disclaimer/>}/>
         <Route path="/dashboard" element={<Dashboard/>}/>



    </Routes>
  ) 
}

export default App