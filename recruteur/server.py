from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os

# Pour le Machine Learning
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import pickle

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Exemple : mots-clés pour noter un CV
keywords = ['python', 'java', 'sql', 'machine learning', 'deep learning', 'docker', 'cloud', 'flask', 'django']

def simple_scoring(text):
    score = 0
    text = text.lower()
    for keyword in keywords:
        if keyword in text:
            score += 12
    return min(score, 100)

@app.route('/analyze', methods=['POST'])
def analyze_cv():
    if 'cv' not in request.files:
        return jsonify({'error': 'Pas de fichier envoyé'}), 400

    file = request.files['cv']
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    # Lecture simplifiée du fichier
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # Calcul de la note
    score = simple_scoring(text)

    return jsonify({'score': score})

if __name__ == '__main__':
    app.run(debug=True)
