import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const DoctorHome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>PharmFill</Text>
        <Image 
          style={styles.avatar}
          source={require('./assets/pfp.png')} 
        />
      </View>
      
      <Image
        style={styles.profilePicture}
        source={require('./assets/pfp.png')}
      />
      
      <Text style={styles.doctorName}>Dr. Ashvin Sivanesan</Text>
      <Text style={styles.doctorInfo}>1455 Oxford Dr, Unit 14, Hamilton, ON</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search for your patient..."
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>recent patients</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>prescription history</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 50,
    paddingHorizontal: 16, 
    backgroundColor: '#40B4EA',
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
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 20,
    borderWidth: 3,
    borderColor: 'white',
  },
  doctorName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  doctorInfo: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 20, 
  },
  searchInput: {
    height: 40,
    width: '90%',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 20,
    paddingLeft: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20, 
  },
  button: {
    backgroundColor: '#40B4EA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '40%', 
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  });

export default DoctorHome;