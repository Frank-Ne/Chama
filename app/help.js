import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help Center</Text>
      <Button title="Frequently Asked Questions (FAQ)" onPress={() => alert('Coming soon!')} />
      <Button title="Contact Support" onPress={() => alert('Email: support@jamiichama.com')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  header: {
    fontSize: 24,
    color: '#F85A40',
    marginBottom: 20,
    textAlign: 'center',
  },
});
