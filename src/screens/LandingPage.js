// src/screens/LandingPage.js
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const LandingPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://i.pinimg.com/736x/b8/f7/4f/b8f74f1853e488eb73a1289bd0d7f496.jpg',
        }} // Ganti URL_GAMBAR_ANDA dengan URL gambar yang diunggah
        style={styles.image}
      />
      <Text style={styles.title}>Concert Connect</Text>
      <Text style={styles.subtitle}>Find, Connect, Experience Live Music.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F3',
    padding: 20,
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 30,
    borderRadius: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black', // Warna teks yang cocok dengan latar belakang gelap
    marginBottom: 10,
    fontFamily: 'Montserrat', // Tambahkan font menarik seperti Roboto atau Montserrat
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#50C2C9', // Warna tombol yang menarik
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LandingPage;
