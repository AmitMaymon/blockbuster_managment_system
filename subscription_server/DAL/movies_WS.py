import requests

class Movies():
    def __init__(self):
        self.__url = 'https://api.tvmaze.com/shows'
    
    def get_all_movies(self):
        movies = requests.get(self.__url)
        return movies.json()