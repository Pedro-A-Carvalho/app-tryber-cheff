import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithProviderTotal from '../utils/renderWithProviderTotal';

test('Verifica se a página é renderizada corretamente', () => {
  renderWithProviderTotal(<App />, { route: '/profile' });

  const titleElement = screen.getByTestId('page-title');
  expect(titleElement).toBeInTheDocument();

  const doneElement = screen.getByTestId('profile-done-btn');
  expect(doneElement).toBeInTheDocument();

  const faveElement = screen.getByTestId('profile-favorite-btn');
  expect(faveElement).toBeInTheDocument();

  const logoutButton = screen.getByTestId('profile-logout-btn');
  expect(logoutButton).toBeInTheDocument();
});

test('Testa botão de receitas feitas', async () => {
  renderWithProviderTotal(<App />, { route: '/profile' });

  const doneBtn = screen.getByTestId('profile-done-btn');
  const pageTitle = screen.getByText('Done Recipes');
  fireEvent.click(doneBtn);

  await waitFor(() => {
    expect(pageTitle).toBeInTheDocument();
  });
});

// test('Testa botão de receitas favoritas', async () => {
//   renderWithProviderTotal(<App />, { route: '/profile' });

//   const faveBtn = screen.getByTestId('favorite-done-btn');
//   const pageTitle2 = screen.getByText('Favorite Recipes');
//   fireEvent.click(faveBtn);

//   await waitFor(() => {
//     expect(pageTitle2).toBeInTheDocument();
//   });
// });

test('Verifica se o logout é feito corretamente', async () => {
  renderWithProviderTotal(<App />, { route: '/profile' });

  const logoutButton = screen.getByTestId('profile-logout-btn');
  fireEvent.click(logoutButton);

  await waitFor(() => {
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });

  expect(localStorage.length).toBe(0);
});

test('exibe o e-mail salvo na localStorage', () => {
  const mockUser = { email: 'email@example.com' };
  const storedUser = JSON.stringify(mockUser);
  localStorage.setItem('user', storedUser);

  renderWithProviderTotal(<App />, { route: '/profile' });

  const emailElement = screen.getByTestId('profile-email');
  expect(emailElement).toBeInTheDocument();
  expect(emailElement).toHaveTextContent(mockUser.email);
});
