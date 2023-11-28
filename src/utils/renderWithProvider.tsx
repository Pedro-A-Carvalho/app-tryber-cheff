import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RecipeProvider from '../context/RecipeProvider';

const renderWithProvider = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, '', route);
  return {
    user: userEvent.setup(),
    ...render(
      <RecipeProvider>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </RecipeProvider>,
    ),
  };
};

export default renderWithProvider;
