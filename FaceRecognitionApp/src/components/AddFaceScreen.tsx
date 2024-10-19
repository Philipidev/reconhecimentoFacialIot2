import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addFace } from '../../services/api';

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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <Button title="Selecionar Imagem" onPress={selectPhoto} />
      {photo && (
        <Image
          source={{ uri: photo }}
          style={styles.image}
        />
      )}
      <Button title="Adicionar Rosto" onPress={uploadPhoto} />
      {message ? <Text style={
        ehErro ? [styles.message, { color: '#d9534f' }] : styles.message
        }>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: '#71d94f',
  },
  button:{
    marginTop: 20,
  }
});

export default AddFaceScreen;
