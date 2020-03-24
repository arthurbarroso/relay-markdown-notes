import React from 'react';
import { Router } from 'react-router-dom';
import GlobalStyle from './styles/global';
import Routes from './routes';
import history from './routes/history';
import 'draft-js/dist/Draft.css';

export default function App() {
  return (
    <>
      <Router history={history}>
        <GlobalStyle />
        <Routes />
      </Router>
    </>
  );
}
