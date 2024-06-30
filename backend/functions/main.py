from firebase_functions import firestore_fn, https_fn

# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app, firestore
import google.cloud.firestore
from firebase_functions import options

import random
from barcode import EAN13 
from barcode.writer import ImageWriter 
import base64
from PIL import Image, ImageDraw, ImageFont




# from firebase_admin import firestore
app = initialize_app()
db = firestore.client()

@https_fn.on_call()
def addUser(req: https_fn.CallableRequest):

    # firestore_client: google.cloud.firestore.Client = firestore.client()
    db.collection("users").document(req.data['uid']).set({"role": req.data['role']})

 
    
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
def addCompProd(req: https_fn.CallableRequest):
    print(req)
    db.collection(req.data['option']).add({"new"+req.data['option']: req.data['value']})
    return {'success':True}



@https_fn.on_call()
def addItemDetails(req: https_fn.CallableRequest):
    itemName = req.data['itemName']
    productGrp = req.data['productGrp']
    company = req.data['company']

    unique_value = str(random.randint(100000, 999999))
    doc_ref = db.collection("newProduct").document(unique_value).get().to_dict()
    while doc_ref != None:
        unique_value = random.randint(100000, 999999)
        doc_ref = db.collection("newProduct").document(unique_value).get().to_dict()
    db.collection("newProduct").document(unique_value).set({"itemName": itemName, "productGrp": productGrp, "company": company})

    doc_ref = db.collection("company_product_db").document(productGrp+company).get().to_dict()
    print(unique_value)
    if doc_ref == None:
        db.collection("company_product_db").document(productGrp+company).set({'items':[unique_value]})
    else:
        doc_ref['items'].append(unique_value)
        db.collection("company_product_db").document(productGrp+company).set({'items':doc_ref['items']})
    
    return {'data': { 'success': 'true' }}


@https_fn.on_call()
def getAllProducts(req : https_fn.CallableRequest):
    productGrp = req.data['productGrp']
    company = req.data['company']

    doc_ref = db.collection("company_product_db").document(productGrp+company).get().to_dict()
    all_records = []
    print(doc_ref)

    if doc_ref != None:
        for i in doc_ref['items']:
            print(i)
            product_details = db.collection("newProduct").document(i).get().to_dict()
            print(product_details)
            all_records.append(product_details)
    print(all_records)

    return {'data':all_records}



        



@https_fn.on_call()
def generateQrCode(req : https_fn.CallableRequest):
    print('in')
    number = '983458782024'
    my_code = EAN13(number, writer=ImageWriter(),no_checksum=True) 
    my_code.save("new_code4")
    print('code saved')


    barcode_image = Image.open('new_code4.png')
    white_img = Image.open('white.png')
    newsize = (barcode_image.width, barcode_image.height//2)
    white_img = white_img.resize(newsize)
 
    draw = ImageDraw.Draw(white_img)
    text_on_image = "Oxy 2+32 GB\nOxygen\nAndroid System"
    text2_on_image = "35999\nE300F99"
    myFont = ImageFont.truetype('OpenSans-Regular.ttf', 25)
    draw.text((10, 10), text_on_image, font=myFont, fill=(0, 0, 0))
    draw.text((barcode_image.width//2, 10), text2_on_image, font=myFont, fill=(0, 0, 0))

    new_image = Image.new('RGB',(barcode_image.width, (barcode_image.height//2) + barcode_image.height), (250,250,250))
    new_image.paste(white_img,(0,0))
    new_image.paste(barcode_image,(0,barcode_image.height//2))

    # white_img = new_image.resize(200, 200)

    
    new_image.save("final_image.png")


  
    with open("final_image.png", "rb") as image2string: 
        converted_string = base64.b64encode(image2string.read()) 
    converted_string = str(converted_string)
    
    return {'base64' : converted_string[2:-1]}





    


