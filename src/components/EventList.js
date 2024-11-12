import React from 'react';
import {View, Text, Button, FlatList, StyleSheet, Image} from 'react-native';

const EventsList = ({Events, onEdit, onDelete}) => {
  return (
    <FlatList
      data={Events}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.itemContainer}>
          {/* Tampilkan gambar jika imageUrl tersedia */}
          {item.imageUrl && (
            <Image source={{uri: item.imageUrl}} style={styles.image} />
          )}
          <Text style={styles.itemText}>{item.name}</Text>
          <Text>{item.description}</Text>
          <View style={styles.buttons}>
            <Button title="Edit" onPress={() => onEdit(item)} />
            <Button title="Delete" onPress={() => onDelete(item.id)} />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default EventsList;
