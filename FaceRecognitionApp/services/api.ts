import axios from 'axios';

const NGROK_URL = "https://9a2e-200-106-161-96.ngrok-free.app/";

export const API_URL = NGROK_URL;

export const addFace = async (name: string, imageUri: string) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'face.jpg'
  } as any);

  try {
    const response = await axios.post(`${API_URL}add_face`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar rosto:', error);
    throw error;
  }
};

export const recognizeFace = async (imageUri: string) => {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'face.jpg'
  } as any);

  try {
    const response = await axios.post(`${API_URL}recognize`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao reconhecer rosto:', error);
    throw error;
  }
};
