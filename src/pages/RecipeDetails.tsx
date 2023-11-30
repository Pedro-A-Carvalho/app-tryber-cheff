import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams();
  const path = window.location.pathname;

  useEffect(() => {
    const requestApi = async () => {
      if (path === `/meals/${id}`) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        console.log(data);
      }
      if (path === `/drinks/${id}`) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        console.log(data);
      }
    };

    requestApi();
  }, []);

  return (
    <h1>recipe details</h1>
  );
}

export default RecipeDetails;
