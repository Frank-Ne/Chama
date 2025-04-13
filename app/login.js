import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (userID && password === '1234') {
      Alert.alert('✅ Login Successful', 'Welcome to Jamii Chama!', [
        { text: 'Proceed', onPress: () => router.replace('/deposit') },
      ]);
    } else {
      Alert.alert('❌ Wrong Password', 'Please re-enter your password.');
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

      <Button title="Login" color="#F85A40" onPress={handleLogin} />

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
  title: { fontSize: 26, marginBottom: 20, textAlign: 'center', fontFamily: 'Lato', color: '#F85A40' },
  input: {
    borderColor: '#F85A40',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
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
