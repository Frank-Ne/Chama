import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function DepositScreen({ route }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState(0);

  const adjustAmount = (step) => {
    setAmount((prev) => Math.max(0, prev + step));
  };

  const handleDeposit = () => {
    Alert.alert(
      "Confirm Deposit",
      `Do you wish to deposit ${amount} to Jamii Chama?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => Alert.alert("Success", "Deposit Successful!")
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Deposit to Jamii Chama</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter Amount"
        value={amount.toString()}
        onChangeText={(text) => setAmount(Number(text))}
      />

      <View style={styles.adjustButtons}>
        <Button title="+10" color="#F85A40" onPress={() => adjustAmount(10)} />
        <Button title="-10" color="#F85A40" onPress={() => adjustAmount(-10)} />
      </View>

      <View style={{ marginTop: 20 }}>
        <Button title="Deposit" color="#F85A40" onPress={handleDeposit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1
  },
  header: {
    fontSize: 22,
    color: '#F85A40',
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  adjustButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  }
});
