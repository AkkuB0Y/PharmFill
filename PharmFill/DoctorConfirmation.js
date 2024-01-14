import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const DoctorConfirmation = () => {
  const navigation = useNavigation();
  const [isUploading, setIsUploading] = useState(false);
  const [textLoaded, setTextLoaded] = useState(false);

  useEffect(() => {
    setIsUploading(true);
    setTimeout(() => {
      setTextLoaded(true);
      setIsUploading(false);
    }, 5000);
  }, []);

  const handleEditPress = () => {};

  const handleUploadPress = async () => {
    // Start uploading process
    setIsUploading(true);
    try {
      // Simulate an upload process with a timeout
      setTimeout(() => {
        // End uploading process
        setIsUploading(false);
        // navigate to DoctorProfile or handle the upload success
        navigation.navigate("DoctorProfile");
      }, 2000); // Simulate a network request
    } catch (error) {
      setIsUploading(false);
      // Handle any errors here
    }
  };

  const handleRetakePress = () => {
    navigation.navigate("DoctorCameraScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.prescriptionContainer}>
        <Image
          style={styles.blankPrescription}
          source={require("./assets/sample_prescription.png")}
        />
        {textLoaded && (
          <Text style={styles.transcription}>
            The prescription is for a 29-year-old male named Armando Coquia. The
            medication prescribed is Amoxicillin 500mg, and the dosage is 1
            capsule three times a day for seven days. The prescription was
            written by Dr. Imelda Cruz on 12-03-90.
          </Text>
        )}
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleEditPress}>
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleUploadPress}
        >
          <Text style={styles.actionButtonText}>Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleRetakePress}
        >
          <Text style={styles.actionButtonText}>Retake Scan</Text>
        </TouchableOpacity>
      </View>

      {isUploading && (
        <View style={styles.uploadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingTop: 75,
  },
  header: {
    marginTop: 30,
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  prescriptionContainer: {
    margin: 20,
    // padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    width: "90%",
    height: "auto",
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  pharmacyAddress: {
    fontSize: 16,
    color: "grey",
    marginBottom: 15,
  },
  patientName: {
    fontSize: 16,
    marginBottom: 5,
  },
  doctorName: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 15,
  },
  prescriptionDetails: {
    fontSize: 16,
    marginBottom: 20,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: "#40B4EA",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  blankPrescription: {
    width: "100%",
    height: undefined,
    aspectRatio: 1, // Replace with the actual aspect ratio of your image
    resizeMode: "contain",
  },
  uploadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // semi-transparent background
    zIndex: 1, // ensures the loader is above other elements
  },
});

export default DoctorConfirmation;
