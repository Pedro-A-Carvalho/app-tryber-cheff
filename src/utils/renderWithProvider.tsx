import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const renderWithProvider = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, '', route);
  return {
    user: userEvent.setup(),
    ...render(
      <BrowserRouter>
        {ui}
      </BrowserRouter>,
    ),
  };
};

export default renderWithProvider;
