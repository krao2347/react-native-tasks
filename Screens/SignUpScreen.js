import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function SignupScreen({ navigation }) {
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
    
    // Regular expressions for checking individual requirements
    const minLength = text.length >= 6;
    const hasUpperCase = /[A-Z]/.test(text);
    const hasLowerCase = /[a-z]/.test(text);
    const hasNumber = /[0-9]/.test(text);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(text);

    if (!text) {
      setPasswordError('Password is required');
    } else if (!minLength) {
      setPasswordError('Password must be at least 6 characters long');
    } else if (!hasUpperCase) {
      setPasswordError('Password must contain at least 1 uppercase letter (A-Z)');
    } else if (!hasLowerCase) {
      setPasswordError('Password must contain at least 1 lowercase letter (a-z)');
    } else if (!hasNumber) {
      setPasswordError('Password must contain at least 1 number (0-9)');
    } else if (!hasSpecialChar) {
      setPasswordError('Password must contain at least 1 special character (e.g., @, #, $, !)');
    } else {
      setPasswordError(''); // All checks passed! Clear the error.
    }
  };

  const isFormValid = email && password && !emailError && !passwordError;

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const usersRef = collection(db, 'users');
      const normalizedEmail = email.trim().toLowerCase();
      const q = query(usersRef, where('email', '==', normalizedEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert('Error', 'Email already exists. Please login.');
      } else {
        await addDoc(usersRef, {
          email: normalizedEmail,
          password: password, // Note: In production, hash passwords before storing
        });
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Unable to sign up. Please try again.');
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
        onPress={handleSignup}
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Signup</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
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
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#a0c4ff' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  linkText: { color: '#007bff', textAlign: 'center', marginTop: 15 }
});