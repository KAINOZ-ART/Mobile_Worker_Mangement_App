import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import TextInputField from '../components/TextInputField';
import { addTask } from '../services/database';

const TaskSchedulingScreen = () => {
  const [task, setTask] = useState({
    taskID: '',
    workerID: '',
    description: '',
    dueDate: '',
    status: 'Assigned', //In progress, Completed, Assigned
  });

  const handleAddTask = () => {
    addTask(task);
    setTask({ taskID: '', workerID: '', description: '', dueDate: '', status: 'Assigned' });
  };

  return (
    <View style={styles.container}>
       <TextInputField
        placeholder="task ID"
        value={task.taskID}
        onChangeText={(text) => setTask({ ...task, taskID: text })}
      />
      <TextInputField
        placeholder="Worker ID"
        value={task.workerID}
        onChangeText={(text) => setTask({ ...task, workerID: text })}
      />
      <TextInputField
        placeholder="Description"
        value={task.description}
        onChangeText={(text) => setTask({ ...task, description: text })}
      />
      <TextInputField
        placeholder="Due Date (YYYY-MM-DD)"
        value={task.dueDate}
        onChangeText={(text) => setTask({ ...task, dueDate: text })}
      />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
});

export default TaskSchedulingScreen;
