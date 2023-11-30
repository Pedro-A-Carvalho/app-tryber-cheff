import { screen, act } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithProviderTotal from '../utils/renderWithProviderTotal';
import newFetch from '../../cypress/mocks/fetch';

const ingredienteRadio = 'ingredient-search-radio';
const nameRadio = 'name-search-radio';
const searchtopButton = 'search-top-btn';
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

  // test('Verifica habilitação do botão em ingredientes', async () => {
  //   const { user } = renderWithProviderTotal(<App />, { route: '/meals' });
  //   const showSearchButton = screen.getByTestId(searchtopButton);
  //   await user.click(showSearchButton);
  //   const searchInput = screen.getByTestId(searchtopButton);
  //   const ingredientSearchInput = screen.getByTestId(ingredienteRadio);
  //   await user.click(ingredientSearchInput);
  //   const searchButton = screen.getByTestId(execSearchButton);
  //   await act(async () => {
  //     await user.type(searchInput, 'Chicken');
  //     await user.click(searchButton);
  //   });
  //   expect(searchButton).toBeEnabled();
  // });

  test('Verifica habilitação do botão em name', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/meals' });
    const showSearchButton = screen.getByTestId(searchtopButton);
    await user.click(showSearchButton);
    const searchInput = screen.getByTestId(searchtopButton);
    const nameSearchInput = screen.getByTestId(nameRadio);
    await user.click(nameSearchInput);
    const searchButton = screen.getByTestId(execSearchButton);
    await act(async () => {
      await user.type(searchInput, 'Arrabiata');
      await user.click(searchButton);
    });
    expect(searchButton).toBeEnabled();
  });
  // test('Verifica habilitação do botão em ingredientes na rota Drinks', async () => {
  //   const { user } = renderWithProviderTotal(<App />, { route: '/drinks' });
  //   const showSearchButton = screen.getByTestId(searchtopButton);
  //   await user.click(showSearchButton);
  //   const searchInput = screen.getByTestId(searchtopButton);
  //   const ingredientSearchInput = screen.getByTestId(ingredienteRadio);
  //   await user.click(ingredientSearchInput);
  //   const searchButton = screen.getByTestId(execSearchButton);
  //   await act(async () => {
  //     await user.type(searchInput, 'Light rum');
  //     await user.click(searchButton);
  //   });
  //   expect(searchButton).toBeEnabled();
  // });

  test('Verifica habilitação do botão em name na rota Drinks', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/drinks' });
    const showSearchButton = screen.getByTestId(searchtopButton);
    await user.click(showSearchButton);
    const searchInput = screen.getByTestId(searchtopButton);
    const nameSearchInput = screen.getByTestId(nameRadio);
    await user.click(nameSearchInput);
    const searchButton = screen.getByTestId(execSearchButton);
    await act(async () => {
      await user.type(searchInput, 'Aquamarine');
      await user.click(searchButton);
    });
    expect(searchButton).toBeEnabled();
  });

  // test('Verifica se aparece a mensagem de alerta ', async () => {
  //   global.alert = vi.fn();
  //   const { user } = renderWithProviderTotal(<App />, { route: '/meals' });
  //   const showSearchButton = screen.getByTestId(searchtopButton);
  //   await user.click(showSearchButton);
  //   const searchInput = screen.getByTestId(searchtopButton);
  //   const nameSearchInput = screen.getByTestId(nameRadio);
  //   await user.click(nameSearchInput);
  //   const searchButton = screen.getByTestId(execSearchButton);
  //   await act(async () => {
  //     await user.type(searchInput, 'xablau');
  //     await user.click(searchButton);
  //   });
  //   expect(global.alert).toHaveBeenCalledTimes(1);
  // });
});
