import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RecipeProvider from './context/RecipeProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <RecipeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecipeProvider>,
  );
