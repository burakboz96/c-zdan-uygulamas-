import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';


const SecondPage = () => {
  const [currentPage, setCurrentPage] = useState('Hesabım');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

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
      return (
        <View style={{ backgroundColor: 'white', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 2 }}>
          {/* */}
          <Text>Kart ekleme formu buraya gelecek</Text>
          {/* Geri tuşu */}
          <TouchableOpacity onPress={toggleAddingCard} style={{ position: 'absolute', top: 40, left: 20 ,fontSize:23}}>
            <Text >Geri</Text>
          </TouchableOpacity>
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
          <TouchableOpacity onPress={toggleAddingCard}>
            <Text style={{ fontSize: 37 ,left: '5%',bottom: '50px',top:'70px' }} >➕</Text>
          </TouchableOpacity>
        </View>
      </View>
      {renderMenu()}
      {renderCardAdding()}
      <View style={{ position: 'absolute', bottom: 470, backgroundColor: 'rgba(255, 255, 255, 0.7)', width: '80%', paddingHorizontal: 30, paddingVertical: 35 }}>
      <Text>Kartın Numarası</Text>
        <Text>                                                         CVV</Text>
        
        <Text></Text> 
        
        <Text>                                             Ödeme altyapısı</Text>
      </View>
      
    </View>
  );
};



export default SecondPage;
