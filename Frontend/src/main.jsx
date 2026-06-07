import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import store from '@app/store';
import { AuthProvider } from '@shared/context/AuthContext';
import { ToastProvider } from '@shared/context/ToastContext';
import './modules/website/i18n';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Redux Provider must be outermost so AuthProvider can call useDispatch */}
    <Provider store={store}>
      <AuthProvider>
        <ToastProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />
        </ToastProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
