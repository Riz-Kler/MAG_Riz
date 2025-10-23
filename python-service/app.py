from flask import Flask, request, jsonify

app = Flask(__name__)

@app.get("/health")
def health():
    return {"status": "ok"}
    
@app.route('/predict-delay', methods=['POST'])
def predict_delay():
    data = request.get_json()
    delay_minutes = 42  # Placeholder logic
    return jsonify({
        "delay_risk": "High",
        "estimated_delay_minutes": delay_minutes
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)