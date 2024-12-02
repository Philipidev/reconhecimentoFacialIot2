import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { conceedAccess } from '../../services/api';
import ButtonComponent from '../components/ButtonComponent';

const ConceedAccessScreen: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [ehErro, setEhErro] = useState<boolean>(false);

  const handleConceedAccess = async () => {
    try {
      await conceedAccess();
      setMessage('Acesso liberado.');
      setEhErro(false);
    } catch (error) {
      console.error('Erro ao liberar: ', error);
      setEhErro(true);
      setMessage('Erro ao liberar. Por favor, tente novamente.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <ButtonComponent
        onPress={handleConceedAccess}
        buttonText={'Liberar Acesso'}
        hasMargin
      />
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

export default ConceedAccessScreen;
