import AsyncStorage from '@react-native-async-storage/async-storage';

// Store user data (simulate a backend)
export const storeUserData = async (email, password) => {
  try {
    await AsyncStorage.setItem('userEmail', email);
    await AsyncStorage.setItem('userPassword', password);
    console.log('User data stored successfully');
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

// Check login credentials
export const checkLoginCredentials = async (email, password) => {
  try {
    const storedEmail = await AsyncStorage.getItem('userEmail');
    const storedPassword = await AsyncStorage.getItem('userPassword');

    if (storedEmail === email && storedPassword === password) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking login credentials:', error);
    return false;
  }
};

