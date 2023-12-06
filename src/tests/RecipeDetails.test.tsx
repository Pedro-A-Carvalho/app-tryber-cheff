import { screen } from '@testing-library/dom';
import { expect, vi } from 'vitest';
import { createMemoryHistory } from 'history';
import App from '../App';
import renderWithProviderTotal from '../utils/renderWithProviderTotal';
import mockMeals from '../../cypress/mocks/fetch';

afterEach(() => vi.clearAllMocks());
beforeEach(() => { global.fetch = vi.fn().mockImplementation(mockMeals); });

const testIdRecipe = '0-card-name';
const testIdImageRecipe = 'recipe-photo';
const testIdBtnFavorite = 'favorite-btn';

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
    const recommendedRecipe = screen.getByTestId('0-recommendation-card');
    expect(recommendedRecipe).toBeInTheDocument();
    const btnStart = screen.getByTestId('start-recipe-btn');
    expect(btnStart).toBeInTheDocument();
    const btnShare = screen.getByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
    const btnFavorite = screen.getByTestId(testIdBtnFavorite);
    expect(btnFavorite).toBeInTheDocument();
  });

  test('Verifica se os elementos estão na tela Drinks', async () => {
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
    const recommendedRecipe = screen.getByTestId('0-recommendation-card');
    expect(recommendedRecipe).toBeInTheDocument();
    const btnStart = screen.getByTestId('start-recipe-btn');
    expect(btnStart).toBeInTheDocument();
    const btnShare = screen.getByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
    const btnFavorite = screen.getByTestId(testIdBtnFavorite);
    expect(btnFavorite).toBeInTheDocument();
  });

  test('Verifica se é possível favoritar uma receita em Drinks', async () => {
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

  test('Verifica se é possível favoritar uma receita em Meals', async () => {
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

  test('Verifica se uma receita favorita é renderizada com o favirite true', async () => {
    const history = createMemoryHistory();
    const { user } = renderWithProviderTotal(<App />, { route: '/drinks' });

    const cardRecipe = await screen.findByTestId(testIdRecipe);
    expect(cardRecipe).toBeInTheDocument();
    await user.click(cardRecipe);
    const imgRecipe = screen.getByTestId(testIdImageRecipe);
    expect(imgRecipe).toBeInTheDocument();

    const btnFavorite = screen.getByTestId(testIdBtnFavorite);
    expect(btnFavorite).toBeInTheDocument();
  });
});
