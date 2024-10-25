import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { recognizeFace } from '../../services/api'; // Importa a função recognizeFace
import ButtonComponent from '../components/ButtonComponent';
import ImageComponent from '../components/ImageComponent';

const ValidateFaceScreen: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [ehErro, setEhErro] = useState<boolean>(false);

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
      setMessage('Por favor, selecione uma imagem para validar.');
      return;
    }

    try {
      const response = await recognizeFace(photo); // Utiliza a função recognizeFace do api.ts
      if (response.access_granted) {
        setMessage(`Acesso concedido. Rosto reconhecido: ${response.recognized_face}`);
        setEhErro(false);
      } else {
        setMessage('Acesso negado. Rosto não reconhecido.');
        setEhErro(true);
      }
    } catch (error) {
      console.error('Erro ao validar imagem: ', error);
      setEhErro(true);
      setMessage('Erro ao validar rosto. Por favor, tente novamente.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
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
      {message ? <Text style={ehErro ? [styles.messageStyle, { color: '#d9534f' }] : styles.messageStyle}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  messageStyle: {
    marginTop: 20,
    fontSize: 16,
    color: '#71d94f',
  },
});

export default ValidateFaceScreen;
