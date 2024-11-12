// src/screens/EventForm.js
import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import axios from '../api/apiClient';

const EventForm = ({route, navigation}) => {
  const {eventId} = route.params || {};
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSave = async () => {
    const newEvent = {name, description, location, price, imageUrl};
    try {
      if (eventId) {
        await axios.put(`/Event/${eventId}`, newEvent);
      } else {
        await axios.post('/Event', newEvent);
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEvent = async () => {
    if (eventId) {
      try {
        const response = await axios.get(`/Event/${eventId}`);
        setName(response.data.name);
        setDescription(response.data.description);
        setLocation(response.data.location);
        setPrice(response.data.price);
        setImageUrl(response.data.imageUrl); // Setel URL gambar yang diambil
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchEvent();
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Event Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4F3',
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#50C2C9',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventForm;
