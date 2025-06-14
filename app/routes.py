from flask import Flask, render_template, redirect, url_for, request, flash
from flask_mysqldb import MySQL
from flask import session


app = Flask(__name__)
app.secret_key = 'secret_key'  # Nécessaire pour flash()

app.config['MYSQL_HOST'] = '127.0.0.1'            # ou 'localhost'
app.config['MYSQL_USER'] = 'root'              # ➜ utilisateur MySQL que tu as défini
app.config['MYSQL_PASSWORD'] = 'houdarebbouh'            # ➜ mot de passe associé à 'myuser'
app.config['MYSQL_DB'] = 'cv_db'                 # ➜ nom exact de ta base de données
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'


mysql = MySQL(app)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM candidat WHERE email_candidat = %s AND password_candidat = %s", (email, password))
        candidat = cur.fetchone()
        cur.close()

        if candidat:
            session['user_id'] = candidat['id']
            session['role'] = 'candidat'
            return redirect(url_for('dashboard'))
        
        else:
            flash('Email ou mot de passe incorrect', 'danger')
            return render_template('login.html')
    return render_template('login.html')



@app.route('/')
def index():
    return render_template('index.html')

from flask import render_template, session, redirect, url_for

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    user_id = session['user_id']

    cur = mysql.connection.cursor()

    # 1) Nombre de candidatures pour ce candidat (table candidature)
    cur.execute("""
        SELECT COUNT(*) AS total_applications
        FROM candidature
        WHERE candidat_id = %s
    """, (user_id,))
    total_applications = cur.fetchone()['total_applications']

    # 2) Nombre d'entretiens associés à ce candidat
    cur.execute("""
        SELECT COUNT(*) AS total_interviews
        FROM candidat_entretien ce
        JOIN entretien e ON ce.entretien_id = e.id
        WHERE ce.candidat_id = %s
    """, (user_id,))
    total_interviews = cur.fetchone()['total_interviews']

    # 3) Nombre total d'offres disponibles
    cur.execute("SELECT COUNT(*) AS total_offers FROM offre_emploi")
    total_offers = cur.fetchone()['total_offers']

    # 4) Nombre d'offres sauvegardées — pas dans ton schéma, donc on met 0 par défaut
    saved_jobs = 0  # À remplacer si tu crées cette table plus tard

    cur.close()

    return render_template('dashboard.html',
                           total_applications=total_applications,
                           total_interviews=total_interviews,
                           total_offers=total_offers,
                           saved_jobs=saved_jobs)



@app.route('/candidature')
def candidature():
    return render_template('candidature.html')

@app.route('/cv')
def cv():
    return render_template('cv.html')

@app.route('/offres')
def offres():
    return render_template('offres.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.route('/profil')
def profil():
    return render_template('profil.html')

