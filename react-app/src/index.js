import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';
import { ModalProvider } from './context/Modal';
import App from './App';
import './index.css';

const store = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
          <div className='whole-page-container'>
            <App />
          </div>
      </ModalProvider>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
