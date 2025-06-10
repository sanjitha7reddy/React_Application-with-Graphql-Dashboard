import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import client from './apolloClient'; // import your setup
import { ApolloProvider } from '@apollo/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)