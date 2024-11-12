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

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan Password harus diisi!');
      return;
    }

    try {
      // Mengecek apakah email sudah terdaftar di database
      const response = await axios.get(
        `https://6721df3f98bbb4d93caa1210.mockapi.io/Users?email=${email.trim()}`,
      );

      if (response.data.length === 0) {
        // Jika email belum terdaftar
        Alert.alert(
          'Error',
          'Email belum terdaftar. Silakan registrasi terlebih dahulu!',
        );
        navigation.navigate('RegisterScreen');
      } else {
        const user = response.data[0];

        // Verifikasi password
        if (user.password === password.trim()) {
          Alert.alert('Sukses', 'Login berhasil!');
          navigation.navigate('HomeScreen'); // Arahkan ke halaman utama
        } else {
          Alert.alert('Error', 'Password salah!');
        }
      }
    } catch (error) {
      console.error('Login Gagal:', error);
      Alert.alert('Error', 'Tidak dapat menghubungi server');
    }
  };

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.registerLink}>
          Belum punya akun? Daftar di sini
        </Text>
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
  loginButton: {
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
  registerLink: {
    textAlign: 'center',
    color: '#50C2C9',
    marginTop: 10,
  },
});

export default LoginScreen;
