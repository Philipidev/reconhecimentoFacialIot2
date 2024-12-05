import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addFace } from '../../services/api';
import ButtonComponent from '../components/ButtonComponent';
import ImageComponent from '../components/ImageComponent';
import Toast from 'react-native-toast-message';

const AddFaceScreen: React.FC = () => {
    const [photo, setPhoto] = useState<string | null>(null);
    const [name, setName] = useState<string>('');

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

    const uploadPhoto = async () => {
        if (!name) {
            Toast.show({
                type: 'info',
                text1: 'Por favor, insira um nome.',
            });
            return;
        }

        if (!photo) {
            Toast.show({
                type: 'info',
                text1: 'Por favor, selecione uma imagem.',
            });
            return;
        }

        try {
            const response = await addFace(name, photo);
            Toast.show({
                type: 'success',
                text1: response,
            });
        } catch (error) {
            console.error('Erro ao enviar imagem: ', error);
            Toast.show({
                type: 'error',
                text1: 'Erro ao adicionar rosto. Por favor, tente novamente.',
            });
        }
    };

    return (
        <View style={Styles.container}>
            <TextInput
                style={Styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
            />
            <ButtonComponent
                onPress={selectPhoto}
                buttonText={'Selecionar Imagem'}
            />
            <ButtonComponent
                onPress={uploadPhoto}
                buttonText={'Adicionar Rosto'}
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
        padding: 20
    },
    input: {
        height: 50,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default AddFaceScreen;
