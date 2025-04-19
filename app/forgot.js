import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../firebase/firebaseConfig';
import {
  EmailAuthProvider,
  updatePassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handlePasswordReset = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('⚠️ Password Mismatch', 'New passwords do not match.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, oldPassword);
      const user = userCredential.user;

      const credential = EmailAuthProvider.credential(email, oldPassword);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);
      Alert.alert('✅ Success', 'Password changed successfully. Please login.', [
        { text: 'OK', onPress: () => router.replace('/login') },
      ]);
    } catch (error) {
      console.error("Password reset failed:", error.message);
      Alert.alert('❌ Error', 'Password reset failed. Please check your credentials and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>

      <TextInput
        placeholder="Enter your Email (User ID)"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter Old Password"
        value={oldPassword}
        onChangeText={setOldPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Enter New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/login')}>
        <Text style={styles.backText}>← Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: {
    fontSize: 24,
    color: '#F85A40',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#F85A40',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#F85A40',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  backText: {
    color: '#F85A40',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
