from DAL.usersDB import usersDB
from DAL.usersDAL import usersJSON
from DAL.permissionsDAL import permissionsJSON
from datetime import date
from bson import ObjectId

class UsersBLL:
    def __init__(self):
        self.usersDB = usersDB()
        self.usersJSON = usersJSON()
        self.permissionsJSON = permissionsJSON()

    def get_all(self):

        dbUsers = self.usersDB.get_all()
        final = []
        for user in dbUsers:
            temp = {
                "_id":user['_id'],
                "username":user['username'],
                "password":user['password']
            }

            jsonUsers = self.usersJSON.read_json()
            for jsonUser in jsonUsers['Users']:
                if str(user['_id']) == jsonUser['_id']:
                    temp['userInfo'] = jsonUser

            permissions = self.permissionsJSON.read_json()
            for permission in permissions:
                if str(user['_id']) == permission['_id']:
                    temp['permissions'] = permission['permissions']

            final.append(temp)
        return final
    
    def get_by_id(self,id):


        dbUser = self.usersDB.get_by_id(id)

        jsonUsers = self.usersJSON.read_json()
        for jsonUser in jsonUsers['Users']:
            if dbUser[0]['_id'] == ObjectId(jsonUser['_id']):
                print('yes')

                dbUser[0]['userInfo'] = jsonUser

        permissions = self.permissionsJSON.read_json()
        for permission in permissions:
            if dbUser[0]['_id'] == ObjectId(permission['_id']):
                print('yes')
                dbUser[0]['permissions'] = permission['permissions']  
        print(f'''
              -----------
              {dbUser}
              ''')
        return dbUser[0]      

    def add_user(self,obj):
        dbObj = {
            "username":obj['username'],
            "password":obj['password']
        }
        idDB = self.usersDB.add_data(dbObj)
        try:
            userJsonObj = {
                "_id":str(idDB),
                "FirstName":obj["userInfo"]['FirstName'],
                "LastName":obj["userInfo"]['LastName'],
                "createdDate":date.today().strftime(r"%d/%m/%Y"),
                "sessionTimeOut":obj["userInfo"]['sessionTimeOut']
            }
            jsonUsers = self.usersJSON.read_json()['Users']
            
            if userJsonObj['_id'] not in jsonUsers:
                self.usersJSON.write_json(userJsonObj)

            permissionsJsonObj = {
            "_id":str(idDB),
            "permissions":obj['permissions']
            }
            jsonPermissions = self.permissionsJSON.read_json()

            if permissionsJsonObj['_id'] not in jsonPermissions:
                self.permissionsJSON.write_json(permissionsJsonObj)
            
            return {"Statues":"Created"}
        except Exception as error:
            self.usersDB.delete_data(idDB)
            return {'Data_type_error':str(error)}

    def update_user(self,id,obj):
        jsonUsers = self.usersJSON.read_json()['Users']
        permissions = self.permissionsJSON.read_json()

        unknownKeys = []

        for user in jsonUsers:
            user['_id'] = str(user['_id'])
            if(user['_id'] == id):
                for key,value in obj.items():
                    if key in user:
                        user[key] = value
                    else:
                        unknownKeys.append(f'Key {key} not found in jsonUser object')
        
        self.usersJSON.update_json({"Users":jsonUsers})
                        
        for per in permissions:
            if per['_id'] == id:
                for key,value in obj.items():
                    if key in per:
                        per[key] = value
                    else:
                        unknownKeys.append(f'Key {key} not found in permissions Object')
        
        self.permissionsJSON.update_json(permissions)

        dbUser = self.usersDB.get_by_id(id)
        if dbUser:
            dbUpdate = {}
            for key,value in obj.items():
                if key =="username" or key =="password":
                    dbUpdate[key] = value
            if dbUpdate:
                self.usersDB.update_data(id,dbUpdate)
        

        
        return {
            "Updated":unknownKeys
        }


    def delete_user(self,id):
    # Delete user from JSON data
        jsonUsers = self.usersJSON.read_json()['Users']
        updatedJsonUsers = [user for user in jsonUsers if str(user['_id']) != id]
        self.usersJSON.update_json({"Users": updatedJsonUsers})
        
        # Delete user from permissions JSON data
        permissions = self.permissionsJSON.read_json()
        updatedPermissions = [per for per in permissions if per['_id'] != id]
        self.permissionsJSON.update_json(updatedPermissions)

        # Delete user from the database
        self.usersDB.delete_data(id)
        
        return {"Deleted": id}
        
    
        

