import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { abdicateAccess, conceedAccess, recognizeFace } from '../../services/api';
import ButtonComponent from '../components/ButtonComponent';
import ImageComponent from '../components/ImageComponent';
import Toast from 'react-native-toast-message';

const ValidateFaceScreen: React.FC = () => {
    const [photo, setPhoto] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                alert('Desculpe, precisamos de permissão para acessar a galeria.');
            }
        })();
    }, []);

    const selectPhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };

    const validatePhoto = async () => {
        if (!photo) {
            Toast.show({
                type: 'info',
                text1: 'Por favor, selecione uma imagem para validar.',
            });
            return;
        }

        try {
            const response = await recognizeFace(photo);

            if (response.access_granted) {
                await conceedAccess();
                Toast.show({
                    type: 'success',
                    text1: `Acesso concedido. Rosto reconhecido: ${response.recognized_face}`,
                });
            } else {
                await abdicateAccess();
                Toast.show({
                    type: 'error',
                    text1: 'Acesso negado. Rosto não reconhecido.',
                });
            }
        } catch (error) {
            console.error('Erro ao validar imagem: ', error);
            Toast.show({
                type: 'error',
                text1: 'Erro ao validar rosto. Por favor, tente novamente.',
            });
        }
    };

    return (
        <View style={Styles.container}>
            <ButtonComponent
                onPress={selectPhoto}
                buttonText={'Selecionar Imagem'}
            />
            <ButtonComponent
                onPress={validatePhoto}
                buttonText={'Validar Rosto'}
                isDisabled={!photo}
                hasMargin
            />
            {photo && (
                <ImageComponent
                    photo={photo}
                />
            )}
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});

export default ValidateFaceScreen;
