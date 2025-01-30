import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import TextInputField from '../components/TextInputField';
import Button from '../components/Button';
import { sendSMS } from '../services/sms';

const SendPaymentReportScreen = () => {
  const [workerPhone, setWorkerPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSendSMS = () => {
    if (workerPhone && message) {
      sendSMS(workerPhone, message);
      Alert.alert('Success', 'SMS sent successfully!');
      setWorkerPhone('');
      setMessage('');
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <TextInputField
        placeholder="Worker Phone Number"
        keyboardType="phone-pad"
        value={workerPhone}
        onChangeText={setWorkerPhone}
      />
      <TextInputField
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send SMS" onPress={handleSendSMS} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default SendPaymentReportScreen;
