// screens/BalanceScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import { useRouter } from 'expo-router';

export default function BalanceScreen() {
  const [userID, setUserID] = useState('');
  const [balance, setBalance] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserID(user.uid);
        fetchBalance(user.uid);
      } else {
        Alert.alert('Unauthorized', 'You must be logged in to view balance.');
        router.replace('/login');
      }
    });

    return unsubscribe;
  }, []);

  const fetchBalance = async (uid) => {
    try {
      const q = query(
        collection(db, 'deposits'),
        where('userID', '==', uid),
        where('status', '==', 'approved')
      );

      const querySnapshot = await getDocs(q);
      let total = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        total += data.amount;
      });

      setBalance(total);
    } catch (error) {
      console.error('Error fetching balance:', error);
      Alert.alert('❌ Error', 'Could not fetch balance.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Balance</Text>
      <Text style={styles.amount}>Ksh {balance}</Text>

      <TouchableOpacity style={styles.refreshButton} onPress={() => fetchBalance(userID)}>
        <Text style={styles.refreshText}>Refresh Balance</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#F85A40', marginBottom: 20 },
  amount: { fontSize: 32, color: '#333', fontWeight: 'bold', marginBottom: 40 },
  refreshButton: {
    backgroundColor: '#F85A40',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  refreshText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
