import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithProviderTotal from '../utils/renderWithProviderTotal';

const favRoute = { route: '/favorite-recipes' };
const filterDrinkButton = 'filter-by-drink-btn';

test('Verifica se a página é renderizada corretamente', () => {
  const favoriteRecipes = [
    {
      alcoholicOrNot: '',
      category: 'Chicken',
      id: '52772',
      image: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
      name: 'Teriyaki Chicken Casserole',
      nationality: 'Japanese',
      type: 'meal',
    },
  ];

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

  renderWithProviderTotal(<App />, favRoute);

  const recipeCard = screen.getByTestId('0-recipe-card');
  expect(recipeCard).toBeInTheDocument();

  const recipeImg = screen.getByTestId('0-horizontal-image');
  expect(recipeImg).toBeInTheDocument();

  const recipeName = screen.getByTestId('0-horizontal-name');
  expect(recipeName).toBeInTheDocument();

  const favBtn = screen.getByTestId('0-horizontal-favorite-btn');
  expect(favBtn).toBeInTheDocument();

  const shareBtn = screen.getByTestId('0-horizontal-share-btn');
  expect(shareBtn).toBeInTheDocument();

  const filterAllBtn = screen.getByTestId('filter-by-all-btn');
  expect(filterAllBtn).toBeInTheDocument();

  const filterMealBtn = screen.getByTestId('filter-by-meal-btn');
  expect(filterMealBtn).toBeInTheDocument();

  const filterDrinkBtn = screen.getByTestId(filterDrinkButton);
  expect(filterDrinkBtn).toBeInTheDocument();
});

test('Verifica se o filtro Meals funciona', async () => {
  const favoriteRecipes = [
    {
      alcoholicOrNot: '',
      category: 'Chicken',
      id: '52772',
      image: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
      name: 'Teriyaki Chicken Casserole',
      nationality: 'Japanese',
      type: 'meal',
    },
    {
      alcoholicOrNot: 'Alcoholic',
      category: 'Ordinary Drink',
      id: '11007',
      image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
      name: 'Margarita',
      nationality: '',
      type: 'drink',
    },
  ];

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

  const { user } = renderWithProviderTotal(<App />, favRoute);

  const filterMealBtn = screen.getByTestId('filter-by-meal-btn');
  await user.click(filterMealBtn);

  const drink = screen.queryByTestId('1-recipe-card');
  await waitFor(() => {
    expect(drink).not.toBeInTheDocument();
  });
});

test('Verifica se o filtro Drinks funciona', async () => {
  const spicyArrabiata = {
    alcoholicOrNot: '',
    category: 'Vegetarian',
    id: '52771',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    name: 'Spicy Arrabiata Penne',
    nationality: 'Italian',
    type: 'meal',
  };
  const margarita = {
    alcoholicOrNot: 'Alcoholic',
    category: 'Ordinary Drink',
    id: '11007',
    image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
    name: 'Margarita',
    nationality: '',
    type: 'drink',
  };

  const favoriteRecipes = [
    spicyArrabiata,
    margarita,
  ];

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

  const { user } = renderWithProviderTotal(<App />, favRoute);

  const filterDrinkBtn = screen.getByTestId(filterDrinkButton);
  await user.click(filterDrinkBtn);

  const drink = screen.queryByText('Spicy Arrabiata Penne');
  await waitFor(() => {
    expect(drink).not.toBeInTheDocument();
  });
});

test('Verifica se o botão de desfavoritar funciona', async () => {
  const favoriteRecipes = [
    {
      alcoholicOrNot: '',
      category: 'Pasta',
      id: '52987',
      image: 'hhttps://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg',
      name: 'Lasagna Sandwiches',
      nationality: 'American',
      type: 'meal',
    },
  ];

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

  const { user } = renderWithProviderTotal(<App />, favRoute);

  const favBtn = screen.getByTestId('0-horizontal-favorite-btn');
  await user.click(favBtn);

  const meal = screen.queryByText('Lasagna Sandwiches');
  await waitFor(() => {
    expect(meal).not.toBeInTheDocument();
  });
});

test('Verifica se ao favoritar uma receita, ela aparece na página e é armazenada no localStorage', async () => {
  const { user } = renderWithProviderTotal(<App />, { route: '/meals/52977' });

  await waitFor(() => screen.getByTestId('favorite-btn'));
  const favBtn = screen.getByTestId('favorite-btn');

  const localStorageBefore = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

  await user.click(favBtn);

  const localStorageAfter = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

  expect(localStorageBefore.length + 1).toBe(localStorageAfter.length);
});
