import axios from 'axios';

const NGROK_BACK_URL = "https://7516-2804-7f2-24c0-90a3-612b-1680-7cef-b8c3.ngrok-free.app/";
const NGROK_BERRY_URL = "https://1d0a-2804-7f2-24c0-90a3-9a7e-9ab8-7141-5dec.ngrok-free.app/";

export const addFace = async (name: string, imageUri: string, qtd: number = 0) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'face.jpg'
  } as any);

  try {
    const response = await axios.post(`${NGROK_BACK_URL}add_face`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    try {
      if (qtd == 4)
        throw error;
      qtd = qtd + 1;
      return await addFace(name, imageUri, qtd)
    } catch (e) {
      console.error('Erro ao reconhecer rosto2:', JSON.stringify(error, null, 2))
      throw e;
    }
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
    const response = await axios.post(`${NGROK_BACK_URL}recognize`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 10000
    });
    return response.data;
  } catch (error) {
    console.info('Erro ao reconhecer rosto1:', JSON.stringify(error, null, 2))
    try {

      return await recognizeFace(imageUri)
    } catch (e) {
      console.error('Erro ao reconhecer rosto2:', JSON.stringify(error, null, 2))
      throw e;
    }
  }
};

export const conceedAccess = async () => {
  try {
    const response = await axios.post(`${NGROK_BERRY_URL}activate_relay_success`);
    return response.data;
  } catch (error) {
    console.error('Erro ao liberar acesso:', error);
    throw error;
  }
};

export const abdicateAccess = async () => {
  try {
    const response = await axios.post(`${NGROK_BERRY_URL}activate_relay_failed`);
    return response.data;
  } catch (error) {
    console.error('Erro ao negar acesso:', error);
    throw error;
  }
};
