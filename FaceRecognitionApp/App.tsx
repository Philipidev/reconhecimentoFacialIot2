import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AddFaceScreen from './src/components/AddFaceScreen';
import ValidateFaceScreen from './src/components/ValidateFaceScreen';
// import CameraFeedScreen from './src/components/CameraFeedScreen';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddFace')}
        style={{ backgroundColor: 'dodgerblue', padding: 12, borderRadius: 8, width: '60%', alignItems: 'center' }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
          Adicionar Rosto
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ValidateFace')}
        style={{ backgroundColor: 'dodgerblue', padding: 12, borderRadius: 8, width: '60%', alignItems: 'center', marginTop: 20 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
          Validar Rosto
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('CameraFeed')}
        style={{ backgroundColor: 'lightgrey', padding: 12, borderRadius: 8, width: '60%', alignItems: 'center', marginTop: 20 }}
        disabled
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'grey', textAlign: 'center' }}>
          Feed da Câmera{'\n'}DESENVOLVIMENTO
        </Text>
      </TouchableOpacity>
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
