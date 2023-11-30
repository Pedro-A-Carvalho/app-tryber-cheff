import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithProviderTotal from '../utils/renderWithProviderTotal';

describe('Testa o componente Header.', () => {
  test('Verifica se todos os elementos estão na tela.', () => {
    renderWithProviderTotal(<App />, { route: '/meals' });

    const btnProfile = screen.getByTestId('profile-top-btn');
    expect(btnProfile).toBeInTheDocument();

    const btnSearch = screen.getByTestId('search-top-btn');
    expect(btnSearch).toBeInTheDocument();

    const titleMeals = screen.getByText('Meals');
    expect(titleMeals).toBeInTheDocument();
  });

  test('Verifica se ao clicar no botão Search o input de busca é renderizado', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/meals' });

    const btnSearch = screen.getByTestId('search-top-btn');
    await user.click(btnSearch);
    const inputSearch = await screen.findByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
  });

  test('Verifica se ao clicar no botão de perfil é direcionado para o path /profile.', async () => {
    const { user } = renderWithProviderTotal(<App />, { route: '/meals' });

    const btnProfile = screen.getByTestId('profile-top-btn');
    await user.click(btnProfile);

    expect(window.location.pathname).toBe('/profile');
  });
});
