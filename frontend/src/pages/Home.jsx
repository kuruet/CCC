import react from 'react'
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ClientLoop from '../components/ClientLoop';
import About from '../components/About';
import Work from '../components/Work';
import Testimonial from '../components/Testimonial';
import Contact from '../components/Contact';
import Follow from '../components/Follow';
import Footer from '../components/Footer';
import Divider from '../components/Divider';
import Fontfamily from '../components/Fontfamily';
  import Story from '../components/Story';
  import Client from '../components/Client';
  import Ads from "../components/Ads";

const Home = ()=> {
  return (
    <>
      
      <Header />
      <HeroSection />
      
       
       <About />
      <Divider />
      <Fontfamily/>
      <Ads/>
      <Work />
      <Divider />
      <Testimonial />
       <Client/>
        <ClientLoop />
        <Story/>
        
      <Contact />
       <Follow />
      <Footer />
      {/* <Client /> */}
   

    </>
   
  );
}

export default Home;
