import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Meals /> } />
      <Route path="/drinks" element={ <Drinks /> } />

      <Route path="/meals/:id-da-receita" element={ <Meals /> } />
      <Route path="/drinks/:id-da-receita" element={ <Drinks /> } />
      <Route path="/meals/:id-da-receita/in-progress" element={ <Meals /> } />
      <Route path="/drinks/:id-da-receita/in-progress" element={ <Drinks /> } />

      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
    </Routes>
  );
}

export default App;
