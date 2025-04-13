import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ForgotPassword() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userID, setUserID] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handlePasswordChange = () => {
    if (newPass !== confirmPass) {
      Alert.alert('❌ Error', 'Passwords do not match.');
      return;
    }

    Alert.alert('✅ Success', 'Password changed successfully.', [
      { text: 'Go to Login', onPress: () => router.replace('/login') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>

      <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.input} />
      <TextInput placeholder="User ID" value={userID} onChangeText={setUserID} style={styles.input} />
      <TextInput placeholder="New Password" secureTextEntry value={newPass} onChangeText={setNewPass} style={styles.input} />
      <TextInput placeholder="Re-enter Password" secureTextEntry value={confirmPass} onChangeText={setConfirmPass} style={styles.input} />

      <Button title="Confirm" color="#F85A40" onPress={handlePasswordChange} />

      {/* Back to Login button */}
      <TouchableOpacity onPress={() => router.replace('/login')}>
        <Text style={styles.backToLogin}>← Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', color: '#F85A40' },
  input: {
    borderColor: '#F85A40',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  backToLogin: {
    marginTop: 20,
    color: '#F85A40',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
