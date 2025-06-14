from flask import Flask, jsonify
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# Fonction pour établir une connexion à la base
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="houdarebbouh",
        database="cv_db"
    )

@app.route('/candidatures', methods=['GET'])
def get_candidatures():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        cursor.execute("""
            SELECT 
                c.id, 
                c.date_postule, 
                c.state_condidature,
                ca.nom,
                ca.prenom
            FROM candidature c
            JOIN candidat ca ON c.candidat_id = ca.id
        """)
        result = cursor.fetchall()
        return jsonify(result)

    except Error as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if db:
            db.close()


if __name__ == '__main__':
    app.run(debug=True)
