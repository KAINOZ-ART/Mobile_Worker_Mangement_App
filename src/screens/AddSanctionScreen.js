import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TextInputField from '../components/TextInputField';
import Button from '../components/Button';
import { addSanction } from '../services/database';

const AddSanctionScreen = () => {
  const [sanction, setSanction] = useState({
    sanctionID: '',
    workerID: '',
    dateIssued: '',
    reason: '',
    penaltyAmount: '',
    nature: 'Minor',
  });

  const handleAddSanction = () => {
    if (sanction.workerID && sanction.workerID && sanction.dateIssued && sanction.reason && sanction.penaltyAmount) {
      addSanction(sanction);
      setSanction({ sanctionID: '', workerID: '', dateIssued: '', reason: '', penaltyAmount: '', nature: 'Minor' });
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
        <TextInputField
        placeholder="sanctionID"
        value={sanction.sanctionID}
        onChangeText={(text) => setSanction({ ...sanction, sanctionID: text })}
      />
      <TextInputField
        placeholder="Worker ID"
        value={sanction.workerID}
        onChangeText={(text) => setSanction({ ...sanction, workerID: text })}
      />
      <TextInputField
        placeholder="Date Issued (YYYY-MM-DD)"
        value={sanction.dateIssued}
        onChangeText={(text) => setSanction({ ...sanction, dateIssued: text })}
      />
      <TextInputField
        placeholder="Reason"
        value={sanction.reason}
        onChangeText={(text) => setSanction({ ...sanction, reason: text })}
      />
      <TextInputField
        placeholder="Penalty Amount"
        keyboardType="numeric"
        value={sanction.penaltyAmount}
        onChangeText={(text) => setSanction({ ...sanction, penaltyAmount: text })}
      />
      <Text style={styles.label}>Sanction Nature:</Text>
      <View style={styles.switchRow}>
        <Button title="Minor" onPress={() => setSanction({ ...sanction, nature: 'Minor' })} />
        <Button title="Major" onPress={() => setSanction({ ...sanction, nature: 'Major' })} />
      </View>
      <Button title="Add Sanction" onPress={handleAddSanction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default AddSanctionScreen;
