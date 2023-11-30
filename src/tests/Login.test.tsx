import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithProviderTotal from '../utils/renderWithProviderTotal';

describe('Testa tela de Login', () => {
  test('Verifica a existência de inputs', () => {
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    const enterButton = screen.getByTestId('login-submit-btn');
    expect(enterButton).toBeInTheDocument();
  });
  test('Verifica habilitação do botão', async () => {
    renderWithProviderTotal(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterButton = screen.getByTestId('login-submit-btn');
    const user = userEvent.setup();
    await act(async () => {
      await user.type(emailInput, 'aisha@teste.com');
      await user.type(passwordInput, 'senha123');
      await user.click(enterButton);
    });
    expect(enterButton).toBeEnabled();
  });
});
