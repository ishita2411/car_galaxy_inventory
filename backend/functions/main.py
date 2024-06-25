from firebase_functions import firestore_fn, https_fn

# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app, firestore
import google.cloud.firestore
from firebase_functions import options

# from firebase_admin import firestore
app = initialize_app()
db = firestore.client()

@https_fn.on_call()
def addUser(req: https_fn.CallableRequest):

    # firestore_client: google.cloud.firestore.Client = firestore.client()
    db.collection("users").document(req.data['uid']).set({"role": req.data['role']})

    # data = {"name": "Los Angeles", "state": "CA", "country": "U"}

# Add a new doc in collection 'cities' with ID 'LA'
    # db.collection("cities").document("B").set(data)
    # city_ref = db.collection("cities").stream()
    # for doc in city_ref:
    #     print(doc.to_dict())

 
    
    print('ye bhi hua')

    # Send back a message that we've successfully written the message
    return {
    'data': { 'success': 'true' }
}

@https_fn.on_call()
def getRole(req: https_fn.CallableRequest):
    doc = db.collection("users").document(req.data['uid']).get().to_dict()
    return doc


@https_fn.on_call()
def addCompProd(req: https_fn.CallableRequest):
    db.collection(req.data['option']).add({"new"+req.data['option']: req.data['value']})
    return {'success':True}


@https_fn.on_call()
def getCompanies(req: https_fn.CallableRequest):
    companies = db.collection("company").stream()
    all_companies = []
    for doc in companies:
        # all_companies.append(doc.to_dict()['newcompany'])
        all_companies.append(doc.to_dict())

    # print(all_companies)
    return {'data':all_companies}

@https_fn.on_call()
def getProducts(req: https_fn.CallableRequest):
    products = db.collection("product").stream()
    all_products = []
    for doc in products:
        # all_products.append(doc.to_dict()['newproduct'])
        all_products.append(doc.to_dict())

    # print(all_companies)
    print(all_products)
    return {'data':all_products}


@https_fn.on_call()
def addItemDetails(req: https_fn.CallableRequest):
    doc_ref = db.collection("users").document("JfV07BA2UxsIiSTPzximbhb94JPY").get()
    print('yaa hoo')
    print(doc_ref.to_dict())
    # for doc in doc_ref:
    #     # all_products.append(doc.to_dict()['newproduct'])
    #     print('hell')
    #     print(doc)

    return {
    'data': { 'success': 'true' }
}



    


