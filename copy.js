import React, { useState } from 'react';
import { StatusBar, Modal, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

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
  const [backgroundImage, setBackgroundImage] = useState('url("C:\Users\Public\Music\cuzdan_app\arayüz.jpeg")');
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = () => {
    if (password === 'password') {
      setIsLoginModalVisible(false);
      setIsSignUpModalVisible(false);
      navigation.navigate('SecondPage');
    } else {
      alert('Hatalı kullanıcı adı veya şifre');
    }
  };

  const handleSignUp = () => {
    setIsSignUpModalVisible(false);
    setIsLoginModalVisible(false);
    navigation.navigate('SecondPage');
  };

  return (
    <View style={[styles.container, { backgroundImage: backgroundImage }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Cüzdan App</Text>
      </View>

      {/* Uygulama İçeriği */}
      <View style={styles.content}>
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
      </View>

      {/* Giriş Yap Modal */}
      <Modal
        visible={isLoginModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsLoginModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Giriş Yap</Text>
          <TextInput
            style={styles.input}
            placeholder="Kullanıcı Adı"
            onChangeText={setUsername}
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
          <Text style={styles.modalTitle}>Kayıt Ol</Text>
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

      {/* StatusBar */}
      <StatusBar style="auto" />
    </View>
  );
}












const SecondPage = () => {
  const [currentPage, setCurrentPage] = useState('Hesabım');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false); // Yeni ekledim.

  const switchPage = (page) => {
    setCurrentPage(page);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAddingCard = () => {
    setIsAddingCard(!isAddingCard); // Toggle fonksiyonu ile durumu değiştir.
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'Hesabım':
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Kişisel bilgiler</Text>
          </View>
        );
      case 'Kredi Kartım':
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Kredi kartı bilgileri</Text>
          </View>
        );
      case 'Net Varlığım':
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Grafik</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const renderMenu = () => {
    if (isMenuOpen) {
      return (
        <View style={{ backgroundColor: '#000000', width: 350, height: '300%', position: 'absolute', top: 130, left: 0 }}>
          <Button title="A" onPress={() => console.log('A pressed')} />
          <Button title="B" onPress={() => console.log('B pressed')} />
          <Button title="C" onPress={() => console.log('C pressed')} />
          <Button title="D" onPress={() => console.log('D pressed')} />
          <Button title="E" onPress={() => console.log('E pressed')} />
          <Button title="F" onPress={() => console.log('F pressed')} />
          <Button title="G" onPress={() => console.log('G pressed')} />
          <Button title="H" onPress={() => console.log('H pressed')} />
          <Button title="J" onPress={() => console.log('J pressed')} />
          <Button title="K" onPress={() => console.log('K pressed')} />
        </View>
      );
    } else {
      return null;
    }
  };

  const renderCardAdding = () => {
    if (isAddingCard) {
      return (
        <View style={{ backgroundColor: 'white', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 2 }}>
          {/* Buraya kart ekleme formunu yerleştirin */}
          <Text>Kart ekleme formu buraya gelecek</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2, backgroundColor: '#1E90FF', justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 25 ,paddingTop:15}}>
        <Text style={{ fontSize: 32, color: '#000', textAlign: "left" }}>CÜZDANIM</Text>
        <TouchableOpacity style={{ position: 'absolute', top: 80, left: 10 }} onPress={toggleMenu}>
          <Text style={{ fontSize: 34, color: '#000' }}>☰</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 3, backgroundColor: '#FFFFFF' }}>
        {renderPageContent()}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10 }}>
          <Button title="Hesabım" onPress={() => switchPage('Hesabım')} color="#1E90FF" />
          <Button title="Kartlarım" onPress={() => switchPage('Kredi Kartım')} color="#1E90FF" />
          <Button title="Net Varlığım" onPress={() => switchPage('Net Varlığım')} color="#1E90FF" />
          {/* Yeni kart ekleme butonu */}
          <TouchableOpacity onPress={toggleAddingCard}>
            <Text style={{ fontSize: 24 }}>➕</Text>
          </TouchableOpacity>
        </View>
      </View>
      {renderMenu()}
      {renderCardAdding()}
      {/* Küçük beyaz saydam dikdörtgen */}
      <View style={{ position: 'absolute', bottom: 470, backgroundColor: 'rgba(255, 255, 255, 0.7)', width: '80%', paddingHorizontal: 30, paddingVertical: 35 }}>
        <Text>Kartın Numarası</Text>
        <Text>                                                         CVV</Text>
        
        <Text></Text> 
        
        <Text>                                             Ödeme altyapısı</Text>
      </View>
    </View>
  );
};






















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
    marginTop: -346,
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
});
