import json
import sys
import os


class usersJSON:
    def __init__(self):
        self.__path = os.path.join(sys.path[0],'data/Users.json')

    def read_json(self):
        with open(self.__path,'r') as fp:
            data = json.load(fp)
            return data
        
    def write_json(self,obj):
        users = self.read_json()
        users['Users'].append(obj)

        with open(self.__path,'w') as fp:
            json.dump(users,fp,indent=2)

        return 'Updated'
    
    def update_json(self,obj):
        with open(self.__path,'w') as fp:
            json.dump(obj,fp,indent=2)

        return 'Updated'
