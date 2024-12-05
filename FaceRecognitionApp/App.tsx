import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import AddFaceScreen from './src/screen/AddFaceScreen';
import ValidateFaceScreen from './src/screen/ValidateFaceScreen';
import HomeScreen from './src/screen/HomeScreen';

export interface NavigationProps {
    navigate: (screen: string) => void;
    goBack: () => void;
    setOptions: (
        options: {
            headerTitle?: string,
            headerShown?: boolean
        }
    ) => void;
}

const App = () => {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <StatusBar style="dark" backgroundColor='white' />
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
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
}

export default gestureHandlerRootHOC(App);
