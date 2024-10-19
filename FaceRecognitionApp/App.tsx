import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Button, StyleSheet } from 'react-native';
import AddFaceScreen from './src/components/AddFaceScreen';
import ValidateFaceScreen from './src/components/ValidateFaceScreen';
// import CameraFeedScreen from './src/components/CameraFeedScreen';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }:any) {
  return (
    <View style={styles.container}>
      <Button title="Adicionar Rosto" onPress={() => navigation.navigate('AddFace')} />
      <Button title="Validar Rosto" onPress={() => navigation.navigate('ValidateFace')} style={{ marginTop: 20 }} />
      {/*<Button title="Feed da Câmera" onPress={() => navigation.navigate('CameraFeed')} style={{ marginTop: 20 }} />*/}
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Menu Principal' }} />
        <Stack.Screen name="AddFace" component={AddFaceScreen} options={{ title: 'Adicionar Rosto' }} />
        <Stack.Screen name="ValidateFace" component={ValidateFaceScreen} options={{ title: 'Validar Rosto' }} />
        {/*<Stack.Screen name="CameraFeed" component={CameraFeedScreen} options={{ title: 'Feed da Câmera' }} />*/}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default gestureHandlerRootHOC(App);
