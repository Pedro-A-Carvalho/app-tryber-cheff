import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../App';
import newFetch from '../../cypress/mocks/fetch';
import renderWithProviderTotal from '../utils/renderWithProviderTotal';

afterEach(() => vi.clearAllMocks());

beforeEach(() => { global.fetch = vi.fn().mockImplementation(newFetch); });

describe('Testa o componente RecipeInProgress', () => {
  test('Verifica se todos os elementos estão na tela de meals.', async () => {
    renderWithProviderTotal(<App />, { route: '/meals/52977/in-progress' });
    const recipeCard = await screen.findByTestId('0-recipe-card');
    expect(recipeCard).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('0-card-name');
    expect(recipeTitle).toBeInTheDocument();
    const recipeCategory = await screen.findByTestId('0-card-img');
    expect(recipeCategory).toBeInTheDocument();
  });

  test('Verifica se todos os elementos estão na tela de drink.', async () => {
    renderWithProviderTotal(<App />, { route: '/drinks/15997/in-progress' });
    const recipeCard = await screen.findByTestId('0-recipe-card');
    expect(recipeCard).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('0-card-name');
    expect(recipeTitle).toBeInTheDocument();
    const recipeCategory = await screen.findByTestId('0-card-img');
    expect(recipeCategory).toBeInTheDocument();
  });
});
