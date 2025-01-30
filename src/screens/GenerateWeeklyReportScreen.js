import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import TextInputField from '../components/TextInputField';
import Button from '../components/Button';
import { generateWeeklyReport } from '../services/database';

const GenerateWeeklyReportScreen = () => {
  const [workerID, setWorkerID] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [totalHours, setTotalHours] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  const [sanctions, setSanctions] = useState('');
  const [numberOfTasks, setNumberOfTasks] = useState('');
  const [report, setReport] = useState([]);

  const handleGenerateReport = () => {
    if (workerID && dateRange && totalHours && totalPayment && sanctions && numberOfTasks) {
      generateWeeklyReport(
        workerID,
        dateRange,
        totalHours,
        totalPayment,
        sanctions,
        numberOfTasks,
        setReport
      );
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <TextInputField
        placeholder="Worker ID"
        value={workerID}
        onChangeText={setWorkerID}
      />
      <TextInputField
        placeholder="Date Range (YYYY-MM-DD to YYYY-MM-DD)"
        value={dateRange}
        onChangeText={setDateRange}
      />
      <TextInputField
        placeholder="Total Hours"
        value={totalHours}
        onChangeText={setTotalHours}
        keyboardType="numeric"
      />
      <TextInputField
        placeholder="Total Payment"
        value={totalPayment}
        onChangeText={setTotalPayment}
        keyboardType="numeric"
      />
      <TextInputField
        placeholder="Sanctions"
        value={sanctions}
        onChangeText={setSanctions}
        keyboardType="numeric"
      />
      <TextInputField
        placeholder="Number of Tasks"
        value={numberOfTasks}
        onChangeText={setNumberOfTasks}
        keyboardType="numeric"
      />
      <Button title="Generate Weekly Report" onPress={handleGenerateReport} />
      <FlatList
        data={report}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.reportItem}>
            {item.daterange}: {`Total Hours: ${item.totalHours}, Total Payment: ${item.totalPayment}, Sanctions: ${item.sanctions}, Number of Tasks: ${item.numberOfTasks}`}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  reportItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default GenerateWeeklyReportScreen;
