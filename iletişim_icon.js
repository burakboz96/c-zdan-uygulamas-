import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput, Modal, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

const ContactScreen = () => {
  const [complaintOrRequest, setComplaintOrRequest] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleComplaintOrRequest = async () => {
    if (!complaintOrRequest.trim()) {
      Alert.alert('Hata', 'Lütfen bir mesaj girin.');
      return;
    }

    const emailContent = {
      recipients: ['destek@cuzdanapp.com'],
      subject: 'Cüzdan Uygulaması İletişim Formu',
      body: `Kullanıcı İstek/Şikayeti: ${complaintOrRequest}`
    };

    try {
      await MailComposer.composeAsync(emailContent);
      setIsMessageSent(true);
    } catch (error) {
      console.error('E-posta gönderirken hata oluştu:', error);
      Alert.alert('Hata', 'E-posta gönderilirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={toggleModal}>
        <Fontisto name="comment" size={100} color="blue" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            placeholder="Şikayet veya isteklerinizi buraya yazın..."
            onChangeText={text => setComplaintOrRequest(text)}
            value={complaintOrRequest}
            multiline
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, width: '80%', minHeight: 200 }}
          />
          <Button title="Gönder" onPress={handleComplaintOrRequest} />
          {isMessageSent && <Text style={{ marginTop: 10, color: 'green' }}>Mesajınız başarıyla gönderildi!</Text>}
        </View>
      </Modal>
    </View>
  );
};

export { SecondPage, ContactScreen };
