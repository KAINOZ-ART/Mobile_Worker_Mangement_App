import React, { useState } from 'react';
import { View, Button, StyleSheet, Switch } from 'react-native';
import TextInputField from '../components/TextInputField';
import { recordAttendance } from '../services/database';

const RecordAttendanceScreen = () => {
  const [attendance, setAttendance] = useState({
    attendanceID: '',
    workerID: '',
    date: '',
    status:false,// true for present, false for absent'Absent',    
    checkInTime: '',
    checkOutTime: '',
  });

  const handleRecordAttendance = () => {
    recordAttendance(attendance);
    setAttendance({ attendanceID: '', workerID: '', date: '', status: false, checkInTime: '', checkOutTime: '' });
  };

  return (
    <View style={styles.container}>
       <TextInputField
        placeholder="Attendance ID"
        value={attendance.attendanceID}
        onChangeText={(text) => setAttendance({ ...attendance, attendanceID: text })}
      /> 
      <TextInputField
        placeholder="Worker ID"
        value={attendance.workerID}
        onChangeText={(text) => setAttendance({ ...attendance, workerID: text })}
      />
      <TextInputField
        placeholder="Date (YYYY-MM-DD)"
        value={attendance.date}
        onChangeText={(text) => setAttendance({ ...attendance, date: text })}
      />
      <TextInputField
        placeholder="Check In Time (HH:MM)"
        value={attendance.checkInTime}
        onChangeText={(text) => setAttendance({ ...attendance, checkInTime: text })}
      />
      <TextInputField
        placeholder="Check Out Time (HH:MM)"
        value={attendance.checkOutTime}
        onChangeText={(text) => setAttendance({ ...attendance, checkOutTime: text })}
      />
      <Switch
        value={attendance.status}
        onValueChange={(value) => setAttendance({ ...attendance, status: value })}
      />
      <Button title="Record Attendance" onPress={handleRecordAttendance} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
});

export default RecordAttendanceScreen;
