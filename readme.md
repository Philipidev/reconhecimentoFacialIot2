# Sistema de Controle de Acesso com Reconhecimento Facial

## Descrição Geral

Este projeto integra tecnologias modernas para criar um sistema de controle de acesso robusto. Ele utiliza o **Raspberry Pi** como controlador central, um backend em **Flask** para processamento de reconhecimento facial e um aplicativo móvel em **React Native** para gerenciar o sistema remotamente.

### Principais Funcionalidades

- **Reconhecimento Facial**: Capacidade de detectar e verificar rostos cadastrados no sistema.
- **API de Controle no Raspberry Pi**: Permite conceder ou negar acesso remotamente.
- **Captura e Processamento de Imagens**: O Raspberry Pi captura imagens da webcam e as envia para o backend.
- **Interface Web e Aplicativo Mobile**: Para gerenciar usuários, validar acessos e interagir com o sistema.
- **Exposição Pública com ngrok**: Tornando o sistema acessível remotamente.

---

## Estrutura do Projeto

```
reconhecimento_facial_iot/
│
├── backend/
│   ├── static/                    # Arquivos estáticos usados na interface web.
│   ├── templates/                 # Templates HTML para as interfaces web.
│   │   ├── add_face.html          # Página para adicionar rostos.
│   │   ├── concedAccess.html      # Página para conceder acesso manualmente.
│   │   └── recognize.html         # Página para testar o reconhecimento facial.
│   ├── uploads/                   # Diretório para armazenar imagens enviadas.
│   ├── app.py                     # Código principal da API em Flask.
│   ├── dlib_face_recognition_resnet_model_v1.dat  # Modelo de reconhecimento facial pré-treinado.
│   ├── shape_predictor_68_face_landmarks.dat      # Modelo de predição de landmarks faciais.
│   ├── known_faces.pkl            # Banco de dados com descritores faciais.
│   └── requirements.txt           # Dependências do backend.
│
├── raspberry/
│   ├── app.py                     # API local do Raspberry Pi para controle do relé.
│   ├── capture_and_send.py        # Script para capturar e enviar imagens.
│   └── requirements.txt           # Dependências necessárias para o Raspberry Pi.
│
├── FaceRecognitionApp/
│   ├── src/
│   │   ├── components/            # Componentes reutilizáveis.
│   │   │   ├── ButtonComponent.tsx
│   │   │   ├── ImageComponent.tsx
│   │   ├── screen/                # Telas principais do aplicativo.
│   │   │   ├── AddFaceScreen.tsx
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── ValidateFaceScreen.tsx
│   ├── services/                  # Serviços para comunicação com o backend.
│   │   └── api.ts
│   ├── App.tsx                    # Componente principal do aplicativo.
│   └── package.json               # Configurações e dependências do aplicativo.
│
└── readme.md                      # Documentação do projeto.
```

---

## Configuração do Sistema

### 1. Backend

O backend é implementado em **Flask** e gerencia o processamento de reconhecimento facial.

#### Passos para Configurar
1. Instale as dependências:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. Execute a API Flask:
   ```bash
   python app.py
   ```

3. Use **ngrok** para tornar o backend acessível publicamente:
   ```bash
   ngrok http 5000
   ```

### 2. Raspberry Pi

O Raspberry Pi captura imagens e envia para o backend.

#### Passos
1. Instale as dependências:
   ```bash
   cd raspberry
   pip3 install -r requirements.txt
   ```
2. Configure as URLs no arquivo `capture_and_send.py`:
   ```python
   BACKEND_URL = "http://<ngrok-url>/recognize"
   ```
3. Inicie o script de captura:
   ```bash
   python3 capture_and_send.py
   ```

### 3. Aplicativo Mobile

O aplicativo, em **React Native**, gerencia o sistema.

#### Passos
1. Instale as dependências:
   ```bash
   cd FaceRecognitionApp
   npm install
   ```
2. Inicie o aplicativo:
   ```bash
   npm start
   ```

---

## Funcionalidades Detalhadas

### Backend
- **Reconhecimento Facial**:
  - Processa imagens enviadas pelo Raspberry Pi.
  - Verifica se o rosto é conhecido no banco de dados.
- **Treinamento de Rostos**:
  - Permite adicionar novos rostos pela interface web ou aplicativo.
  - Salva descritores faciais no arquivo `known_faces.pkl`.

### Raspberry Pi
- **API Local**:
  - Oferece endpoints para conceder ou negar acesso.
- **Captura de Imagens**:
  - Script que envia imagens a cada 5 segundos para o backend.

### Aplicativo Mobile
- **Adicionar Rostos**:
  - Envia imagens capturadas para o backend.
- **Validar Acesso**:
  - Consulta se o rosto está registrado no sistema.

---

## Testes e Melhorias Futuras

- **Testes Realizados**:
  - Reconhecimento facial utilizando a biblioteca dlib.
  - Conexão remota usando ngrok.
  - Funcionalidade de adicionar rostos pela web e aplicativo.

- **Melhorias Focadas**:
  - Implementação de autenticação segura nas APIs.
  - Redução do consumo de recursos no script do Raspberry Pi.
  - Substituição do ngrok por um domínio fixo.

---

## Referências

- **Bibliotecas Utilizadas**:
  - [Dlib](https://github.com/davisking/dlib)
  - [Flask](https://flask.palletsprojects.com/)
  - [React Native](https://reactnative.dev/)
- **Guias Consultados**:
  - [Raspberry Pi Setup](https://projects.raspberrypi.org/en/projects/raspberry-pi-setting-up)
- **Repositório Oficial**:
  - [GitHub - Projeto](https://github.com/Philipidev/reconhecimentoFacialIot2)
