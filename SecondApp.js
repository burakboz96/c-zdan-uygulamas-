import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput, Modal, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const SecondPage = () => {
  const [currentPage, setCurrentPage] = useState('Hesabım');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  const switchPage = (page) => {
    setCurrentPage(page);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAddingCard = () => {
    setIsAddingCard(!isAddingCard);
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
      let cardImage;
      switch (cardType) {
        case 'VISA':
          cardImage = require('./visa.png');
          break;
        case 'MASTERCARD':
          cardImage = require('./mastercard.png');
          break;
        case 'TROY':
          cardImage = require('./troy.png');
          break;
        default:
          cardImage = null;
          break;
      }

      return (
        <View style={{ backgroundColor: 'white', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 2 }}>
          <View style={{ width: 300, height: 430, backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center', borderRadius: 10, alignSelf: 'center', marginTop: 100 }}>
            <TextInput
              style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => setCardNumber(text.replace(/\D/g, '').substring(0, 16))}
              value={cardNumber}
              placeholder=" Kart Numarası (16 hane)"
              keyboardType="numeric"
            />
            <TextInput
              style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
              onChangeText={text => setCvv(text.replace(/\D/g, '').substring(0, 3))}
              onBlur={() => detectCardType(cardNumber)}
              value={cvv}
              placeholder=" CVV (3 hane)"
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginTop: 20 }}>
              <Text style={{ color: 'blue' }}>Son Kullanma Tarihi Seç</Text>
              <Text></Text>
            </TouchableOpacity>
            <Text  >Son Kullanma Tarihi:  {expiryDate.toLocaleDateString()}</Text>
            <Text  ></Text>
            {cardImage && <Image source={cardImage} style={{ width: 79, height: 60, marginBottom: -30 }} />}
          </View>
          {/* Geri tuşu */}
          <TouchableOpacity onPress={toggleAddingCard} style={{ position: 'absolute', top: 20, left: 20, fontSize: 12 }}>
            <AntDesign name="back" size={34} color="black" />
            <Text > Geri</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  const saveCard = () => {
    // Kartı kaydetmek için gerekli işlemler buraya gelecek
    console.log('Kart kaydedildi');
  };

  const detectCardType = (cardNumber) => {
    const visaPattern = /^4/;
    const mastercardPattern = /^5/;
    const troyPattern = /^6/;

    if (visaPattern.test(cardNumber)) {
      setCardType('VISA');
    } else if (mastercardPattern.test(cardNumber)) {
      setCardType('MASTERCARD');
    } else if (troyPattern.test(cardNumber)) {
      setCardType('TROY');
    } else {
      setCardType('');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2, backgroundColor: '#1E90FF', justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 25, paddingTop: 15 }}>
        <Text style={{ fontSize: 32, color: '#000', textAlign: "left" }}>CÜZDANIM</Text>
        <TouchableOpacity style={{ position: 'absolute', top: 70, left: 10 }} onPress={toggleMenu}>
          <Text style={{ fontSize: 34, color: '#000' }}>☰</Text>
        </TouchableOpacity>
        {/* Sağ üst köşeye bildirim ve metin simgeleri */}
        <View style={{ position: 'absolute', top: 40, right: 10, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => console.log('Bildirim iconuna tıklandı')}>
            <MaterialIcons name="notifications" size={31} color="white" top={-24} />
            <Text style={{ fontSize: 24, color: '#000', marginRight: 45 }}> </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('İletişim iconuna tıklandı')}>
            <Fontisto name="comment" size={24} color="white" top={-20} />
            <Text style={{ fontSize: 24, color: '#000', top: -24 }}></Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 3, backgroundColor: '#xxx' }}>
        {renderPageContent()}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10 }}>
          <Button title="Hesabım" onPress={() => switchPage('Hesabım')} color="#013682" />
          <Button title="Kartlarım" onPress={() => switchPage('Kredi Kartım')} color="#013682" />
          <Button title="Net Varlığım" onPress={() => switchPage('Net Varlığım')} color="#013682" />
          <TouchableOpacity onPress={toggleAddingCard}>
            <Text style={{ fontSize: 37, left: '5%', bottom: '50px', top: '70px' }} >➕</Text>
          </TouchableOpacity>
        </View>
      </View>
      {renderMenu()}
      {renderCardAdding()}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <DateTimePicker
            value={expiryDate}
            mode="date"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || expiryDate;
              setExpiryDate(currentDate);
              setModalVisible(!modalVisible);
            }}
          />
        </View>
      </Modal>
      <View style={{ position: 'absolute', bottom: 460, backgroundColor: 'rgba(255, 255, 255, 0.7)', width: '87%', paddingHorizontal: 40, paddingVertical: 30,height:'24%'}}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Kartın Numarası: {cardNumber}</Text> 
        
        
    
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Ödeme Yöntemi: {cardType}</Text>
        <Text></Text>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Tarih: {expiryDate.toLocaleDateString()}</Text><Text style={{ fontWeight: 'bold', fontSize: 16 }}>                                             CVV: {cvv}</Text>



        <TouchableOpacity onPress={saveCard} style={{ marginTop: 20, marginBottom:23,}}>
          <Text style={{ color: 'blue' }}>Kartı Kaydet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SecondPage;
