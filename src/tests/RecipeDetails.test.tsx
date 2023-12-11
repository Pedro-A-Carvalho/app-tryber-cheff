import { screen } from '@testing-library/dom';
import { expect, vi } from 'vitest';
import App from '../App';
import renderWithProviderTotal from '../utils/renderWithProviderTotal';
import mockMeals from '../../cypress/mocks/fetch';

afterEach(() => vi.clearAllMocks());
beforeEach(() => { global.fetch = vi.fn().mockImplementation(mockMeals); });

const testIdRecipe = '0-card-name';
const testIdImageRecipe = 'recipe-photo';
const testIdBtnFavorite = 'favorite-btn';
const testIdBtnStar = 'start-recipe-btn';
const routeDrink = '/drinks/15997';
const routeDrinkContinue = '/drinks/178319';

describe('Testa a tela de detalhes.', () => {
  test('Verifica se os elementos estão na tela Meals.', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/meals' });

    const cardRecipe = await screen.findByTestId(testIdRecipe);
    expect(cardRecipe).toBeInTheDocument();
    await user.click(cardRecipe);
    const imgRecipe = screen.getByTestId(testIdImageRecipe);
    expect(imgRecipe).toBeInTheDocument();
    const titleRecipe = screen.getByTestId('recipe-title');
    expect(titleRecipe).toBeInTheDocument();
    const categoryRecipe = screen.getByTestId('recipe-category');
    expect(categoryRecipe).toBeInTheDocument();
    const ingredientRecipe = screen.getByTestId('0-ingredient-name-and-measure');
    expect(ingredientRecipe).toBeInTheDocument();
    const intructionRecipe = screen.getByTestId('instructions');
    expect(intructionRecipe).toBeInTheDocument();
    const videoRecipe = screen.getByTestId('video');
    expect(videoRecipe).toBeInTheDocument();
    // const recommendedRecipe = screen.getByTestId('0-recommendation-card');
    // expect(recommendedRecipe).toBeInTheDocument();
    const btnStart = screen.getByTestId(testIdBtnStar);
    expect(btnStart).toBeInTheDocument();
    const btnShare = screen.getByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
    const btnFavorite = screen.getByTestId(testIdBtnFavorite);
    expect(btnFavorite).toBeInTheDocument();
  });

  test('Verifica se os elementos estão na tela Drinks.', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/drinks' });
    const cardRecipe = await screen.findByTestId(testIdRecipe);
    expect(cardRecipe).toBeInTheDocument();
    await user.click(cardRecipe);
    const imgRecipe = screen.getByTestId(testIdImageRecipe);
    expect(imgRecipe).toBeInTheDocument();
    const titleRecipe = screen.getByTestId('recipe-title');
    expect(titleRecipe).toBeInTheDocument();
    const categoryRecipe = screen.getByTestId('recipe-category');
    expect(categoryRecipe).toBeInTheDocument();
    const ingredientRecipe = screen.getByTestId('0-ingredient-name-and-measure');
    expect(ingredientRecipe).toBeInTheDocument();
    const intructionRecipe = screen.getByTestId('instructions');
    expect(intructionRecipe).toBeInTheDocument();
    // const recommendedRecipe = screen.getByTestId('0-recommendation-card');
    // expect(recommendedRecipe).toBeInTheDocument();
    const btnStart = screen.getByTestId(testIdBtnStar);
    expect(btnStart).toBeInTheDocument();
    const btnShare = screen.getByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
    const btnFavorite = screen.getByTestId(testIdBtnFavorite);
    expect(btnFavorite).toBeInTheDocument();
  });

  test('Verifica se é possível favoritar uma receita em Drinks.', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/drinks' });

    const cardRecipe = await screen.findByTestId(testIdRecipe);
    expect(cardRecipe).toBeInTheDocument();
    await user.click(cardRecipe);
    const imgRecipe = screen.getByTestId(testIdImageRecipe);
    expect(imgRecipe).toBeInTheDocument();

    const btnFavorite = screen.getByTestId(testIdBtnFavorite);
    expect(btnFavorite).toBeInTheDocument();

    expect(btnFavorite).toHaveProperty('alt', 'FavoriteWhite');

    await user.click(btnFavorite);

    expect(btnFavorite).toHaveProperty('alt', 'FavoriteBlack');
  });

  test('Verifica se é possível favoritar uma receita em Meals.', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/meals' });

    const cardRecipe = await screen.findByTestId(testIdRecipe);
    expect(cardRecipe).toBeInTheDocument();
    await user.click(cardRecipe);
    const imgRecipe = screen.getByTestId(testIdImageRecipe);
    expect(imgRecipe).toBeInTheDocument();

    const btnFavorite = screen.getByTestId(testIdBtnFavorite);
    expect(btnFavorite).toBeInTheDocument();

    expect(btnFavorite).toHaveProperty('alt', 'FavoriteWhite');

    await user.click(btnFavorite);

    expect(btnFavorite).toHaveProperty('alt', 'FavoriteBlack');
  });

  test('Verifica se uma receita favorita é renderizada com o favorite em Meals.', async () => {
    const favoriteRecipes = [
      {
        alcoholicOrNot: '',
        category: 'Vegetarian',
        id: '52771',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        name: 'Spicy Arrabiata Penne',
        nationality: 'Italian',
        type: 'meal',
      },
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    const { user } = renderWithProviderTotal(<App />, { route: '/meals/52771' });

    const imgRecipe = await screen.findByTestId(testIdImageRecipe);
    expect(imgRecipe).toBeInTheDocument();

    const btnFavorite = screen.getByTestId(testIdBtnFavorite);
    expect(btnFavorite).toHaveProperty('alt', 'FavoriteBlack');
  });

  test('Verifica se uma receita favorita é renderizada com o favorite em Drinks.', async () => {
    const favoriteRecipes = [
      {
        alcoholicOrNot: 'Optional alcohol',
        category: 'Ordinary Drink',
        id: '15997',
        image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
        name: 'GG',
        nationality: '',
        type: 'drink',
      },
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    const { user } = renderWithProviderTotal(<App />, { route: routeDrink });

    const imgRecipe = await screen.findByTestId(testIdImageRecipe);
    expect(imgRecipe).toBeInTheDocument();

    const btnFavorite = screen.getByTestId(testIdBtnFavorite);
    expect(btnFavorite).toHaveProperty('alt', 'FavoriteBlack');
  });

  test('Verifica se ao clicar no botão Start recipe a página é redirecionada.', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: routeDrink });

    const btnStart = await screen.findByTestId(testIdBtnStar);
    expect(btnStart).toBeInTheDocument();

    await user.click(btnStart);

    expect(window.location.pathname).toBe('/drinks/15997/in-progress');
  });

  test('Verifica se ao clicar no botão Continue recipe a página é redirecionada.', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: routeDrinkContinue });

    const btnStart = await screen.findByTestId(testIdBtnStar);
    expect(btnStart).toBeInTheDocument();

    await user.click(btnStart);

    expect(window.location.pathname).toBe('/drinks/178319/in-progress');
  });

  test('Verifica se quando uma receita é desfavoritada o valor muda.', async () => {
    const favoriteRecipes = [
      {
        alcoholicOrNot: 'Optional alcohol',
        category: 'Ordinary Drink',
        id: '15997',
        image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
        name: 'GG',
        nationality: '',
        type: 'drink',
      },
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    const { user } = renderWithProviderTotal(<App />, { route: routeDrink });

    const btnFavorite = await screen.findByTestId(testIdBtnFavorite);
    const storageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') as any);
    expect(storageFavorite[0].id).toBe('15997');
    await user.click(btnFavorite);
    const storageFavoritenew = JSON.parse(localStorage.getItem('favoriteRecipes') as any);
    expect(storageFavoritenew.length).toBe(0);

    console.log(` pega aqui: ${storageFavorite}`);
  });

  test('Verifica se ao clicar no botão Continue recipe a página é redirecionada.', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: routeDrinkContinue });

    const btnStart = await screen.findByTestId(testIdBtnStar);
    expect(btnStart).toBeInTheDocument();

    await user.click(btnStart);

    expect(window.location.pathname).toBe('/drinks/178319/in-progress');
  });
});
