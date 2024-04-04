from pymongo import MongoClient
from bson import ObjectId

class usersDB:
    def __init__(self):
        self.__client = MongoClient('localhost',27017)
        self.__db = self.__client['cinemaUsersDB']
        self.__collection = self.__db['users']

    def get_all(self):
        data = list(self.__collection.find({}))
        return data

    def get_by_id(self,id):
        data = list(self.__collection.find({'_id':ObjectId(id)}))
        return data

    def add_data(self,obj):
        id = self.__collection.insert_one(obj).inserted_id
        
        print("db ID: ",id)
        return id
    
    def update_data(self,id,obj):
        data = self.__collection.update_one({'_id':ObjectId(id)},{"$set":obj})
        return 'Updated'

    def delete_data(self,id):
        data = self.__collection.delete_one({'_id':ObjectId(id)})
        return "Deleted"    