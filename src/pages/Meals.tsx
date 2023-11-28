import { useContext } from 'react';
import Header from '../components/Header';
import SearchBar from './SearchBar';
import Footer from '../components/Footer';
import SearchContext from '../context/SearchContext';

function Meals() {
  const { values: { search } } = useContext(SearchContext);
  return (
    <>
      <Header>Meals</Header>
      <SearchBar
        endIngredients={ `www.themealdb.com/api/json/v1/1/list.php?i=${search}` }
        endName={ `www.themealdb.com/api/json/v1/1/search.php?s=${search}` }
        endFirstLetter={ `www.themealdb.com/api/json/v1/1/search.php?f=${search}` }
      />
      <Footer />
    </>
  );
}

export default Meals;
