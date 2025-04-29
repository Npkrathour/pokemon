import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Pokemon from "./components/pokemonApi/Pokemon";

function App() {
  return (
    <Router>
      <AppLayout>
        <Pokemon />
      </AppLayout>
    </Router>
  );
}

export default App;
