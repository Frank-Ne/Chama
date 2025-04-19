import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function Withdraw() {
  const [amount, setAmount] = useState('');

  const handleWithdraw = () => {
    Alert.alert('Withdraw', `You have withdrawn KES ${amount}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Withdraw Amount (KES)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
      />
      <Button title="Withdraw" onPress={handleWithdraw} color="#F85A40" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
