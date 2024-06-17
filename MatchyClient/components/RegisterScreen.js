import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-picker';

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: 'male',
    interestedIn: 'female',
    photos: []
  });

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handlePhotoUpload = () => {
    const options = {
      title: 'Select Photo',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo',
      chooseFromLibraryButtonTitle: 'Choose from Library',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.5,
      maxWidth: 800,
      maxHeight: 800,
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const newPhotos = [...form.photos, response.uri];
        setForm({ ...form, photos: newPhotos });
      }
    });
  };

  const handleSubmit = async () => {
    try {
      // Your existing code for form submission
      // ...

      console.log('Form Submitted', form);
      Alert.alert('Success', 'You have registered successfully');

      // Navigate to SwipingScreen
      navigation.navigate('SwipingScreen');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'There was an error with your registration');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {['firstName', 'lastName', 'email', 'phoneNumber', 'dateOfBirth'].map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={form[key]}
          onChangeText={(value) => handleInputChange(key, value)}
        />
      ))}
      <Text style={styles.label}>Gender</Text>
      <Picker
        selectedValue={form.gender}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange('gender', itemValue)}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
      <Text style={styles.label}>Interested In</Text>
      <Picker
        selectedValue={form.interestedIn}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange('interestedIn', itemValue)}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
      <View style={styles.photoContainer}>
        <Text style={styles.label}>Upload Photos (1-5)</Text>
        <View style={styles.photoGrid}>
          {form.photos.map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={styles.thumbnail} />
          ))}
          {form.photos.length < 5 && (
            <TouchableOpacity style={styles.uploadButton} onPress={handlePhotoUpload}>
              <Text style={styles.uploadButtonText}>Upload Photo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  photoContainer: {
    marginBottom: 20,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  uploadButton: {
    width: 80,
    height: 80,
    backgroundColor: '#CCCCCC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  uploadButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
