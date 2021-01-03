Projet 6 du parcours Développeur Python backend à OpenClassrooms.

1 - Cloner le projet: </br>
<b>git clone https://github.com/yoan34/justStreamIt.git</b>

2 - Aller dedans est créer un environnement virtuel:</br>
<b>cd justStreamIt && python -m venv env</b>

3 - Activer l'environnement virtuel et installer les dépendances:</br>
<b>source env/Scripts/activate && pip install -r requirements.txt</b>

4 - Dans une console à la racine du projet et dans l'environnement virtuel, créer/alimenter la base de donnée: </br>
<b>cd api && python manage.py create_db</b>

5 - lancer l'API:</br>
<b>python manage.py runserver</b>

5 - Dans une autre console à la racine du projet et dans l'environnement virtuel, lancer le site: </br>
<b>cd site && python serveur.py</b>

6 - Connecter vous au site à l'adresse <b>http://127.0.0.1:5000/
