// app/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const router = useRouter();
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, userID, password);
      console.log("Login successful");

      if (password === '1234') {
        // Default password — redirect to Forgot Password
        Alert.alert('⚠️ Change Your Password', 'You are using the default password. Please update it.', [
          { text: 'Update Password', onPress: () => router.replace('/forgot') },
        ]);
      } else {
        // Password changed — go to Dashboard
        Alert.alert('✅ Login Successful', 'Welcome to Jamii Chama!', [
          { text: 'Proceed', onPress: () => router.replace('/dashboard') },
        ]);
      }

    } catch (error) {
      console.error("Login failed", error.message);
      Alert.alert('❌ Wrong Credentials', 'Please re-enter your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Jamii Chama</Text>

      <TextInput
        placeholder="Enter User ID"
        value={userID}
        onChangeText={setUserID}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => router.push('/forgot')}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Help Button at Bottom Left */}
      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={() => router.push('/help')}>
          <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, justifyContent: 'center' },
  title: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Lato',
    color: '#F85A40',
  },
  input: {
    borderColor: '#F85A40',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#F85A40',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgot: {
    color: '#F85A40',
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  helpContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  helpText: {
    color: '#F85A40',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

