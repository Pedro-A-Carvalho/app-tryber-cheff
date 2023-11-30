import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../App';
import newFetch from '../../cypress/mocks/fetch';
import renderWithProviderTotal from '../utils/renderWithProviderTotal';

afterEach(() => vi.clearAllMocks());

beforeEach(() => { global.fetch = vi.fn().mockImplementation(newFetch); });
//   .mockResolvedValueOnce({
const beefFilter = 'Beef-category-filter';
const drinkFilter = 'Ordinary Drink-category-filter';
const firstElementBeef = 'Beef and Mustard Pie';

describe('Testa o componente Recipes.', () => {
  test('Verifica se todos os elementos estão na tela de meals.', async () => {
    renderWithProviderTotal(<App />, { route: '/meals' });
    const recipeCard = await screen.findByTestId('0-recipe-card');
    expect(recipeCard).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('0-card-name');
    expect(recipeTitle).toBeInTheDocument();
    const recipeCategory = await screen.findByTestId('0-card-img');
    expect(recipeCategory).toBeInTheDocument();
    const buttonBeef = await screen.findByTestId(beefFilter);
    expect(buttonBeef).toBeInTheDocument();
  });

  test('Verifica se todos os elementos estão na tela de drink.', async () => {
    renderWithProviderTotal(<App />, { route: '/drinks' });
    const recipeCard = await screen.findByTestId('0-recipe-card');
    expect(recipeCard).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('0-card-name');
    expect(recipeTitle).toBeInTheDocument();
    const recipeCategory = await screen.findByTestId('0-card-img');
    expect(recipeCategory).toBeInTheDocument();
    const buttonDrink = await screen.findByTestId(drinkFilter);
    expect(buttonDrink).toBeInTheDocument();
  });

  // test('Verifica se todos os elementos estão na tela de meals com filtro.', async () => {
  //   const { user } = renderWithProviderTotal(<App />, { route: '/meals' });
  //   const buttonBeef = await screen.findByTestId(beefFilter);
  //   user.click(buttonBeef);
  //   const recipeCard = await screen.findByText(firstElementBeef);
  //   expect(recipeCard).toBeInTheDocument();
  // });

  test('Verifica se ao clicar no mesmo filtro volta ao padrao.', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/meals' });
    const buttonBeef = await screen.findByTestId(beefFilter);
    user.click(buttonBeef);
    const recipeCard = await screen.findByText(firstElementBeef);
    expect(recipeCard).toBeInTheDocument();
    user.click(buttonBeef);
    const recipeCard2 = await screen.findByText('Corba');
    expect(recipeCard2).toBeInTheDocument();
  });

  // test('Verifica se todos os elementos estão na tela de drinks com filtro.', async () => {
  //   const { user } = renderWithProviderTotal(<App />, { route: '/drinks' });
  //   const buttonDrink = await screen.findByTestId(drinkFilter);
  //   user.click(buttonDrink);
  //   const recipeCard = await screen.findByText('A1');
  //   expect(recipeCard).toBeInTheDocument();
  // });

  test('Verifica se ao clicar no mesmo filtro volta ao padrao.', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/drinks' });
    const buttonDrink = await screen.findByTestId(drinkFilter);
    user.click(buttonDrink);
    const recipeCard = await screen.findByText('A1');
    expect(recipeCard).toBeInTheDocument();
    user.click(buttonDrink);
    const recipeCard2 = await screen.findByText('GG');
    expect(recipeCard2).toBeInTheDocument();
  });

  test('Verifica se ao clicar no filtro All volta ao padrao.', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/drinks' });
    const buttonDrink = await screen.findByTestId(drinkFilter);
    user.click(buttonDrink);
    const recipeCard = await screen.findByText('A1');
    expect(recipeCard).toBeInTheDocument();
    const buttonAll = await screen.findByTestId('All-category-filter');
    user.click(buttonAll);
    const recipeCard2 = await screen.findByText('GG');
    expect(recipeCard2).toBeInTheDocument();
  });

  test('Verifica se dois filtros de drinks seguidos funcionam.', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/drinks' });
    const buttonDrink = await screen.findByTestId(drinkFilter);
    user.click(buttonDrink);
    const recipeCard = await screen.findByText('A1');
    expect(recipeCard).toBeInTheDocument();
    const buttonCocktail = await screen.findByTestId('Cocktail-category-filter');
    user.click(buttonCocktail);
    const recipeCard2 = await screen.findByText('155 Belmont');
    expect(recipeCard2).toBeInTheDocument();
  });

  test('Verifica se o botao all funciona.', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/meals' });
    const recipeCard1 = await screen.findByText('Corba');
    expect(recipeCard1).toBeInTheDocument();
    const buttonBeef = await screen.findByTestId(beefFilter);
    user.click(buttonBeef);
    const recipeCard2 = await screen.findByText(firstElementBeef);
    expect(recipeCard2).toBeInTheDocument();
    const buttonAll = await screen.findByTestId('All-category-filter');
    user.click(buttonAll);
    const recipeCard3 = await screen.findByText('Corba');
    expect(recipeCard3).toBeInTheDocument();
  });
});
