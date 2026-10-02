import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (text) => {
    setEmail(text);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(text)) setEmailError('Invalid email format');
    else setEmailError('');
  };

  const validatePassword = (text) => {
    setPassword(text);
    if (text.length < 6) setPasswordError('Password must be at least 6 characters');
    else setPasswordError('');
  };

  const isFormValid = email && password && !emailError && !passwordError;

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email.trim().toLowerCase()), where('password', '==', password));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert('Not Found', 'Credentials not found. Please signup first.');
      } else {
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Unable to log in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={validateEmail}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={isSecure}
          autoCapitalize="none"
          value={password}
          onChangeText={validatePassword}
        />
        <TouchableOpacity
          onPress={() => setIsSecure((current) => !current)}
          accessibilityRole="button"
          accessibilityLabel={isSecure ? 'Show password' : 'Hide password'}
        >
          <Ionicons name={isSecure ? 'eye-off' : 'eye'} size={22} color="#666" />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity
        style={[styles.button, (!isFormValid || isLoading) && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>Don't have an account? Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginTop: 15 },
  passwordContainer: { flexDirection: 'row', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, alignItems: 'center', marginTop: 15 },
  passwordInput: { flex: 1, paddingVertical: 12 },
  errorText: { color: 'red', fontSize: 12, marginTop: 5 },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#a3d3af' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  linkText: { color: '#28a745', textAlign: 'center', marginTop: 15 }
});