from DAL.subscriptionDB import SubscriptionsDB

class MoviesBLL():
    def __init__(self):
        self.db = SubscriptionsDB('cinema','movies')
    
    def get_all(self):
        data = self.db.get_all()
        return data
    
    def get_by_id(self,id):
        data = self.db.get_by_id(id)
        return data
    
    def add_data(self,obj):
        data = self.db.add_data(obj)
        return data
    
    def update_data(self,id,obj):
        data = self.db.update_data(id,obj)
        return data
    
    def delete_data(self,id):
        data = self.db.delete_data(id)
        return data