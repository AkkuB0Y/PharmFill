import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PharmacyProfile = () => {
    const prescriptions = [
        { name: 'Amoxicillin', dosage: '500 mg', color: 'gold' },
        { name: 'Lisinopril', dosage: '10 mg', color: 'red' },
        { name: 'Atorvastatin', dosage: '20 mg', color: 'red' },
        { name: 'Albuterol', dosage: '90 mcg', color: 'blue' },
      ];
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>PharmFill</Text>
        <Image
          style={styles.avatar}
          source={require('./assets/pfp.png')}
        />
      </View>
      
      <View style={styles.userInfoSection}>
        <View style={styles.initialsCircle}>
          <Text style={styles.initialsText}>AS</Text>
        </View>
        <Text style={styles.userName}>Ajayveer Sandhu</Text>
        <Text style={styles.userDetails}>18, student</Text>
      </View>

      <Text style={styles.sectionHeader}>Open Prescriptions</Text>

      {prescriptions.map((prescription, index) => (
        <TouchableOpacity key={index} style={styles.prescriptionItem}>
          <View style={[styles.colorIndicator, { backgroundColor: prescription.color }]} />
          <Text style={styles.prescriptionText}>{`${prescription.name}, ${prescription.dosage}`}</Text>
          <TouchableOpacity style={styles.plusCircle}>
            <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionHeader}>Closed Prescriptions</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("PharmacistCameraScreen")}>
        <Text style={styles.addSign}>+</Text>
      </TouchableOpacity>
      </View>
    );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#40B4EA',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfoSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  initialsCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#40B4EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
  },
  userDetails: {
    fontSize: 16,
    color: 'grey',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#40B4EA',
    color: 'white',
    paddingVertical: 9,
    paddingHorizontal: 15,
    marginTop: 0,
  },
  prescriptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 15,
  },
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 15,
  },
  prescriptionText: {
    flex: 1,
    fontSize: 16,
  },
  plusCircle: {
    width: 30, 
    height: 30, 
    borderRadius: 15,
    backgroundColor: '#40B4EA', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    color: 'white',
    fontSize: 24, 
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30, 
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#40B4EA',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, 
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    },
  addSign: {
    color: "#FFFFFF",
    fontSize: 30,
  }
});

export default PharmacyProfile;
