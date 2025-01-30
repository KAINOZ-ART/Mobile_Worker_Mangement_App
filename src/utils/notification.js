import { Alert } from 'react-native';

export const showAlert = (title, message) => {
  Alert.alert(title, message, [{ text: 'OK' }]);
};
import * as Notifications from 'expo-notifications';

export const sendPushNotification = async (expoPushToken, message) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Worker Management Update",
      body: message,
    },
    trigger: { seconds: 1 },
  });
};
