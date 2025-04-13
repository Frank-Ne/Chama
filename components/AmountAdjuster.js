import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function AmountAdjuster({ amount, setAmount }) {
  const increase = () => setAmount(amount + 10);
  const decrease = () => {
    if (amount > 0) setAmount(amount - 10);
  };

  return (
    <View style={styles.container}>
      <Button title="-" onPress={decrease} />
      <Text style={styles.amountText}>KES {amount}</Text>
      <Button title="+" onPress={increase} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  amountText: {
    fontSize: 20,
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
});
