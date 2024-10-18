import cv2
import requests
import RPi.GPIO as GPIO
import time
from config import RTSP_URL, BACKEND_URL, RELAY_PIN

# Configuração do GPIO para o relé
GPIO.setmode(GPIO.BCM)
GPIO.setup(RELAY_PIN, GPIO.OUT)
GPIO.output(RELAY_PIN, GPIO.LOW)

def capture_image():
    """
    Captura uma imagem da câmera IP usando o OpenCV e a retorna como arquivo.
    """
    cap = cv2.VideoCapture(RTSP_URL)
    ret, frame = cap.read()
    
    if ret:
        # Salva a imagem capturada localmente
        filename = '/home/pi/captured_image.jpg'
        cv2.imwrite(filename, frame)
        cap.release()
        return filename
    else:
        cap.release()
        raise Exception("Falha ao capturar a imagem da câmera IP")

def send_image_to_backend(image_path):
    """
    Envia a imagem capturada para a API do backend e processa a resposta.
    """
    with open(image_path, 'rb') as image:
        response = requests.post(BACKEND_URL, files={'file': image})
        
        if response.status_code == 200:
            print("Imagem enviada com sucesso")
            # Verifica se o backend concedeu o acesso
            if response.json().get('access_granted'):
                activate_relay()
        else:
            print(f"Erro ao enviar imagem. Status Code: {response.status_code}")

def activate_relay():
    """
    Ativa o relé para abrir a porta, acendendo o LED verde e ligando o buzzer.
    """
    GPIO.output(RELAY_PIN, GPIO.HIGH)  # Ativa o relé (porta aberta)
    time.sleep(5)  # Mantém o relé ativado por 5 segundos
    GPIO.output(RELAY_PIN, GPIO.LOW)   # Desativa o relé (porta fechada)
    print("Relé ativado (porta aberta)")

if __name__ == "__main__":
    try:
        while True:
            # Captura a imagem e envia para o backend a cada 5 segundos
            image_path = capture_image()
            send_image_to_backend(image_path)
            time.sleep(5)  # Aguarda 5 segundos antes de capturar a próxima imagem
    except KeyboardInterrupt:
        GPIO.cleanup()
