import requests

class Members():
    def __init__(self):
        self.__url = 'https://jsonplaceholder.typicode.com/users'
    
    def get_all_members(self):
        members = requests.get(self.__url)
        return members.json()