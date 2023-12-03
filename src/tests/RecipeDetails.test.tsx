import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import renderWithProviderTotal from '../utils/renderWithProviderTotal';
import mockMeals from '../../cypress/mocks/fetch';

afterEach(() => vi.clearAllMocks());
beforeEach(() => { global.fetch = vi.fn().mockImplementation(mockMeals); });

describe('Testa a tela de detalhes.', () => {
  test('Verifica se os elementos estão na tela.', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/meals' });

    const cardRecipe = await screen.findByTestId('0-card-name');
    expect(cardRecipe).toBeInTheDocument();

    await user.click(cardRecipe);

    const imgRecipe = screen.getByTestId('recipe-photo');
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
  });
});
