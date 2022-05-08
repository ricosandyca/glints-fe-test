import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';

import App from '~/App';

if ('serviceWorker' in navigator) registerSW();

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
