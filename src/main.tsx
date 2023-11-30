import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import TotalProvider from './utils/TotalProvider';


ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <TotalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TotalProvider>,
  );
