import "./App.css";
import { CartProvider, ThemeProvider } from "./context";
import Page from "./page";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Page />
        <ToastContainer position="bottom-right" transition={Slide} />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
