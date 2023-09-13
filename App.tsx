import {View, Text} from 'react-native';
import React from 'react';
import AppNavigator from './src/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {StripeProvider} from '@stripe/stripe-react-native';

const App = () => {
  return (
    <Provider store={store}> 
      <StripeProvider
        publishableKey="pk_test_51NaaV7GRYWUoiN5eL3EQfJfaK5DeB3QBgCmMAeVJE1sJOU2w7cEGlyEdwHLdpaoDL9sQ1O4pNkYy7B6tEgN5uKRQ00g22BYGbh"
        merchantIdentifier="merchant.identifier"
        urlScheme="your-url-scheme">
        <AppNavigator />
      </StripeProvider>
    </Provider>
  );
};

export default App;
