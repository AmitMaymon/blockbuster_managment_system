import requests
moviesURL = "http://127.0.0.1:5001/movies"
subsURL = "http://127.0.0.1:5001/subs"


class subscriptionsBLL:
    def __init__(self,route):
        if route == "movies":
            self.__url = moviesURL
        elif route == "subs":
            self.__url = subsURL


    def get_all(self):
        subs = requests.get(self.__url)
        return subs.json()
    
    def get_by_id(self,id):
        subs = requests.get(f"{self.__url}/{id}")
        return subs.json()
    
    def add_data(self,obj):
        subs = requests.post(self.__url,json=obj)
        return subs.json()
    
    def update_data(self,id,obj):
        subs = requests.put(f"{self.__url}/{id}",json=obj)
        return subs.json()
    
    def delete_data(self,id):
        subs = requests.delete(f"{self.__url}/{id}")
        return subs.json()
    
    