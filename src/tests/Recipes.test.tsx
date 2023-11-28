import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import renderWithProvider from '../utils/renderWithProvider';
import App from '../App';
import newFetch from '../../cypress/mocks/fetch';

afterEach(() => vi.clearAllMocks());

beforeEach(() => { global.fetch = vi.fn().mockImplementation(newFetch); });
//   .mockResolvedValueOnce({

describe('Testa o componente Recipes.', () => {
  test('Verifica se todos os elementos estão na tela de meals.', async () => {
    const { user } = renderWithProvider(<App />, { route: '/meals' });
    const recipeCard = await screen.findByTestId('0-recipe-card');
    expect(recipeCard).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('0-card-name');
    expect(recipeTitle).toBeInTheDocument();
    const recipeCategory = await screen.findByTestId('0-card-img');
    expect(recipeCategory).toBeInTheDocument();
    const buttonBeef = await screen.findByTestId('Beef-category-filter');
    expect(buttonBeef).toBeInTheDocument();
  });

  test('Verifica se todos os elementos estão na tela de drink.', async () => {
    const { user } = renderWithProvider(<App />, { route: '/drinks' });
    const recipeCard = await screen.findByTestId('0-recipe-card');
    expect(recipeCard).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('0-card-name');
    expect(recipeTitle).toBeInTheDocument();
    const recipeCategory = await screen.findByTestId('0-card-img');
    expect(recipeCategory).toBeInTheDocument();
    const buttonDrink = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(buttonDrink).toBeInTheDocument();
  });
});
