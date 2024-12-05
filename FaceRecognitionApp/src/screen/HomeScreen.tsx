import { View, StyleSheet, Text } from 'react-native';
import ButtonComponent from "../components/ButtonComponent";
import { NavigationProps } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';
import { conceedAccess } from '../../services/api';
import Toast from 'react-native-toast-message';

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProps>();

    const handleConceedAccess = async () => {
        try {
            await conceedAccess();
            Toast.show({
                type: 'success',
                text1: 'Acesso liberado.',
            });
        } catch (error) {
            console.error('Erro ao liberar: ', error);
            Toast.show({
                type: 'error',
                text1: 'Erro ao liberar. Por favor, tente novamente.',
            });
        }
    };

    return (
        <View style={Styles.container}>
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
                onPress={handleConceedAccess}
                buttonText={'Liberar Acesso'}
                hasMargin
            />
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default HomeScreen;
