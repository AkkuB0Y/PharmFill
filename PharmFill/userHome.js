import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const UserHome = () => {
  const prescriptions = [
    { name: 'Amoxicillin', dosage: '500 mg', color: 'gold' },
    { name: 'Lisinopril', dosage: '10 mg', color: 'red' },
    { name: 'Atorvastatin', dosage: '20 mg', color: 'red' },
    { name: 'Albuterol', dosage: '90 mcg', color: 'blue' },
  ];
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
        <View style={styles.logoContainer}>
        <Image
        source={require('./assets/PharmFill_BlueWhite.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
        </View>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Image
          style={styles.profileImage}
          source={require('./assets/pfp.png')}
        />
        </TouchableOpacity>
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>Ajayveer Sandhu</Text>
          <Text style={styles.profileDetails}>18, unemployed</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Open Prescriptions</Text>
      {prescriptions.map((prescription, index) => (
        <TouchableOpacity key={index} style={styles.prescriptionItem}>
          <View style={[styles.colorIndicator, { backgroundColor: prescription.color }]} />
          <Text style={styles.prescriptionText}>{`${prescription.name}, ${prescription.dosage}`}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionHeader}>Closed Prescriptions</Text>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#40B4EA', // Temporary background color
  },
  profileTextContainer: {
    marginLeft: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileDetails: {
    fontSize: 14,
    color: 'gray',
  },
  sectionHeader: {
    backgroundColor: '#40B4EA',
    color: 'white',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  prescriptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  prescriptionText: {
    flex: 1,
    fontSize: 16,
  },
  editIcon: {
    fontSize: 16,
    color: '#40B4EA',
  },
  logo: {
    height: 120,
    width: '100%', 
    alignSelf: 'center', 
    marginTop: 10,
    marginBottom: 10, 
    resizeMode: 'contain',
    backgroundColor: '#ADD8E6',
  },
  logoContainer:{
    backgroundColor: '#ADD8E6',
  },
});

export default UserHome;    