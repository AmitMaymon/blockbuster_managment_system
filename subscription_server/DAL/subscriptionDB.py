from pymongo import MongoClient
from bson import ObjectId

class SubscriptionsDB:
    def __init__(self,db,collection):
        self.__client = MongoClient('localhost',27017)
        self.__db = self.__client[db]
        self.__collection = self.__db[collection]

    def get_count(self):
        return self.__collection.count_documents({})
        

    def get_all(self):
        data = list(self.__collection.find({}))
        return data

    def get_by_id(self,id):
        data = list(self.__collection.find({'_id':ObjectId(id)}))
        print(f'-----------------------------: {data}')
        return data
    
    def add_data(self,obj):
        self.__collection.insert_one(obj)
        return "Created"
    def add_multiple_data(self,list):
        self.__collection.insert_many(list)
        return "Created"
    
    def update_data(self,id,obj):
        data = self.__collection.update_one({'_id':ObjectId(id)},{"$set":obj})
        return 'Updated'

    def delete_data(self,id):
        data = self.__collection.delete_one({'_id':ObjectId(id)})
        return "Deleted"
    
test = SubscriptionsDB('cinema','subscriptions')

