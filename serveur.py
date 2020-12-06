#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, render_template
from data import movie, categories
app = Flask(__name__)



### Les variables à afficher dans le Front

messageBienvenue = "Futur développeur Python"
objectif = "L'objectif de ce projet est d'intéragir avec une API Rest et le front"


### Les variables à afficher dans le Front

@app.route("/")
def index():
    movie["categories"] = categories
    return render_template("home.html", **movie)

@app.route("/categories")
def _categories():
    return render_template("categories.html")

if __name__ == "__main__":
    app.run(debug=True)
