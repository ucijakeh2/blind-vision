import { Text, View } from "react-native";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Link, Redirect } from "expo-router";

export default function Index() {
  
  // In-progress: this should be changed to if user logged in
  if (true) {return <Redirect href="/(tabs)/home"/>}

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text className="text-red-500 text-2xl font-bold">Edit app/index.tsx to edit this screen.</Text>
        <Link href="/sign-in">Go to auth</Link>
      </View>
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
    </>
  );
}