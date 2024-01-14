import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = ({ navigation }) => {
  const [age, setAge] = useState('');
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegistration = () => {
    
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>PharmFill Registration</Text>
      
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Enter your age"
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Name (first last)</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter your full name"
      />
      
      <Text style={styles.label}>City of Residence</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Enter your city"
      />
      
      <Text style={styles.label}>Province</Text>
      <TextInput
        style={styles.input}
        value={province}
        onChangeText={setProvince}
        placeholder="Enter your province"
      />
      <Text style={styles.label}>Postal Code</Text>
      <TextInput
        style={styles.input}
        value={postalCode}
        onChangeText={setPostalCode}
        placeholder="Enter your postal code"
      />
      
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />
      
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("UserHome")}>
        <Text style={styles.registerButtonText}>Register Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#40B4EA',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: '#40B4EA',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  });
  
  export default RegisterScreen;