import '@/styles/globals.css';
import '@/styles/calendar.module.css';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/index';

const App = ({ Component, pageProps }: any) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;

// We define a MyApp component that extends the App component from the next/app library.
// The MyApp component is a class component that implements a render method and a static async getInitialProps method.

// The getInitialProps method is used to fetch data on the server before rendering the page, and it receives a ctx argument
// that contains information about the current request. If a component defines a getInitialProps method, it will be called by
// Next.js before rendering the page.

// The render method uses the Provider component from the react-redux library to provide the store to the components in the application.

// Finally, we export a function that returns an instance of the MyApp component. This function takes the props argument that
// is passed to the App component and spreads it into the MyApp component. It also sets the store property of the MyApp component
// to the result of calling the configureAppStore function.
