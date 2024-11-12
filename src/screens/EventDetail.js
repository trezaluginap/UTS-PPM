import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from '../api/apiClient';

const EventDetail = ({route, navigation}) => {
  const {eventId} = route.params;
  const [event, setEvent] = useState(null);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`/Event/${eventId}`);
      setEvent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEvent = async () => {
    try {
      await axios.delete(`/Event/${eventId}`);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  useEffect(() => {
    fetchEvent();
  });

  return (
    event && (
      <ScrollView style={styles.container}>
        <Image source={{uri: event.imageUrl}} style={styles.image} />
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.location}>Location: {event.location}</Text>
        <Text style={styles.price}>Price: ${event.price}</Text>
        <Text style={styles.description}>{event.description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate('EventForm', {eventId: event.id})
            }>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={deleteEvent}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    flex: 0.48,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    flex: 0.48,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventDetail;
