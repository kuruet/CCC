import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import { Route, Routes, useLocation} from 'react-router-dom'
import Contact from "./pages/Contact";
import About from "./pages/About";
import Service from "./pages/Service";
import Workshop from "./pages/Workshop";



const App = () => {


  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/service" element={<Service />} />
      <Route path="/workshop" element={<Workshop/>} />
    </Routes>
  ) 
}

export default App