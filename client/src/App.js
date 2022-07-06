import './App.css';
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Home from './Components/Home';
import landingPage from './Components/LandingPage';
import GamesDetail from './Components/GameDetails';

function App() {
  return (
    <BrowserRouter>
    <Route exact path="/"  component={landingPage}/>
    <Route exact path="/Home" component={Home} />
    <Route exact path="/videogames/:id" component={GamesDetail} />
    </BrowserRouter>
  );
}

export default App;
