import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ValidateFaceScreen: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

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

    const formData = new FormData();
    formData.append('file', {
      uri: photo,
      type: 'image/jpeg',
      name: 'photo.jpg'
    });

    try {
      const response = await axios.post('http://<backend_ip>:5000/recognize', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.access_granted) {
        setMessage(`Acesso concedido. Rosto reconhecido: ${response.data.recognized_face}`);
      } else {
        setMessage('Acesso negado. Rosto não reconhecido.');
      }
    } catch (error) {
      console.error('Erro ao validar imagem: ', error);
      setMessage('Erro ao validar rosto. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Selecionar Imagem" onPress={selectPhoto} />
      {photo && (
        <Image
          source={{ uri: photo }}
          style={styles.image}
        />
      )}
      <Button title="Validar Rosto" onPress={validatePhoto} style={{ marginTop: 20 }} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: '#d9534f',
  },
});

export default ValidateFaceScreen;
