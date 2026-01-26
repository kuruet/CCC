import Header from '../components/Header';
import Footer from '../components/Footer';
import MovingImages from '../components/MovingImages';


const Portfolio = ()=> {
  return (
    <>
      <div className=" flex flex-col">
  {/* Header */}
  <Header className="">Header</Header>

 <MovingImages />
  {/* Footer */}
  <Footer className=" text-white p-4 w-full fixed bottom-0 left-0">
    Footer content
  </Footer>
</div>

   

    </>
   
  );
}

export default Portfolio;