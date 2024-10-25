import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addFace } from '../../services/api';
import ButtonComponent from '../components/ButtonComponent';
import ImageComponent from '../components/ImageComponent';

const AddFaceScreen: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
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

  const uploadPhoto = async () => {
    if (!name) {
      setMessage('Por favor, insira um nome.');
      setEhErro(true);
      return;
    }

    if (!photo) {
      setMessage('Por favor, selecione uma imagem.');
      setEhErro(true);
      return;
    }

    try {
      const response = await addFace(name, photo); // Utiliza a função addFace do api.ts
      setMessage(response);
      setEhErro(false);
    } catch (error) {
      console.error('Erro ao enviar imagem: ', error);
      setEhErro(true);
      setMessage('Erro ao adicionar rosto. Por favor, tente novamente.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={styles.input}
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
      {message ? <Text style={ehErro ? [styles.messageStyle, { color: '#d9534f' }] : styles.messageStyle}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  messageStyle: {
    marginTop: 20,
    fontSize: 16,
    color: '#71d94f',
  },
});

export default AddFaceScreen;
