import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../App';
import newFetch from '../../cypress/mocks/fetch';
import renderWithProviderTotal from '../utils/renderWithProviderTotal';

afterEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

beforeEach(() => { global.fetch = vi.fn().mockImplementation(newFetch); });

const mealsRoute = '/meals/52977/in-progress';
const drinksRoute = '/drinks/178319/in-progress';
const firstIngredient = 'penne rigate 1 pound';
const favoriteButton = 'favorite-btn';

describe('Testa o componente RecipeInProgress', () => {
  test('Verifica se todos os elementos estão na tela de meals.', async () => {
    renderWithProviderTotal(<App />, { route: mealsRoute });
    const recipeTitle = await screen.findByText('Spicy Arrabiata Penne');
    expect(recipeTitle).toBeInTheDocument();
    const ingredient = await screen.findByText(firstIngredient);
    expect(ingredient).toBeInTheDocument();
    const recipeImg = await screen.findByAltText('recipe');
    expect(recipeImg).toBeInTheDocument();
    const instructions = await screen.findByText('Instructions');
    expect(instructions).toBeInTheDocument();
    const btnShare = await screen.findByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
    const btnFavorite = await screen.findByTestId(favoriteButton);
    expect(btnFavorite).toBeInTheDocument();
  });

  test('Verifica se todos os elementos estão na tela de drink.', async () => {
    renderWithProviderTotal(<App />, { route: drinksRoute });
    const recipeTitle = await screen.findByText('Aquamarine');
    expect(recipeTitle).toBeInTheDocument();
    const ingredient = await screen.findByText('Hpnotiq 2 oz');
    expect(ingredient).toBeInTheDocument();
    const recipeImg = await screen.findByAltText('recipe');
    expect(recipeImg).toBeInTheDocument();
    const instructions = await screen.findByText('Instructions');
    expect(instructions).toBeInTheDocument();
    const btnShare = await screen.findByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
  });

  test('Verifica se os elementos podem ser marcados e desmarcados na tela de meals.', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: mealsRoute });
    const ingredient = await screen.findByText(firstIngredient);
    expect(ingredient).toBeInTheDocument();
    const checkbox = await screen.findAllByRole('checkbox');
    expect(checkbox[0]).toBeInTheDocument();
    await user.click(checkbox[0]);
    expect(checkbox[0]).toBeChecked();
    await user.click(checkbox[0]);
    expect(checkbox[0]).not.toBeChecked();
  });

  test('Verifica se os elementos vem marcados se estiverem salvos no localStorage.', async () => {
    const recipesInProgress = JSON.stringify({
      meals: { 52977: ['penne rigate'] },
      cocktails: {},
    });
    localStorage.setItem('inProgressRecipes', recipesInProgress);

    renderWithProviderTotal(<App />, { route: mealsRoute });
    const ingredient = await screen.findByText(firstIngredient);
    expect(ingredient).toBeInTheDocument();
    const checkbox = await screen.findAllByRole('checkbox');
    expect(checkbox[0]).toBeInTheDocument();
    expect(checkbox[0]).toBeChecked();
  });

  test('Verifica a funcionalidade do botao de favoritar.', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: mealsRoute });
    const btnFavorite = await screen.findByTestId(favoriteButton);
    expect(btnFavorite).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();

    expect(btnFavorite).toHaveProperty('alt', 'FavoriteWhite');

    await user.click(btnFavorite);

    expect(btnFavorite).toHaveProperty('alt', 'FavoriteBlack');

    await user.click(btnFavorite);

    expect(btnFavorite).toHaveProperty('alt', 'FavoriteWhite');
  });

  test('Verifica se uma receita favoritada aparece corretamente', async () => {
    const favoriteRecipes = [
      {
        alcoholicOrNot: '',
        category: 'Vegetarian',
        id: '52977',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        name: 'Spicy Arrabiata Penne',
        nationality: 'Italian',
        type: 'meal',
      },
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    renderWithProviderTotal(<App />, { route: mealsRoute });

    const btnFavorite = await screen.findByTestId(favoriteButton);
    expect(btnFavorite).toHaveProperty('alt', 'FavoriteBlack');
  });

  test('Verifica se a receita de drink pode ser concluida', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: drinksRoute });
    const checkbox = await screen.findAllByRole('checkbox');
    const btnFinish = await screen.findByTestId('finish-recipe-btn');
    checkbox.forEach(async (item) => {
      await user.click(item);
    });

    expect(btnFinish).toBeInTheDocument();
    await user.click(btnFinish);
    const { pathname } = window.location;
    expect(pathname).toBe('/done-recipes');
  });

  test('Verifica se a receita de meal pode ser concluida', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: mealsRoute });
    const checkbox = await screen.findAllByRole('checkbox');
    const btnFinish = await screen.findByTestId('finish-recipe-btn');
    checkbox.forEach(async (item) => {
      await user.click(item);
    });

    expect(btnFinish).toBeInTheDocument();
    await user.click(btnFinish);
    const { pathname } = window.location;
    expect(pathname).toBe('/done-recipes');
  });
});
