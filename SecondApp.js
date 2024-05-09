import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput, Modal, Image, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, addDoc, query, getDocs } from 'firebase/firestore';
import { Linking } from 'react-native';
import RNExitApp from 'react-native-exit-app';

// Firebase yapılandırma
const firebaseConfig = {
  apiKey: "AIzaSyAWABMzjyrbtZNWgKAg1dF0x5r44a1ET7o",
  authDomain: "cuzdanapp-fe2fd.firebaseapp.com",
  projectId: "cuzdanapp-fe2fd",
  storageBucket: "cuzdanapp-fe2fd.appspot.com",
  messagingSenderId: "970331204744",
  appId: "1:970331204744:web:46467c40a96aec7b39c33d",
  measurementId: "G-PYXZSLN032"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Firestore bağlantısı

const SecondPage = () => {
  const [currentPage, setCurrentPage] = useState('Hesabım');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const cardsCollection = collection(db, 'cards');
      const querySnapshot = await getDocs(cardsCollection);
      const fetchedCards = [];
      querySnapshot.forEach((doc) => {
        fetchedCards.push({ id: doc.id, ...doc.data() });
      });
      setCards(fetchedCards);
    };

    fetchCards();
  }, []);

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
            <FlatList
              data={cards}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View>
                  <Text>Kart Numarası: {item.cardNumber}</Text>
                  <Text>Kart Tipi: {item.cardType}</Text>
                  <Text>Son Kullanma Tarihi: {item.expiryDate}</Text>
                  <Text>CVV: {item.cvv}</Text>
                </View>
              )}
            />
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
        <View style={{ backgroundColor: '#000000', width: 320, height: '330%', position: 'absolute', top: 110, left: 0 ,zIndex:100 }}>
          <Button class="boyut" title="ÖDEMELER" onPress={() =>Linking.openURL('https://www.ziraatbank.com.tr/tr/bireysel/odemeler')} />
          <Button class="boyut" title="KREDİLER" onPress={() => Linking.openURL('https://www.hangikredi.com/kredi/ihtiyac-kredisi/sorgulama')} />
          <Button class="boyut" title="DÖVİZ VE ALTIN" onPress={() => Linking.openURL('https://tr.investing.com/currencies/xau-usd')} />
          <Button class="boyut" title="AÇIK BANKACILIK İŞLEMLERİ" onPress={() => Linking.openURL('https://www.ziraatbank.com.tr/tr/sss/dijital-bankacilik/acik-bankacilik')} />
          <Button class="boyut" title="CÜZDAN UYGULAMASI HAKKINDA" onPress={() => Linking.openURL('https://www.ideasoft.com.tr/dijital-cuzdan-nedir-nasil-kullanilir/')} />
          <Button class="boyut" title="GÜVENLİ ÇIKIŞ" onPress={() => RNExitApp.exitApp()} />
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
            <Text>Son Kullanma Tarihi: {expiryDate.toLocaleDateString()}</Text>
            <Text></Text>
            {cardImage && <Image source={cardImage} style={{ width: 79, height: 60, marginBottom: -30 }} />}
          </View>
          {/* Geri tuşu */}
          <TouchableOpacity onPress={toggleAddingCard} style={{ position: 'absolute', top: 20, left: 20, fontSize: 12 }}>
            <AntDesign name="back" size={34} color="black" />
            <Text> Geri</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  const saveCard = async () => {
    const newCard = {
      cardNumber: cardNumber,
      cardType: cardType,
      cvv: cvv,
      expiryDate: expiryDate.toLocaleDateString() // Son kullanma tarihini string olarak kaydetmek için
    };

    try {
      const docRef = await addDoc(collection(db, 'cards'), newCard);
      console.log('Kart başarıyla Firestore\'a kaydedildi with ID: ', docRef.id);
      setCards([...cards, newCard]); // State'e yeni kartı ekleyin
      // Kart bilgilerini sıfırla ve kart ekleme modunu kapat
      setCardNumber('');
      setCardType('');
      setCvv('');
      setExpiryDate(new Date());
      setIsAddingCard(false);
    } catch (error) {
      console.error('Firestore\'a kart kaydederken hata oluştu:', error);
    }
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
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Tarih: {expiryDate.toLocaleDateString()}</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>                                             CVV: {cvv}</Text>
        <TouchableOpacity onPress={saveCard} style={{ marginTop: 20, marginBottom:23,}}>
          <Text style={{ color: 'blue' }}>Kartı Kaydet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SecondPage;
