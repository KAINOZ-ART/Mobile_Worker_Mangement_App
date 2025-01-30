import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TextInputField from '../components/TextInputField';
import Button from '../components/Button';
import { generatePaymentReport } from '../services/database';

const GeneratePaymentReportScreen = () => {
  const[reportID, setReportID] = useState('');
  const [workerID, setWorkerID] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [grossPay, setGrossPay] = useState('');
  const [totalDeductions, setTotalDeductions] = useState('');
  const [netPay, setNetPay] = useState('');
  const [report, setReport] = useState(null);

  const handleGeneratePaymentReport = () => {
    if (reportID && workerID && dateRange && grossPay && totalDeductions && netPay) {
      generatePaymentReport(reportIDworkerID, dateRange, grossPay, totalDeductions, netPay, setReport);
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
       <TextInputField
        placeholder="reportID"
        value={reportID}
        onChangeText={setReportID}
      />
      <TextInputField
        placeholder="Worker ID"
        value={workerID}
        onChangeText={setWorkerID}
      />
      <TextInputField
        placeholder="Date Range (e.g., 2024-03-04 to 2024-03-10)"
        value={dateRange}
        onChangeText={setDateRange}
      />
      <TextInputField
        placeholder="Gross Pay"
        value={grossPay}
        onChangeText={setGrossPay}
        keyboardType="numeric"
      />
      <TextInputField
        placeholder="Total Deductions"
        value={totalDeductions}
        onChangeText={setTotalDeductions}
        keyboardType="numeric"
      />
      <TextInputField
        placeholder="Net Pay"
        value={netPay}
        onChangeText={setNetPay}
        keyboardType="numeric"
      />
      <Button title="Generate Payment Report" onPress={handleGeneratePaymentReport} />
      {report && (
        <View style={styles.reportContainer}>
        <Text style={styles.reportText}>Report ID: {report.reportID}</Text>
        <Text style={styles.reportText}>Date Range: {report.dateRange}</Text>
        <Text style={styles.reportText}>Worker: {report.name}</Text>
        <Text style={styles.reportText}>Gross Pay: {report.grossPay}</Text>
        <Text style={styles.reportText}>Total Deductions: {report.totalDeductions}</Text>
        <Text style={styles.reportText}>Net Pay: {report.netPay}</Text>
        <Text style={styles.reportText}>Sanctions: {report.totalDeductions}</Text>
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  reportContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  reportText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default GeneratePaymentReportScreen;
