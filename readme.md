# Controle de Acesso com NFC e Reconhecimento Facial

## Descrição

Este projeto implementa um sistema de controle de acesso usando **Raspberry Pi 3** para ler cartões NFC e capturar imagens de uma **câmera IP**. As imagens são enviadas para um **backend** para processamento de reconhecimento facial, e com base no resultado do reconhecimento, o sistema ativa um relé que controla o acesso (abrindo uma porta, por exemplo).

### Funcionalidades
- **Leitura de NFC**: Leitura e verificação de cartões NFC para concessão de acesso.
- **Reconhecimento Facial**: Captura de imagens de uma câmera IP e envio para o backend para análise.
- **Controle de Acesso**: Ativação de relé baseado no reconhecimento facial ou validação de cartão NFC.

## Estrutura do Projeto

```
access-control-system/
│
├── backend/
│   ├── app.py                  # API principal para reconhecimento facial
│   ├── requirements.txt         # Dependências do backend (Flask, dlib, etc.)
│   └── static/
│       └── index.html           # Página web para visualizar o feed da câmera IP
│
├── raspberry/
│   ├── capture_and_send.py      # Script do Raspberry Pi para capturar e enviar imagens
│   ├── config.py                # Configurações da câmera IP, backend e GPIO
│   └── requirements.txt         # Dependências do Raspberry Pi (OpenCV, requests, RPi.GPIO)
│
└── docs/
    └── README.md                # Documentação do projeto
```

## Requisitos de Hardware
- **Raspberry Pi 3** (ou superior)
- **Módulo NFC** (ex.: Adafruit PN532)
- **Relé** para controle de porta
- **Câmera IP** (ou celular configurado como câmera IP com aplicativos como IP Webcam)
- **Cartões NFC**
- **LEDs e Buzzer** para feedback visual e sonoro

## Configuração e Instalação

### 1. Backend

O backend é responsável por processar as imagens enviadas pelo Raspberry Pi e realizar o reconhecimento facial. O backend foi implementado usando Flask e utiliza **dlib** ou **OpenCV** para detectar rostos nas imagens.

#### Passos:
1. Clone o projeto ou copie os arquivos necessários para o servidor.
2. Instale as dependências do backend:

   ```bash
   cd backend
   pip3 install -r requirements.txt
   ```

3. Execute o servidor Flask:

   ```bash
   python3 app.py
   ```

4. Acesse o backend via `http://<backend_ip>:5000`.

### 2. Raspberry Pi

O Raspberry Pi captura imagens da câmera IP, envia para o backend e controla o relé com base no resultado do reconhecimento facial.

#### Passos:
1. Instale as dependências no Raspberry Pi:
   ```bash
   cd raspberry
   pip3 install -r requirements.txt
   ```

2. Configure os detalhes da câmera IP e o backend no arquivo `config.py`:
   ```python
   RTSP_URL = 'rtsp://<camera_ip>:8080/video'
   BACKEND_URL = 'http://<backend_ip>:5000/recognize'
   RELAY_PIN = 17  # Pino GPIO do relé
   ```

3. Execute o script principal no Raspberry Pi:
   ```bash
   python3 capture_and_send.py
   ```

### 3. Conexão dos Componentes

- Conecte o relé ao pino GPIO definido no `config.py` para controlar a abertura da porta.
- Conecte o módulo NFC ao Raspberry Pi conforme o mapeamento de pinos.

## Testes

### Testando o Sistema:
1. **Reconhecimento Facial**: Acesse o feed da câmera IP via o navegador usando o IP da câmera para visualizar o stream em tempo real.
2. **Leitura de NFC**: Aproximar o cartão NFC do leitor para verificar se o acesso será concedido.
3. **Verificação do Relé**: Após um rosto conhecido ser detectado ou um cartão válido ser lido, o relé será ativado por 5 segundos.

### Logs e Depuração
Monitore a saída no terminal do Raspberry Pi e do backend para verificar se as imagens estão sendo capturadas e enviadas corretamente.

## Contribuições

Fique à vontade para contribuir com melhorias, correções ou novas funcionalidades. Sugestões são sempre bem-vindas!