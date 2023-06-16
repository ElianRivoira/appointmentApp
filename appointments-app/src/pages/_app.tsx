import '@/styles/globals.css';
import React from 'react';
import { Provider } from 'react-redux';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { hasCookie } from 'cookies-next';

import { store } from '../store/index';
import Navbar from '@/components/Navbar';

const App = ({ Component, pageProps }: any) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Hydrate state={pageProps.dehydratedState}> */}
        <Provider store={store}>
          <Navbar />
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </Provider>
      {/* </Hydrate> */}
    </QueryClientProvider>
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
