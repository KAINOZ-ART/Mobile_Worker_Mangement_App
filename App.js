import React from 'react';
import { AppContextProvider as AppProvider } from './context/AppContext';
import AppNavigator from './services/AppNavigator';

const App = () => {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
};

export default App;
