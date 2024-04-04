from DAL.members_WS import Members
from DAL.movies_WS import Movies
from DAL.subscriptionDB import SubscriptionsDB

class MainBLL():
    def __init__(self):
        members = Members()
        movies = Movies()
        self.membersDB = SubscriptionsDB(db='cinema',collection='members')
        self.moviesDB = SubscriptionsDB(db='cinema',collection='movies')
        self.members = members.get_all_members()
        self.movies = movies.get_all_movies()

    def insert_members_to_db(self):
        if self.membersDB.get_count() > 1:
            return 'Already full'
        final = []
        for member in self.members:
            temp = {
                "name":member['name'],
                "email":member["email"],
                "city":member['address']['city']
            }
            final.append(temp)
        
        return self.membersDB.add_multiple_data(final)
        
    
    def insert_movies_to_db(self):
        if self.moviesDB.get_count() > 1:
            return 'Already full'
        final = []
        for movie in self.movies:
            temp = {
                "name":movie['name'],
                "genres":movie['genres'],
                "image":movie['image']['original'],
                "premiered":movie['premiered']
            }
            final.append(temp)
        return self.moviesDB.add_multiple_data(final)

# x = MainBLL()
# print(x.insert_movies_to_db())