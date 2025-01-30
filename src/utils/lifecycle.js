import { AppState } from 'react-native';

export const checkAppState = () => {
  AppState.addEventListener('change', (nextAppState) => {
    if (nextAppState === 'background') {
      // Handle app going into background (e.g., saving state, syncing data)
      console.log('App moved to background');
    }
    if (nextAppState === 'active') {
      // Handle app coming to foreground (e.g., check network connection)
      console.log('App is now active');
    }
  });
};
