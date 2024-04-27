import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import firebase from 'firebase/app';
import 'firebase/auth';

// GoogleSignin yapılandırması
GoogleSignin.configure({
  webClientId: '970331204744-0ojgtimct3jrhg2ikvtqa875dctbnm04.apps.googleusercontent.com', // Web istemci kimliği
});

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyAWABMzjyrbtZNWgKAg1dF0x5r44a1ET7o",
  authDomain: "cuzdanapp-fe2fd.firebaseapp.com",
  projectId: "cuzdanapp-fe2fd",
  storageBucket: "cuzdanapp-fe2fd.appspot.com",
  messagingSenderId: "970331204744",
  appId: "1:970331204744:web:46467c40a96aec7b39c33d",
  measurementId: "G-PYXZSLN032"
};

// Firebase initialize
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const GoogleLoginButton = () => {
  const signInWithGoogle = async () => {
    try {
      // Google hesabıyla oturum açma işlemi
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      // Google hesabıyla oturum açıldıktan sonra Firebase'e giriş yapma
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken);
      await firebase.auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Kullanıcı girişi iptal etti');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Giriş işlemi zaten devam ediyor');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Servisleri kullanılamıyor');
      } else {
        console.log('Bilinmeyen bir hata oluştu', error);
      }
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={signInWithGoogle}>
      <Text style={styles.buttonText}>Google ile Giriş Yap</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Google ile giriş yap butonu */}
      <GoogleLoginButton />
    </View>
  );
};

export default index;


