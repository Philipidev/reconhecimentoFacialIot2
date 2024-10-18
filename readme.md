# Controle de Acesso com NFC e Reconhecimento Facial

## Descrição

Este projeto implementa um sistema de controle de acesso usando **Raspberry Pi 3** para ler cartões NFC e capturar imagens de uma **câmera IP**. As imagens são enviadas para um **backend** para processamento de reconhecimento facial, e com base no resultado do reconhecimento, o sistema ativa um relé que controla o acesso (abrindo uma porta, por exemplo).

### Funcionalidades
- **Leitura de NFC**: Leitura e verificação de cartões NFC para concessão de acesso.
- **Reconhecimento Facial**: Captura de imagens de uma câmera IP e envio para o backend para análise.
- **Controle de Acesso**: Ativação de relé baseado no reconhecimento facial ou validação de cartão NFC.

## Estrutura do Projeto

```
reconhecimento_facial_iot/
│
├── backend/
│   ├── static/
│   ├── templates/
│   │   ├── add_face.html        # Interface para adicionar rostos ao sistema.
│   │   ├── index.html           # Página inicial do sistema.
│   │   └── recognize.html       # Interface para teste de reconhecimento facial.
│   ├── uploads/                 # Diretório para armazenar imagens enviadas.
│   ├── app.py                   # API principal para reconhecimento facial.
│   ├── dlib_face_recognition_resnet_model_v1.dat # Modelo de rede neural para extração de descritores faciais (pré-treinado).
│   ├── shape_predictor_68_face_landmarks.dat     # Modelo para identificar pontos faciais (landmarks).
│   ├── known_faces.pkl          # Arquivo contendo os descritores faciais dos usuários cadastrados.
│   └── requirements.txt         # Dependências do backend (Flask, dlib, etc.).
│
├── raspberry/
│   ├── capture_and_send.py      # Script do Raspberry Pi para capturar e enviar imagens.
│   ├── config.py                # Configurações da câmera IP, backend e GPIO.
│   └── requirements.txt         # Dependências do Raspberry Pi (OpenCV, requests, RPi.GPIO).
│
└── readme.md                    # Documentação do projeto.
```

## Arquivos Explicados

### Backend

- **static/**: Pasta para armazenar arquivos estáticos, como imagens ou arquivos CSS para estilizar a aplicação.
- **templates/**: Contém as páginas HTML usadas para interagir com o sistema.
  - **add_face.html**: Página para adicionar novos rostos ao sistema. O usuário faz o upload de uma imagem e fornece um nome.
  - **index.html**: Página inicial do sistema, que apresenta as funcionalidades principais.
  - **recognize.html**: Página para realizar testes de reconhecimento facial, onde uma imagem é carregada e analisada para determinar se o rosto é reconhecido.
- **uploads/**: Diretório para armazenar imagens enviadas pelo usuário.
- **app.py**: Código principal da API em Flask, que gerencia o reconhecimento facial, a adição de novos rostos e as interfaces web.
- **dlib_face_recognition_resnet_model_v1.dat**: Arquivo contendo um modelo de rede neural convolucional pré-treinado para extração de descritores faciais. Esse modelo é usado para calcular características faciais que são únicas para cada pessoa.
- **shape_predictor_68_face_landmarks.dat**: Arquivo contendo um modelo que detecta 68 pontos de referência (landmarks) no rosto, como a posição dos olhos, nariz e boca. Esses pontos são usados para alinhar o rosto antes de extrair o descritor facial.
- **known_faces.pkl**: Arquivo gerado automaticamente que contém os descritores faciais das pessoas registradas. Ele é carregado na memória para verificar se um rosto é reconhecido quando uma imagem é enviada.
- **requirements.txt**: Contém as bibliotecas necessárias para rodar o backend, como Flask, dlib, e OpenCV.

### Raspberry Pi

- **capture_and_send.py**: Script que captura imagens da câmera IP conectada ao Raspberry Pi e as envia para o backend para análise. Ele também gerencia o controle do relé para abrir a porta em caso de reconhecimento bem-sucedido.
- **config.py**: Arquivo de configuração contendo informações como a URL da câmera IP, o endereço do backend, e a configuração dos pinos GPIO do Raspberry Pi.
- **requirements.txt**: Lista de dependências necessárias para rodar o script do Raspberry Pi, incluindo bibliotecas como OpenCV, RPi.GPIO e requests.

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

## Testes

### Testando o Sistema:
1. **Reconhecimento Facial**: Acesse o feed da câmera IP via o navegador usando o IP da câmera para visualizar o stream em tempo real.
2. **Leitura de NFC**: Aproximar o cartão NFC do leitor para verificar se o acesso será concedido.
3. **Verificação do Relé**: Após um rosto conhecido ser detectado ou um cartão válido ser lido, o relé será ativado por 5 segundos.

### Logs e Depuração
Monitore a saída no terminal do Raspberry Pi e do backend para verificar se as imagens estão sendo capturadas e enviadas corretamente.

## Contribuições

Fique à vontade para contribuir com melhorias, correções ou novas funcionalidades. Sugestões são sempre bem-vindas!
