import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { View } from 'react-native';
import ButtonComponent from './src/components/ButtonComponent';
import AddFaceScreen from './src/screen/AddFaceScreen';
import ValidateFaceScreen from './src/screen/ValidateFaceScreen';
// import CameraFeedScreen from './src/components/CameraFeedScreen';

const Stack = createStackNavigator();

function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <ButtonComponent
        onPress={() => navigation.navigate('AddFace')}
        buttonText={'Adicionar Rosto'}
      />
      <ButtonComponent
        onPress={() => navigation.navigate('ValidateFace')}
        buttonText={'Validar Rosto'}
        hasMargin
      />
      <ButtonComponent
        onPress={() => navigation.navigate('CameraFeed')}
        buttonText={'Feed da Câmera\nDESENVOLVIMENTO'}
        hasMargin
        isDisabled
      />
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Menu Principal',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: '700',
            },
          }}
        />
        <Stack.Screen
          name="AddFace"
          component={AddFaceScreen}
          options={{
            title: 'Adicionar Rosto',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: '700',
            },
          }}
        />
        <Stack.Screen
          name="ValidateFace"
          component={ValidateFaceScreen}
          options={{
            title: 'Validar Rosto',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: '700',
            },
          }}
        />
        {/* <Stack.Screen
          name="CameraFeed"
          component={CameraFeedScreen}
          options={{
            title: 'Feed da Câmera',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: '700',
            },
          }}
        /> */}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default gestureHandlerRootHOC(App);
