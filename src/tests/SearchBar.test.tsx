import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithProviderTotal from '../utils/renderWithProviderTotal';
import newFetch from '../../cypress/mocks/fetch';

const ingredienteRadio = 'ingredient-search-radio';
const nameRadio = 'name-search-radio';
const searchtopButton = 'search-top-btn';
const searchInput = 'search-input';
const execSearchButton = 'exec-search-btn';

afterEach(() => vi.clearAllMocks());

beforeEach(() => { global.fetch = vi.fn().mockImplementation(newFetch); });

describe('Testa Search Bar', () => {
  test('Verifica a existência de inputs', () => {
    renderWithProviderTotal(<App />, { route: '/meals' });
    const ingredientSearchInput = screen.getByTestId(ingredienteRadio);
    expect(ingredientSearchInput).toBeInTheDocument();
    const nameSearchRadioInput = screen.getByTestId(nameRadio);
    expect(nameSearchRadioInput).toBeInTheDocument();
    const firstLetterSearchRadioInput = screen.getByTestId('first-letter-search-radio');
    expect(firstLetterSearchRadioInput).toBeInTheDocument();
  });

  test('Verifica habilitação do botão em ingredientes', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/meals' });
    const showSearchButton = screen.getByTestId(searchtopButton);
    await user.click(showSearchButton);
    const search = screen.getByTestId(searchInput);
    const ingredientSearchInput = screen.getByTestId(ingredienteRadio);
    await user.click(ingredientSearchInput);
    const searchButton = screen.getByTestId(execSearchButton);

    await user.type(search, 'Chicken');
    await user.click(searchButton);

    expect(searchButton).toBeEnabled();
  });

  test('Verifica habilitação do botão em name', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/meals' });
    const showSearchButton = screen.getByTestId(searchtopButton);
    await user.click(showSearchButton);
    const search = screen.getByTestId(searchtopButton);
    const nameSearchInput = screen.getByTestId(nameRadio);
    await user.click(nameSearchInput);
    const searchButton = screen.getByTestId(execSearchButton);

    await user.type(search, 'Arrabiata');
    await user.click(searchButton);

    expect(searchButton).toBeEnabled();
  });
  test('Verifica habilitação do botão em ingredientes na rota Drinks', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/drinks' });
    const showSearchButton = screen.getByTestId(searchtopButton);
    await user.click(showSearchButton);
    const search = screen.getByTestId(searchInput);
    const ingredientSearchInput = screen.getByTestId(ingredienteRadio);
    await user.click(ingredientSearchInput);
    const searchButton = screen.getByTestId(execSearchButton);

    await user.type(search, 'Light rum');
    await user.click(searchButton);

    expect(searchButton).toBeEnabled();
  });

  test('Verifica habilitação do botão em name na rota Drinks', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/drinks' });
    const showSearchButton = screen.getByTestId(searchtopButton);
    await user.click(showSearchButton);
    const searchTop = screen.getByTestId(searchtopButton);
    const nameSearchInput = screen.getByTestId(nameRadio);
    await user.click(nameSearchInput);
    const searchButton = screen.getByTestId(execSearchButton);

    await user.type(searchTop, 'Aquamarine');
    await user.click(searchButton);

    expect(searchButton).toBeEnabled();
  });

  test('Verifica se aparece a mensagem de alerta ', async () => {
    global.alert = vi.fn();
    const { user } = renderWithProviderTotal(<App />, { route: '/meals' });
    const showSearchButton = screen.getByTestId(searchtopButton);
    await user.click(showSearchButton);
    const search = screen.getByTestId(searchInput);
    const nameSearchInput = screen.getByTestId(nameRadio);
    await user.click(nameSearchInput);
    const searchButton = screen.getByTestId(execSearchButton);

    await user.type(search, 'xablau');
    await user.click(searchButton);

    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  test('Verifica se o path name é chamado corretamente.', async () => {
    global.alert = vi.fn();
    const { user } = renderWithProviderTotal(<App />, { route: '/meals' });

    const cardCorda = await screen.findByRole('img', { name: /corba/i });
    expect(cardCorda).toBeInTheDocument();

    await user.click(cardCorda);
    expect(window.location.pathname).toBe('/meals/52977');
  });

  test('test.', async () => {
    const search = 'ab';

    global.alert = vi.fn();
    const { user } = renderWithProviderTotal(<App />, { route: '/meals' });

    const btnViewSearch = screen.getByTestId('search-top-btn');
    expect(btnViewSearch).toBeInTheDocument();
    const radioBtn = screen.getByTestId('first-letter-search-radio');
    expect(radioBtn).toBeInTheDocument();

    await user.click(btnViewSearch);

    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();

    const btnSearch = screen.getByTestId('exec-search-btn');
    expect(btnSearch).toBeInTheDocument();

    await user.click(radioBtn);
    await user.type(inputSearch, search);
    await user.click(btnSearch);

    expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
});
