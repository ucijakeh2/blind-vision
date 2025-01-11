import { Text, View } from "react-native";
import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function Index() {
  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text className="text-red-500 text-2xl font-bold">Edit app/index.tsx to edit this screen.</Text>
      </View>
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
    </PaperProvider>
  );
}