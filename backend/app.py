from flask import Flask, request, jsonify
import cv2
import dlib
import numpy as np
import os
import pickle

app = Flask(__name__)

# Configuração do detector de rostos usando dlib
detector = dlib.get_frontal_face_detector()
# Configuração do reconhecedor facial
descriptor_extractor = dlib.face_recognition_model_v1("dlib_face_recognition_resnet_model_v1.dat")
shape_predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

# Carregar o banco de dados de rostos conhecidos
if os.path.exists("known_faces.pkl"):
    with open("known_faces.pkl", "rb") as f:
        known_faces = pickle.load(f)
else:
    known_faces = {}

@app.route('/recognize', methods=['POST'])
def recognize():
    if 'file' not in request.files:
        return "Nenhum arquivo encontrado no campo 'file'", 400

    file = request.files['file']
    if file.filename == '':
        return "Nenhum arquivo selecionado", 400

    # Leia a imagem e continue com o processo
    img_bytes = file.read()
    npimg = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    # Converte a imagem para escala de cinza
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detecta rostos na imagem
    faces = detector(gray)

    if len(faces) == 0:
        return jsonify({"access_granted": False, "faces_detected": 0})

    # Extração de descritores faciais e verificação no banco de dados
    for face in faces:
        shape = shape_predictor(gray, face)
        face_descriptor = descriptor_extractor.compute_face_descriptor(img, shape)

        # Verificação no banco de dados
        for name, known_descriptor in known_faces.items():
            distance = np.linalg.norm(np.array(known_descriptor) - np.array(face_descriptor))
            if distance < 0.6:
                return jsonify({"access_granted": True, "recognized_face": name})

    return jsonify({"access_granted": False, "faces_detected": len(faces)})

@app.route('/add_face', methods=['POST'])
def add_face():
    if 'file' not in request.files or 'name' not in request.form:
        return "Arquivo de imagem e nome são necessários", 400

    file = request.files['file']
    name = request.form['name']

    if file.filename == '' or not name:
        return "Arquivo de imagem e nome válidos são necessários", 400

    # Leia a imagem
    img_bytes = file.read()
    npimg = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    # Converte a imagem para escala de cinza
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detecta rostos na imagem
    faces = detector(gray)

    if len(faces) != 1:
        return "A imagem deve conter exatamente um rosto", 400

    # Extração de descritor facial
    shape = shape_predictor(gray, faces[0])
    face_descriptor = descriptor_extractor.compute_face_descriptor(img, shape)

    # Armazena o descritor no banco de dados
    known_faces[name] = face_descriptor
    with open("known_faces.pkl", "wb") as f:
        pickle.dump(known_faces, f)

    return f"Rosto de {name} adicionado com sucesso", 200

if __name__ == "__main__":
    # Inicia o servidor Flask
    app.run(host='0.0.0.0', port=5000, debug=True)
