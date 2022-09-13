import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { extendTheme, ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
const colors = {
  primary: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  secondary:{
    900: '#e9c46a',
    800: '#f4ca7d',
    700: '#f9d7a2',
  }
}

const theme = extendTheme({ colors })

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
