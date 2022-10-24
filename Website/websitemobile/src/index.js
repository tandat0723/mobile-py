import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Container } from 'react-bootstrap';
import { legacy_createStore } from 'redux';
import MainUserReducer from './reducers/RootReducer';
import { Provider } from 'react-redux';

const store = legacy_createStore(MainUserReducer)

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Container>
        <App />
    </Container>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
