import "./App.css";
import one from "./assets/img1.jpg";
import two from "./assets/img2.jpg";
import three from "./assets/img3.jpg";
import four from "./assets/img4.jpg";
import five from "./assets/img5.jpg";
import Carousel from "./components/Carousel";

function App() {
  return (
    <Carousel>
      <img src={one} />
      <img src={two} />
      <img src={three} />
      <img src={four} />
      <img src={five} />
    </Carousel>
  );
}

export default App;
