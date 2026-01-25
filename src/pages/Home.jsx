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

const Home = ()=> {
  return (
    <>
      
      <Header />
      <HeroSection />
      
       
       <About />
      <Divider />
      <Fontfamily/>
      <Work />
      <Divider />
      <Testimonial />
      <Divider />
      <Client/>
      <Divider />
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
