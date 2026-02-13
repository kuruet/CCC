import Header from "../components/Header";
import Footer from "../components/Footer";
 import Hero from "../components/Workshop_Hero";
 import Instructor from "../components/Instructor";
 import Divider from '../components/Divider';
 import Workdetails from "../components/Workdetails";
 import Learn from "../components/Learn";
import FAQ from "../components/FAQ";
import VideoHero from "../components/VideoHero";
import Brochure from "../components/Brochure";




const About = ()=> {
    return (
        <>
            <Header />
             <Hero/>
             <Divider/>
             <Instructor/>
             <Divider/>
              <Brochure/>
               <Divider/>
             <Workdetails/>
             
              <Learn/>
              <VideoHero/>
              <FAQ/>
             <Footer />
        </> 
    );
}
export default About;