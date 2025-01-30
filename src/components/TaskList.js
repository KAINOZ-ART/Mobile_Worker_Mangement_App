import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

const TaskList = ({ tasks, onPressTask }) => {
  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle} onPress={() => onPressTask(item)}>
        {item.description}
      </Text>
      <Text style={styles.taskDetails}>Due: {item.dueDate}</Text>
      <Text style={styles.taskDetails}>Status: {item.status}</Text>
    </View>
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.taskID.toString()}
      initialNumToRender={10} // Optimize initial render
      maxToRenderPerBatch={10} // Max items rendered at a time
      windowSize={5} // Reduce memory usage for large lists
    />
  );
};

const styles = StyleSheet.create({
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskDetails: {
    fontSize: 14,
    color: '#555',
  },
});

export default TaskList;
