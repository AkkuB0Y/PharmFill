import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const photo = await cameraRef.current.takePictureAsync(options);
    
      // Set captured image in state
      setCapturedImage(photo);
    
      // Create form data for upload
      let formData = new FormData();
      formData.append('image', {
        uri: photo.uri,
        type: 'image/png', // Adjust according to your backend
        name: 'image.png', // Adjust according to your backend
      });
    
      // API URL for upload
      const uploadUrl = "http://172.17.73.93:5001/image/sayhi"; // Replace with your API URL
    
      // Post request to upload the image
      axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log("Image uploaded successfully:", response.data);
    
      })
      .catch(error => {
        console.error("Error uploading image:", error);
      });
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture} />
        </View>
      </Camera>
      {capturedImage && <Image source={{ uri: capturedImage.uri }} style={styles.previewImage} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  camera: {
    width: '100%',
    height: '75%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    // transform: [{translateY: 150}]
  },
  button: {
    width: 70, // Adjust the size of the button
    height: 70, // Make the height equal to the width for a circle
    backgroundColor: 'white', // Button color
    borderRadius: 35, // Half of width/height to make it a circle
    justifyContent: 'center',
    alignItems: 'center',
    border: '3px solid black',
    zIndex: 1000
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  previewImage: {
    width: '100%',
    height: '75%',
  },
});
