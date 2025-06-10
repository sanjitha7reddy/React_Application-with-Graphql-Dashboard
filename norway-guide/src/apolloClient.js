import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';//to modify headers before a request is sent
import { onError } from '@apollo/client/link/error';//This helps us catcj=hing error->graphql req

// HTTP Link
const httpLink = createHttpLink({
  uri: 'https://api-qa.seamasterai.com/graphql',
});

// Auth Link - adds JWT token to every request(basically letting us know who the user is)
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt_token');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',//Helps the server know we are sending json data
    }
  };
});

// Error Link - handles GraphQL and network errors
//this logs all the errors to our console log -easy debugging
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    
    // token might be expired
    if (networkError.statusCode === 401) {
      console.warn('Token expired or unauthorized, clearing local storage');
      localStorage.removeItem('jwt_token');
     
      window.location.href = '/login';
    }
  }
});

// Create Apollo Client
const client = new ApolloClient({
  link: from([
    errorLink,
    authLink.concat(httpLink)//Adds token,then sends the req to server
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',//use cache if present,also make network callto getfresh data
    },
  },
});

export default client;