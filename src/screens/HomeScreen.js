// src/screens/HomeScreen.js
import React, {useEffect, useState, useCallback} from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import axios from '../api/apiClient';
import EventCard from '../components/EventCard';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/Event');
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents(); // Memuat data setiap kali layar aktif
    }, []),
  );

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Events in Your City</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('EventForm')}>
        <Text style={styles.addButtonText}>Add New Event</Text>
      </TouchableOpacity>
      <FlatList
        data={events}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <EventCard
            event={item}
            onPress={() =>
              navigation.navigate('EventDetail', {eventId: item.id})
            }
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F3',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2A2E43',
    fontFamily: 'Poppins-SemiBold',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#50C2C9',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  listContent: {
    paddingBottom: 100,
  },
});

export default HomeScreen;
