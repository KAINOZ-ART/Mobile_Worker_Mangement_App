import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';

const WorkerList = ({ workers, searchQuery }) => {
  const filteredWorkers = workers.filter((worker) =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Workers"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredWorkers}
        keyExtractor={(item) => item.workerID.toString()}
        renderItem={({ item }) => (
          <View style={styles.workerItem}>
            <Text style={styles.workerName}>{item.name}</Text>
            <Text style={styles.workerDetails}>Phone: {item.phoneNumber}</Text>
            <Text style={styles.workerDetails}>Email: {item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  searchBar: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  workerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  workerName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  workerDetails: {
    fontSize: 14,
    color: '#555',
  },
});

export default WorkerList;
