import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import Header from "./components/atoms/organisms/Header";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
