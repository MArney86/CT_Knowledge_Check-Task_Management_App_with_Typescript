import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import Auth0ProviderWithNavigate from './Auth0Provider.tsx'

const root = ReactDom.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Auth0ProviderWithNavigate>
      <App />
    </Auth0ProviderWithNavigate>
  </BrowserRouter>
)
