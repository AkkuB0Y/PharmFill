import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
  { label: 'Pharmacist', value: 'PharmacistHome' },
  { label: 'Physician', value: 'DoctorHome' },
  { label: 'Patient', value: 'UserHome' },
];

const DropdownComponent = ({ onValueChange, selectedValue }) => {
  const [value, setValue] = useState(selectedValue);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }, { textAlign: `center` }]}>
          User
        </Text>
      );
    }
    return null;
  }

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select user"
        value={selectedValue}
        onChange={item => {
          onValueChange(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
    </View>
  );
};
export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigation = useNavigation();

  const handleLoginPress = async () => {
    // try {
    //   const response = await axios.post('http://172.17.72.156:5001/auth/login', {
    //     "username": username,
    //     "password": password
    //   });
    //   if (response.data.message === 'Login successful') {
    //     console.log('Logged in:', response.data.username);
    //   } else {
    //     console.warn(response.data.message);
    //   }
    // } catch (error) {
    //   console.error('Login error:', error);
    // }
    if (selectedUser === 'PharmacistHome') {
      navigation.navigate("PharmacistHome"); // Modify with your actual route name
    } else if (selectedUser === 'DoctorHome') {
      navigation.navigate("DoctorHome"); // Modify with your actual route name
    } else if (selectedUser === 'UserHome') {
      navigation.navigate("UserHome"); // Modify with your actual route name
    }
  };

  const handleRegisterPress = async () => {
    try {
      const response = await axios.post('http://172.17.72.156:5001/auth/create', {
        "username": "username",
        "password": "password"
      });
      if (response.data === 'User successfully created') {
        navigation.navigate('Register');
        console.log('User created successfully');
      } else {
        console.warn(response.data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={require('./assets/PharmFill_BlueWhitedropShadow.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>PharmFill</Text>
          <TouchableOpacity 
            style={styles.modalIcon} 
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.modalIconText}>ⓘ</Text>
          </TouchableOpacity>
        </View>
        
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTextTitle}>Login Credentials</Text>

            <Text style={styles.modalTextHeader}>Patients</Text>
            <Text style={styles.modalTextBody}>
              Your user login is your <Text style={styles.modalTextHighlight}>10-digit Ontario health card number</Text>. This
              number is your go-to personal identification across the application.
            </Text>

            <Text style={styles.modalTextHeader}>Physicians</Text>
            <Text style={styles.modalTextBody}>
              Your user login is your <Text style={styles.modalTextHighlight}>9-digit PharmaFill number</Text> assigned to you
              during account registration.
            </Text>

            <Text style={styles.modalTextHeader}>Pharmacists</Text>
            <Text style={styles.modalTextBody}>
              Your user login is your location’s <Text style={styles.modalTextHighlight}>7-digit PharmaFill number</Text>. If
              you are unsure of this number, please ask a superior.
            </Text>

            <TouchableOpacity
              style={styles.button2}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <DropdownComponent onValueChange={setSelectedUser} selectedValue={selectedUser} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      <TextInput
        style={[styles.input, styles.passwordInput]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
    </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLoginPress()}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20, 
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#40B4EA',
  },
  inputContainer: {
    width: '80%',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#40B4EA',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#40B4EA',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerText: {
    color: '#40B4EA',
    textDecorationLine: 'underline',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "left",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    marginLeft: '35%',
    backgroundColor: "#ADD8E6",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTextTitle: {
    marginBottom: 20,
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 24,
    color: '#40B4EA',
    marginLeft: '15%'
  },
  modalTextHeader: {
    marginTop: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 18,
    textAlign: "left"
  },
  modalTextBody: {
    marginBottom: 15,
    textAlign: "left"
  },
  modalTextHighlight: {
    fontWeight: 'bold',
  },
  modalIcon: {
    position: 'absolute',
    right: 40,
    top: '70%', 
    transform: [{ translateY: -10 }], 
  },
  modalIconText: {
    fontSize: 16,
    color: '#40B4EA',
    padding: `auto`
  },   
  dropdown: {
    margin: 16,
    height: 50,
    width: 170,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
