#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
from concurrent.futures import ThreadPoolExecutor, wait

CATEGORIES = ('best movies', 'action', 'comedy', 'horror')
URL_CATEGORY = "http://localhost:8000/api/v1/titles/?min_year=2000&genre={}&sort_by=-imdb_score&page={}"
URL_BEST_MOVIES = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page={}"


def load_url(url):
    '''Retourne les données de la requête sur l'API '''
    response = requests.get(url, stream=True)
    return response.json()

def get_urls():
    '''Récupère toutes les URLs lié au catégories choisi'''
    urls = []
    for category in CATEGORIES:
        if category != 'best movies':
            [urls.append(URL_CATEGORY.format(category, i+1)) for i in range(2)]
        else:
            [urls.append(URL_BEST_MOVIES.format(i+1)) for i in range(2)]
    return urls
            
def load_categories():
    '''
    Charge les données de l'API en utilisant le multithreading pour obtenir
    plus vite les informations.
    '''
    futures = []
    data = {category: [] for category in CATEGORIES}

    # On charge simultanement les données en stockant leur etat dans "futures"
    with ThreadPoolExecutor() as executor:
        for url in get_urls():
            try:
                futures.append(executor.submit(load_url, url))
            except Exception:
                print("error appear with url: {}".format(url))

    for i, future in enumerate(futures):
        category = CATEGORIES[i//2]
        movies = []

        # On récupère le résultats de notre requête stocké dans la "future" qui a
        # terminé son chargement et on récupère l'ID et l'image du film.
        result = future.result()
        for r in result['results'] if i % 2 == 0 else result['results'][:2]:
            print("{} --> {}".format(i, r['id']))
            movies.append((r['id'], r['image_url']))

        data[category] += movies[:]

    return data


