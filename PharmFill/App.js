import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { ActivityIndicator, View } from 'react-native';

import LoginScreen from './loginScreen';
import RegisterScreen from './registerScreen';
import UserHome from './userHome';
import DoctorHome from './doctorHome';
import PharmacyHome from './pharmacyHome';
import Search from './search';
import DoctorProfile from './doctorProfile';
import PharmacyProfile from './pharmacyProfile';

const Stack = createNativeStackNavigator();

function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      'anticon': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/AntDesign.ttf'),
      // Include any other fonts you need to load
    });
    setFontsLoaded(true);
  }

  React.useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="UserHome" component={UserHome} />
        <Stack.Screen name="DoctorHome" component={DoctorHome} />
        <Stack.Screen name="PharmacyHome" component={PharmacyHome} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
        <Stack.Screen name="PharmacyProfile" component={PharmacyProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
