import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import Header from "./components/organisms/Header";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
