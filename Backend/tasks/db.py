from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://bhavyasree3012:Bhavyasree1234@cluster0.zx7ka0h.mongodb.net/"
)

db = client["todo_db"]

collection = db["tasks"]