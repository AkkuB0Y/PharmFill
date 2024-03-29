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
      
      <Text style={styles.doctorName}>Rexall Pharmacy</Text>
      <Text style={styles.doctorInfo}>2 King Street West, Unit 18. Hamilton, ON</Text>

      <TouchableOpacity onPress={() => navigation.navigate("DoctorSearch")}>
      <Text style={styles.searchInput}> Search for your patient...</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Recent Patients</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Prescription History</Text>
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
    paddingBottom: 50,
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
  searchContainer: {
    width: "50%",
  },
  searchInput: {
    height: 50,
    width: '100%',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 20,
    paddingTop: 10,
    padding: 20,
    fontSize: 16,
    textAlign: 'center',
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
