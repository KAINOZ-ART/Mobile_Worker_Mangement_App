import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import TextInputField from '../components/TextInputField';
import Button from '../components/Button';
import { addWorker } from '../services/database';

const AddWorkerScreen = () => {
  const [worker, setWorker] = useState({
    WorkerID: '',
    name: '',
    phoneNumber: '',
    dateofbirth: '',
    email: '',
    hourlyRate: '',
    location: '',
    profile: '',
    experience: '',
    
  });

  const handleAddWorker = () => {
    if (!worker.WorkerID ||!worker.name || !worker.dateofbirth ||!worker.phoneNumber || !worker.hourlyRate || !worker.location|| !worker.profile|| !worker.experience|| !worker.email) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    addWorker(worker);
    Alert.alert("Success", "Worker added successfully.");
    setWorker({ name: '', phoneNumber: '', email: '', hourlyRate: '' });
  };

  return (
    <View style={styles.container}>
        <TextInputField
        placeholder="WorkerID"
        value={worker.WorkerID}
        onChangeText={(text) => setWorker({ ...worker, WorkerID: text })}
      />
      <TextInputField
        placeholder="Name"
        value={worker.name}
        onChangeText={(text) => setWorker({ ...worker, name: text })}
      />
      <TextInputField
        placeholder="dateofbirth (YYYY-MM-DD)"
        value={worker.dateofbirth}
        onChangeText={(text) => setWorker({ ...worker, dateofbirth: text })}
      />
      <TextInputField
        placeholder="Phone Number"
        value={worker.phoneNumber}
        keyboardType="phone-pad"
        onChangeText={(text) => setWorker({ ...worker, phoneNumber: text })}
      />
      <TextInputField
        placeholder="Email"
        value={worker.email}
        keyboardType="email-address"
        onChangeText={(text) => setWorker({ ...worker, email: text })}
      />
      <TextInputField
        placeholder="Hourly Rate"
        value={worker.hourlyRate}
        keyboardType="numeric"
        onChangeText={(text) => setWorker({ ...worker, hourlyRate: text })}
      />
      <TextInputField
      placeholder="location"
      value={worker.location}
      onChangeText={(text) => setWorker({ ...worker, location: text })}
      />
      <TextInputField
        placeholder="profile"
        value={worker.profile}
        onChangeText={(text) => setWorker({ ...worker, profile: text })}
        />
      <TextInputField
        placeholder="experience"
        value={worker.experience}
        onChangeText={(text) => setWorker({ ...worker, experience: text })}
     />
      <Button title="Add Worker" onPress={handleAddWorker} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default AddWorkerScreen;