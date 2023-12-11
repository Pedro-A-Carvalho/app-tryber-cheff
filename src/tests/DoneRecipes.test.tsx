import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithProviderTotal from '../utils/renderWithProviderTotal';

const route = '/done-recipes';
const storage = [{ id: '52977', nationality: 'Turkish', name: 'Corba', category: 'Side', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg', tags: ['Soup'], alcoholicOrNot: '', type: 'meal', doneDate: '2023-12-09T02:26:21.976Z' },
  { id: '17222',
    nationality: '',
    name: 'A1',
    category: 'Cocktail',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    tags: [],
    alcoholicOrNot: 'Alcoholic',
    type: 'drink',
    doneDate: '2023-12-09T02:26:33.519Z' }];

describe('Testa tela de Receitas feitas', () => {
  test('Verifica a existência de botões', () => {
    renderWithProviderTotal(<App />, { route });
    const allButton = screen.getByTestId('filter-by-all-btn');
    expect(allButton).toBeInTheDocument();
    const mealsButton = screen.getByTestId('filter-by-meal-btn');
    expect(mealsButton).toBeInTheDocument();
    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    expect(drinkButton).toBeInTheDocument();
  });
  test('Verifica funcionamento da página e botão Drinks', async () => {
    const doneRecipes = JSON.stringify(storage);
    localStorage.setItem('doneRecipes', doneRecipes);
    renderWithProviderTotal(<App />, { route });

    const name = screen.getByText('Corba');
    const img = screen.getByTestId('0-horizontal-image');
    const button = screen.getByTestId('0-horizontal-share-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');

    expect(name).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(drinkButton);
    expect(name).not.toBeInTheDocument();
  });
  test('Verifica botão Meals', async () => {
    const doneRecipes = JSON.stringify(storage);
    localStorage.setItem('doneRecipes', doneRecipes);
    renderWithProviderTotal(<App />, { route });

    const alcoholicOrNot = screen.getByText('Alcoholic');
    const mealsButton = screen.getByTestId('filter-by-meal-btn');
    const user = userEvent.setup();
    await user.click(mealsButton);
    expect(alcoholicOrNot).not.toBeInTheDocument();
  });
  test('Verifica botão All', async () => {
    const doneRecipes = JSON.stringify(storage);
    localStorage.setItem('doneRecipes', doneRecipes);
    renderWithProviderTotal(<App />, { route });
    const allButton = screen.getByTestId('filter-by-all-btn');
    const alcoholicOrNot = screen.getByText('Alcoholic');
    const name = screen.getByText('Corba');
    const user = userEvent.setup();
    await user.click(allButton);
    expect(alcoholicOrNot).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });
  test('Verifica Share Button', async () => {
    const doneRecipes = JSON.stringify([{ id: '52977', nationality: 'Turkish', name: 'Corba', category: 'Side', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg', tags: ['Soup'], alcoholicOrNot: '', type: 'meal', doneDate: '2023-12-09T02:26:21.976Z' }, { id: '17222', nationality: '', name: 'A1', category: 'Cocktail', image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg', tags: [], alcoholicOrNot: 'Alcoholic', type: 'drink', doneDate: '2023-12-09T02:26:33.519Z' }]);
    localStorage.setItem('doneRecipes', doneRecipes);
    renderWithProviderTotal(<App />, { route });

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    const user = userEvent.setup();
    await user.click(shareButton);
    const linkCopied = screen.getByText('Link copied!');
    expect(linkCopied).toBeInTheDocument();
  });
});
