import './App.css';
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Home from './Components/Home';
import landingPage from './Components/LandingPage';
import GamesDetail from './Components/GameDetails';
import CreateGame from './Components/CreateGame';
import About from './Components/About';
import Favorites from './Components/Favorites';
function App() {
  return (
    <BrowserRouter>
    <Route exact path="/"  component={landingPage}/>
    <Route exact path="/Home" component={Home} />
    <Route exact path="/videogames/:id" component={GamesDetail} />
    <Route exact path="/Createvideogame" component={CreateGame} />
    <Route exact path="/About" component={About} />
    <Route exact path="/Favorites" component={Favorites} />
    </BrowserRouter>
  );
}

export default App;
