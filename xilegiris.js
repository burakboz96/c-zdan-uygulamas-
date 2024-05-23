// xilegiris.js

import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { RNTwitterSignIn } from 'react-native-twitter-signin';

const TWITTER_CONSUMER_KEY = 'dvcN5z9gfQ9EZrTxiMMbOUDLx';
const TWITTER_CONSUMER_SECRET = 'tmyot6OextCvNUaj9TlGK6UUp4orpfhC5t8BeMigBoP4AKz2x8';

const XileGiris = ({ navigation }) => {

  const twitterSignIn = async () => {
    try {
      await RNTwitterSignIn.init(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET);
      const loginData = await RNTwitterSignIn.logIn();
      
      if (loginData) {
        console.log(loginData);
        navigation.navigate('SecondPage'); // Login successful, navigate to SecondPage
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Twitter ile Giriş Yap"
        onPress={twitterSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default XileGiris;
