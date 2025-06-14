import os
import fitz  # PyMuPDF
import pandas as pd
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity

# Télécharger les stopwords français une fois
nltk.download('stopwords')
from nltk.corpus import stopwords

def extract_texts_from_pdfs_single(file_path):
    texts = []
    filenames = []
    try:
        doc = fitz.open(file_path)
        text = ""
        for page in doc:
            text += page.get_text()
        texts.append(text)
        filenames.append(os.path.basename(file_path))
    except Exception as e:
        print(f"[⚠️ Skipped] {file_path} → {e}")
    return texts, filenames

# Chemin vers ton CV PDF
cv_file_path = r"C:\Users\USER\Desktop\Khadija Zouhair CV (3).pdf"

# Extraire texte du CV
cv_texts, cv_filenames = extract_texts_from_pdfs_single(cv_file_path)

# Charger les offres d'emploi
job_df = pd.read_csv("./data/job_descriptions3.csv")
job_descriptions = job_df['description'].tolist()

# Liste des stopwords français de nltk
french_stopwords = stopwords.words('french')

# Fusionner les textes CV + offres
all_texts = cv_texts + job_descriptions

# Vectorisation TF-IDF avec stopwords français
vectorizer = TfidfVectorizer(stop_words=french_stopwords)
X = vectorizer.fit_transform(all_texts)

# (Optionnel) Clustering KMeans
n_clusters = 3
kmeans = KMeans(n_clusters=n_clusters, random_state=42)
kmeans.fit(X)
labels = kmeans.labels_

print("\nRésultat du clustering (CV + Offres) :")
for i, label in enumerate(labels):
    source = "CV" if i < len(cv_texts) else "Offre"
    print(f"{source} - Cluster {label}")

# Calcul similarité entre CV et offres
cv_vectors = X[:len(cv_texts)]
job_vectors = X[len(cv_texts):]
similarity_matrix = cosine_similarity(cv_vectors, job_vectors)

print("\nSimilarité entre le CV et chaque offre :")
for i, cv_name in enumerate(cv_filenames):
    for j, job_title in enumerate(job_df['title']):
        score = similarity_matrix[i][j]
        print(f"CV: {cv_name} ↔ Offre: {job_title} → Similarité: {score:.2f}")