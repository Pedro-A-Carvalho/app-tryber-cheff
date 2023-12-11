import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithProviderTotal from '../utils/renderWithProviderTotal';

const favRoute = { route: '/favorite-recipes' };
const favoriteBtn = '0-horizontal-favorite-btn';
const filterDrinkButton = 'filter-by-drink-btn';
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

test('Verifica se a página é renderizada corretamente', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

  renderWithProviderTotal(<App />, favRoute);

  const recipeCard = screen.getByTestId('0-recipe-card');
  expect(recipeCard).toBeInTheDocument();

  const recipeImg = screen.getByTestId('0-horizontal-image');
  expect(recipeImg).toBeInTheDocument();

  const recipeName = screen.getByTestId('0-horizontal-name');
  expect(recipeName).toBeInTheDocument();

  const favBtn = screen.getByTestId(favoriteBtn);
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
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

  const { user } = renderWithProviderTotal(<App />, favRoute);

  const filterDrinkBtn = screen.getByTestId(filterDrinkButton);
  await user.click(filterDrinkBtn);

  const meal = screen.queryByText('Spicy Arrabiata Penne');
  await waitFor(() => {
    expect(meal).not.toBeInTheDocument();
  });
});

test('Verifica se o filtro All funciona', async () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

  const { user } = renderWithProviderTotal(<App />, favRoute);

  const filterDrinkBtn = screen.getByTestId(filterDrinkButton);
  const filterAllBtn = screen.getByTestId('filter-by-all-btn');
  const meal = screen.getAllByText('Teriyaki Chicken Casserole');

  await user.click(filterDrinkBtn);

  await user.click(filterAllBtn);

  await waitFor(() => {
    expect(meal.length).toBeGreaterThan(0);
  });
});

test('Verifica se o botão de desfavoritar funciona', async () => {
  const favoriteLasagna = [
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

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteLasagna));

  const { user } = renderWithProviderTotal(<App />, favRoute);

  const favBtn = screen.getByTestId(favoriteBtn);
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

test('Verifica se o estado inicial de isFavorite é configurado corretamente', async () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

  renderWithProviderTotal(<App />, favRoute);

  const isFavorite = screen.getByTestId(favoriteBtn);
  expect(isFavorite).toHaveAttribute('alt', 'FavoriteBlack');
});

test('Verifica se não houver receitas favoritadas, não aparecerá nada na página e o localStorage estará vazio', async () => {
  localStorage.clear();

  renderWithProviderTotal(<App />, favRoute);

  const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

  expect(Array.isArray(getFavorite)).toBe(true);
  expect(getFavorite.length).toBe(0);

  const favorite = screen.queryByTestId('0-recipe-card');
  await waitFor(() => {
    expect(favorite).not.toBeInTheDocument();
  });
});
