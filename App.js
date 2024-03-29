/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor } from './src/store';
import 'react-native-gesture-handler';
import AuthLoading from './src/Navigation';


const App= () => {
  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
     <AuthLoading  />
      
    </PersistGate>
    </Provider>
  );
};

export default App;




