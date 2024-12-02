from flask import Flask, jsonify
import RPi.GPIO as GPIO
import time
import threading

app = Flask(__name__)

# Configuração do GPIO
RELAY_PIN_SUCCESS = 17
RELAY_PIN_FAILED = 27
GPIO.setmode(GPIO.BCM)
GPIO.setup(RELAY_PIN_SUCCESS, GPIO.OUT)
GPIO.setup(RELAY_PIN_FAILED, GPIO.OUT)

# Função para ativar o relé em uma thread separada
def activate_relay(pin, duration):
    try:
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(duration)
        GPIO.output(pin, GPIO.LOW)
    except Exception as e:
        print(f"Erro ao ativar o relé: {e}")

@app.route('/activate_relay_success', methods=['POST'])
def activate_relay_success():
    try:
        # Inicia a thread para ativar o relé
        threading.Thread(target=activate_relay, args=(RELAY_PIN_SUCCESS, 5)).start()
        return jsonify({"status": "success", "message": "Relay activation started"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/activate_relay_failed', methods=['POST'])
def activate_relay_failed():
    try:
        # Inicia a thread para ativar o relé
        threading.Thread(target=activate_relay, args=(RELAY_PIN_FAILED, 5)).start()
        return jsonify({"status": "success", "message": "Relay activation started"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    try:
        app.run(host='0.0.0.0', port=5000)
    finally:
        GPIO.cleanup()
