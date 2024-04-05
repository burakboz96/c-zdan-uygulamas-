import React, { useState } from 'react';
import { StatusBar, Modal, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SecondPage from './SecondApp';
import firebaseConfig from './firebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ZoomOutLeft } from 'react-native-reanimated';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SecondPage" component={SecondPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#fff'); // Arka plan rengi state'i

  const auth = getAuth();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoginModalVisible(false);
        navigation.navigate('SecondPage');
      })
      .catch((error) => {
        console.error(error);
        alert('Hatalı kullanıcı adı veya şifre');
      });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, signupPassword)
      .then(() => {
        setIsSignUpModalVisible(false);
        navigation.navigate('SecondPage');
      })
      .catch((error) => {
        console.error(error);
        alert('Şifrenin en az 6 karakter olmalıdır.');
      });
  };

  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const handleThemeChange = () => {
    setBackgroundColor('black'); // Arka plan rengini siyah yap
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Cüzdan App</Text>
      </View>

      {/* Uygulama İçeriği */}
      <View style={styles.content}></View>
      <StatusBar />
      
      {/* Ayarlar Butonu */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => setIsSettingsModalVisible(true)}
      >
        <AntDesign name="setting" size={33} color="#4285F4" marginTop={-42} />
      </TouchableOpacity>

      {/* Ayarlar Modal */}
      <Modal
        visible={isSettingsModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsSettingsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          
          <Text style={styles.modalTitle}>Ayarlar</Text>
          <Button right="%12" title="  X  " color="red"   onPress={() => setIsSettingsModalVisible(false)} />
        

          <TouchableOpacity style={styles.settingOption} onPress={handleThemeChange}>
            <Text>Tema:Koyu mod</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption} onPress={() => alert('Cihaz: Pixel 6 Pro')}>
            <Text>Cihaz Ayarları</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption} onPress={() => alert('Geliştirici: Burak Bozoğlu')}>
            <Text>Hakkında</Text>
          </TouchableOpacity>
          

        </View>
      </Modal>

      {/* Giriş Yap Butonu */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsLoginModalVisible(true)}
      >
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      {/* Kayıt Ol Butonu */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsSignUpModalVisible(true)}
      >
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>

      {/* Giriş Yap Modal */}
      <Modal
        visible={isLoginModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsLoginModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-posta"
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Button title="Giriş Yapın" onPress={handleLogin} />
        </View>
      </Modal>

      {/* Kayıt Ol Modal */}
      <Modal
        visible={isSignUpModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsSignUpModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ad Soyad"
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="E-posta"
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            onChangeText={setSignupPassword}
            secureTextEntry={true}
          />
          <Button title="Hemen Kayıt Ol" onPress={handleSignUp} />
        </View>
      </Modal>
      
      {/* Alt Bölüm */}
      <View style={styles.bottomSection}>
        <AntDesign name="google" size={24} color="black" marginBottom={-23} top={22} />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4285F4' }]}
          onPress={() => {
            // Google ile giriş işlemleri
            alert('Google ile giriş yapıldı');
          }}
        >
          <Text style={styles.buttonText}>Google ile Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#000009' }]}
          onPress={() => {
            // Twitter ile giriş işlemleri
            alert('Twitter ile giriş yapıldı');
          }}
        >
          <Text style={styles.buttonText}>X ile Giriş Yap</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 37,
    color: '#4285F4',
    marginTop: -300,
  },
  content: {
    alignItems: 'center',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(3, 7, 7,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  modalTitle: {
    fontSize: 35,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  settingsButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  settingOption: {
    
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 7,
    borderRadius: 5,
    left:0,
  },
});