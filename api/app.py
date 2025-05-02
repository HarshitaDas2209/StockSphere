# from flask import Flask, request, jsonify # type: ignore
# import pandas as pd # type: ignore
# from flask_cors import CORS # type: ignore

# app = Flask(__name__)
# CORS(app)

# # app = Flask(__name__)

# # Load CSV once during startup
# df = pd.read_csv("expanded_warehouse_inventory_with_city.csv")

# # Normalize for easier matching
# df["product_name"] = df["product_name"].str.strip().str.lower()
# df["product_company"] = df["product_company"].str.strip().str.lower()

# @app.route('/check_inventory', methods=['GET'])
# def check_inventory():

#     result = []

#     for _, row in df.iterrows():
#         product_name = row['product_name']
#         product_company = row['product_company']
#         store_id = row['store_id']
#         current_stock = row['current_stock']
#         threshold_value = row['threshold_value']

#         if current_stock < threshold_value:
#             # Filter all matching products except the current store
#             potential_sources = df[
#                 (df['product_name'] == product_name) &
#                 (df['product_company'] == product_company) &
#                 (df['store_id'] != store_id) &
#                 (df['current_stock'] > df['threshold_value'])
#             ]

#             warehouses = potential_sources[['store_id', 'current_stock','threshold_value']].to_dict(orient='records')
            
#             result.append({
#                 "store_id": store_id,
#                 "product_name": row['product_name'],
#                 "product_company": row['product_company'],
#                 "current_stock": current_stock,
#                 "threshold_value": threshold_value,
#                 "replenish_from": warehouses
#             })

#     return jsonify(result)




# if __name__ == '__main__':
#     app.run(debug=True)




from flask import Flask, request, jsonify  # type: ignore
import pandas as pd  # type: ignore
from flask_cors import CORS  # type: ignore
from pymongo import MongoClient  # type: ignore
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Load CSV once during startup
df = pd.read_csv("expanded_warehouse_inventory_with_city.csv")

# Normalize for easier matching
df["product_name"] = df["product_name"].str.strip().str.lower()
df["product_company"] = df["product_company"].str.strip().str.lower()

# Connect to MongoDB
mongo_uri = "mongodb+srv://hd4258:harshita@inventra.tvihzm1.mongodb.net/inventory-db?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)
db = client["inventory-db"]
managers_collection = db["managers"]  # Use the correct collection name

@app.route('/check_inventory', methods=['GET'])
def check_inventory():
    result = []

    for _, row in df.iterrows():
        product_name = row['product_name']
        product_company = row['product_company']
        store_id = row['store_id']
        current_stock = row['current_stock']
        threshold_value = row['threshold_value']

        if current_stock < threshold_value:
            # Filter all matching products except the current store
            potential_sources = df[
                (df['product_name'] == product_name) &
                (df['product_company'] == product_company) &
                (df['store_id'] != store_id) &
                (df['current_stock'] > df['threshold_value'])
            ]

            warehouses = potential_sources[['store_id', 'current_stock','threshold_value']].to_dict(orient='records')
            
            # For each potential donor warehouse, fetch manager email from MongoDB
            for warehouse in warehouses:
                donor_id = warehouse['store_id']
                try:
                    # Query MongoDB for manager by warehouseName
                    manager = managers_collection.find_one({"warehouseName": donor_id})
                    if manager and 'email' in manager:
                        warehouse['manager_email'] = manager['email']
                    else:
                        warehouse['manager_email'] = "Email not found"
                except Exception as e:
                    logger.error(f"Error fetching manager for {donor_id}: {str(e)}")
                    warehouse['manager_email'] = "Error retrieving email"
            
            result.append({
                "store_id": store_id,
                "product_name": row['product_name'],
                "product_company": row['product_company'],
                "current_stock": current_stock,
                "threshold_value": threshold_value,
                "replenish_from": warehouses
            })

    return jsonify(result)

@app.route('/warehouse-emails', methods=['GET'])
def get_warehouse_emails():
    """Get a mapping of all warehouse IDs to manager emails"""
    try:
        # Query all managers
        all_managers = list(managers_collection.find({}, {"_id": 0, "warehouseName": 1, "email": 1}))
        
        # Create a mapping of warehouseName to email
        email_map = {m['warehouseName']: m['email'] for m in all_managers if 'warehouseName' in m and 'email' in m}
        
        return jsonify(email_map)
    except Exception as e:
        logger.error(f"Error fetching warehouse emails: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/debug-collections', methods=['GET'])
def debug_collections():
    """Debug endpoint to list collections and sample documents"""
    try:
        collections = db.list_collection_names()
        
        result = {
            "collections": collections,
            "samples": {}
        }
        
        # Get a sample from each collection
        for collection_name in collections:
            sample = list(db[collection_name].find().limit(1))
            if sample:
                # Convert ObjectId to string for JSON serialization
                sample_doc = sample[0].copy()
                if '_id' in sample_doc:
                    sample_doc['_id'] = str(sample_doc['_id'])
                result["samples"][collection_name] = sample_doc
        
        return jsonify(result)
    except Exception as e:
        logger.error(f"Error in debug endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)