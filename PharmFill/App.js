import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, KeyboardAvoidingView, ScrollView, Modal, TouchableOpacity, Button, Alert } from 'react-native';
import { styled } from 'nativewind';
import React, { useState } from 'react';
import axios from 'axios';

// styling
const ViewStyled = styled(View)
const TextStyled = styled(Text)
const InputStyled = styled(TextInput)
const ImageStyled = styled(Image)

export default function App() {
  
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  return (
    <ViewStyled style={styles.container}>

      <KeyboardAvoidingView behavior='padding' className="w-full" keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
      <ScrollView>
      <ViewStyled className='items-center'>
        <ImageStyled 
          className="w-[170px] h-[259px] shadow-[0_4px_31.1px_0_rgba(0, 0, 0, 0.4)]"
          source={require('./assets/PharmFill_BlueWhitedropShadow.png')}
        />
      </ViewStyled>

      <TextStyled className="text-6xl text-[#40B4EA] font-bold text-center">Pharm<TextStyled className="font-normal italic">Fill</TextStyled></TextStyled>
      <StatusBar style="auto" />

          <ViewStyled className="flex flex-row justify-between">
            <Text className="text-xl text-[#40B4EA] font-bold ml-[13%] mt-10">
              User Login
            </Text>
            <TouchableOpacity onPress={openModal}>
              <Text className="text-xl mr-[13%] mt-5">
                ⓘ
              </Text>
            </TouchableOpacity>
          </ViewStyled>

          <ViewStyled className="mt-1 py-3 w-full bg-[#40B4EA] items-center">
            <InputStyled className="px-5 py-3 w-3/4 rounded-full bg-white text-zinc-500" placeholder="Enter here..."/>
          </ViewStyled>

          <ViewStyled className="flex flex-row justify-between">
            <Text className="text-xl text-[#40B4EA] font-bold ml-[13%] mt-5">
              Password
            </Text>
          </ViewStyled>
          <ViewStyled className="mt-1 py-3 w-full bg-[#40B4EA] items-center">
            <InputStyled className="px-5 py-3 w-3/4 rounded-full bg-white text-zinc-500" placeholder="Enter here..."/>
          </ViewStyled>
          <Text className="mt-2 ml-[13%] underline">
            Don't have an account? Register Here!
          </Text>

          <ViewStyled className='items-center'>
            <TouchableOpacity className="bg-[#40B4EA] rounded-full w-1/2 mt-5">
                <Text className="text-lg p-2 font-bold text-slate-50 text-center">
                  Sign In 
                </Text>
            </TouchableOpacity>
          </ViewStyled>

          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
            >
              <ViewStyled className='bg-slate-50/95 backdrop-blur-md mt-[17.5%] mx-5 rounded-xl outline outline-slate-500 px-5 py-5'>
                <TouchableOpacity onPress={closeModal}>
                  <Text className="text-md text-right">
                    ✖
                  </Text>
               </TouchableOpacity>

                <Text className="text-[#40B4EA] text-2xl font-bold">Login Credentials</Text>
                <Text className="text-lg mt-5 mb-2 font-semibold">Patient Credentials</Text>
                <Text>Your user login is your <Text className="font-bold">10-digit Ontario health card number. </Text> 
                  This number is your go-to personal identification across the application.</Text>

                <Text className="text-lg mt-5 mb-2 font-semibold">Physicians</Text>
                <Text>Your user login is your <Text className="font-bold">9-digit PharmaFill number </Text> 
                  assigned to you during account registration.</Text>

                <Text className="text-lg mt-5 mb-2 font-semibold">Pharmacists</Text>
                <Text>Your user login is your location’s <Text className="font-bold">7-digit PharmaFill number. </Text>
                  If you are unsure of this number, please ask a superior. </Text>
              </ViewStyled>

          </Modal>

      </ScrollView>
      </KeyboardAvoidingView>
    </ViewStyled>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
