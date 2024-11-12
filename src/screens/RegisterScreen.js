import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Semua kolom harus diisi!');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Format email tidak valid');
      return;
    }

    try {
      const data = {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      };

      console.log('Data yang dikirim:', data);

      // Menggunakan axios untuk mengirim data
      const response = await axios.post(
        'https://6721df3f98bbb4d93caa1210.mockapi.io/Users',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Sukses', 'Registrasi berhasil!');
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Error', 'Registrasi gagal. Status tidak sesuai.');
      }
    } catch (error) {
      console.error('Registrasi Gagal:', error);

      if (error.response) {
        console.error('Data:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);

        const errorMessage =
          error.response.data.message || 'Permintaan tidak valid';
        Alert.alert('Error', errorMessage);
      } else {
        Alert.alert('Error', 'Tidak dapat menghubungi server');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nama"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Daftar</Text>
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
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: '#50C2C9',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RegisterScreen;
