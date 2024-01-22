import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import TaskBoard from "./components/TaskBoard";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navigation />
      <Hero />
      <TaskBoard />
      <Footer />
      <ToastContainer
        position="top-center"
        hideProgressBar
        theme="dark"
        transition={Slide}
      />
    </>
  );
}

export default App;
