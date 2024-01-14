import React from 'react';
import { StyleSheet, View, Text, TextInput, Image, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const DoctorSearch = () => {
  const navigation = useNavigation();
  const patients = [
    { id: '1', initials: 'DK', name: 'Kansara, Dev'},
    { id: '2', initials: 'AS', name: 'Sandhu, Ajayveer'},
    { id: '3', initials: 'TV', name: 'Vije, Tulassi'},
    { id: '4', initials: 'JS', name: 'Siakam, Julius'},
    { id: '5', initials: 'SX', name: 'Xu, Selena'},
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate("DoctorProfile")}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{item.initials}</Text>
      </View>
      <Text style={styles.nameText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>PharmFill</Text>
        <Image
          style={styles.profileIcon}
          source={require('./assets/pfp.png')}
        />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="445678..."
        />
        <TouchableOpacity>
          <Text style={styles.searchIcon}>🔍</Text> 
        </TouchableOpacity>
      </View>
      <FlatList data={patients} renderItem={renderItem} keyExtractor={(item) => item.id} style={styles.list}/>
      </View>
        );
  };

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#40B4EA',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 10,
    margin: 15,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    fontSize: 20,
    marginLeft: 10,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 15,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#40B4EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  nameText: {
    flex: 1,
    fontSize: 16,
  },
  ageText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
    
export default DoctorSearch;
