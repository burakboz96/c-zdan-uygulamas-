// NotificationComponent.js

import React from 'react';
import { View, Text, FlatList } from 'react-native';

const NotificationComponent = ({ route }) => {
  const { bildirimler } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Bildirimler</Text>
      <FlatList
        data={bildirimler}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.baslik}</Text>
            <Text>{item.mesaj}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default NotificationComponent;
