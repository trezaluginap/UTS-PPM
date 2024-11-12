// src/components/EventCard.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

const EventCard = ({event, onPress}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{uri: event.imageUrl}} style={styles.image} />
    <Text style={styles.title}>{event.name}</Text>
    <Text>{event.description}</Text>
    <Text>{event.location}</Text>
    <Text>Price: ${event.price}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#FFFFF',
    borderRadius: 5,
  },
  title: {fontSize: 18, fontWeight: 'bold'},
  image: {
    width: '100%',
    height: 300,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default EventCard;
