from pymongo import MongoClient

# Connect to local MongoDB
client = MongoClient("mongodb://127.0.0.1:27017/")

# Create/use database and collection
db = client["Week11DB"]
customer_collection = db["Customer"]

print("Connected")
print("Database ready")
print("Customer collection ready")

# Delete all records in Customer collection
customer_collection.delete_many({})
print("All old records deleted")

# Insert 3 customer records
customers = [
    {
        "firstName": "Jonas",
        "lastName": "Marcial",
        "email": "jonas.marcial@email.com",
        "phone": "808-555-1111"
    },
    {
        "firstName": "Maria",
        "lastName": "Garcia",
        "email": "maria.garcia@email.com",
        "phone": "808-555-2222"
    },
    {
        "firstName": "David",
        "lastName": "Lee",
        "email": "david.lee@email.com",
        "phone": "808-555-3333"
    }
]

customer_collection.insert_many(customers)
print("3 customer records inserted")

# Update one customer's email
customer_collection.update_one(
    {"lastName": "Marcial"},
    {"$set": {"email": "jonas.marcial123@email.com"}}
)
print("Jonas email updated")

# Update another customer's phone number
customer_collection.update_one(
    {"firstName": "Maria"},
    {"$set": {"phone": "808-555-9999"}}
)
print("Maria phone updated")

# Query one customer by last name
customer_found = customer_collection.find_one({"lastName": "Marcial"})
print("Query by last name:")
print(customer_found)

# Query another customer by first name
customer_found2 = customer_collection.find_one({"firstName": "David"})
print("Query by first name:")
print(customer_found2)

# Drop Customer collection
customer_collection.drop()
print("Customer collection dropped")