import json
import sys
import os


class permissionsJSON:
    def __init__(self):
        self.__path = os.path.join(sys.path[0],'data/Permissions.json')

    def read_json(self):
        with open(self.__path,'r') as fp:
            data = json.load(fp)
            return data
        
    def write_json(self,obj):
        permissions = self.read_json()
        permissions.append(obj)
  
        with open(self.__path,'w') as fp:
            json.dump(permissions,fp,indent=2)
            
        return 'Updated'
    
    def update_json(self,obj):
        with open(self.__path,'w') as fp:
            json.dump(obj,fp,indent=2)

        return 'Updated'