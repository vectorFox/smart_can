import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Initialize Database
cred = credentials.Certificate('./admin.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Add Item Entry
item = db.collection('activity').document()
item.set({
    'category': 'trash',
    'tags': ['food', 'used'],
    'timestamp': firestore.SERVER_TIMESTAMP
})

# Update Current Stats
stats = db.collection('global').document('stats').get().to_dict()
new_count = stats['trashCount'] + 1
db.collection('global').document('stats').update({
    'trashCount': new_count
})