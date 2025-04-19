import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { useRouter } from 'expo-router';

export default function DepositScreen() {
  const [userID, setUserID] = useState('');
  const [amount, setAmount] = useState(0);
  const router = useRouter();

  // 🔒 Protect screen & auto-detect userID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
      } else {
        Alert.alert('Unauthorized', 'Please log in to continue.');
        router.replace('/login');
      }
    });
    return unsubscribe;
  }, []);

  const adjustAmount = (delta) => {
    setAmount((prev) => Math.max(0, prev + delta));
  };

  const handleConfirm = () => {
    if (!userID || amount <= 0) {
      Alert.alert('❌ Incomplete', 'Please enter a valid amount.');
      return;
    }

    Alert.alert(
      'Confirm Deposit',
      `Do you wish to deposit Ksh ${amount} to Jamii Chama?`,
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: submitDeposit },
      ]
    );
  };

  const submitDeposit = async () => {
    try {
      await addDoc(collection(db, 'deposits'), {
        userID,
        amount,
        timestamp: Timestamp.now(),
        status: 'pending', // to be approved by admin
      });

      Alert.alert('✅ Deposit Sent', 'Awaiting manager approval.');
      setAmount(0); // Clear input
    } catch (error) {
      console.error('Deposit error:', error);
      Alert.alert('❌ Error', 'Could not submit deposit.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>User ID</Text>
      <TextInput style={[styles.input, { backgroundColor: '#eee' }]} value={userID} editable={false} />

      <Text style={styles.label}>Enter Amount</Text>
      <View style={styles.amountRow}>
        <TouchableOpacity onPress={() => adjustAmount(-1)} style={styles.adjustBtn}>
          <Text style={styles.adjustText}>-1</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.amountInput}
          keyboardType="numeric"
          value={amount.toString()}
          onChangeText={(text) => setAmount(parseInt(text) || 0)}
        />

        <TouchableOpacity onPress={() => adjustAmount(1)} style={styles.adjustBtn}>
          <Text style={styles.adjustText}>+1</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm Deposit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 8, color: '#F85A40', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#F85A40',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  adjustBtn: {
    backgroundColor: '#F85A40',
    padding: 10,
    borderRadius: 8,
    width: 60,
    alignItems: 'center',
  },
  adjustText: { color: '#fff', fontWeight: 'bold' },
  amountInput: {
    borderWidth: 1,
    borderColor: '#F85A40',
    padding: 10,
    borderRadius: 8,
    width: 100,
    textAlign: 'center',
  },
  confirmBtn: {
    backgroundColor: '#F85A40',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});