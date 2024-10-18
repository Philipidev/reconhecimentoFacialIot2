from flask import Flask, request, jsonify
import cv2
import dlib
import numpy as np

app = Flask(__name__)

# Configuração do detector de rostos usando dlib
detector = dlib.get_frontal_face_detector()

@app.route('/recognize', methods=['POST'])
def recognize():
    # Recebe a imagem enviada pelo Raspberry Pi
    file = request.files['file'].read()
    
    # Converte a imagem recebida em formato numpy
    npimg = np.frombuffer(file, np.uint8)
    
    # Decodifica a imagem para formato OpenCV
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    
    # Converte a imagem para escala de cinza
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Detecta rostos na imagem
    faces = detector(gray)

    # Se detectar rostos, conceder acesso, caso contrário, negar
    if len(faces) > 0:
        response = {
            "access_granted": True,
            "faces_detected": len(faces)
        }
    else:
        response = {
            "access_granted": False,
            "faces_detected": 0
        }

    return jsonify(response)

if __name__ == "__main__":
    # Inicia o servidor Flask
    app.run(host='0.0.0.0', port=5000)
