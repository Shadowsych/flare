# import classes and functions
import numpy as np
from flask import Flask, request, jsonify
from keras.preprocessing import image

# create the flask app
app = Flask(__name__)

# routes HTTP request for '/predict' to predict_density() function
@app.route('/predict', methods= ['GET', 'POST'])
def predict_density():
    # verifies if the request method is GET
    if (request.method == 'GET'):
        # gets the image from the HTTP request
        file = flask.request.files['image']
        # gets file name
        file_name = file.file_name
        # function call to predict the level of people within the area
        prediction = predict(file_name)
        # make 'prediction' in JSON format
        prediction = jsonify(prediction)
        
        # returns JSON to the client
        return prediction
    
    else:
        return "Request method not valid"

def predict(image):
    # reformats image for Numpy Array conversion
    test_image = image.load_img(str(image), target_size= (299, 299))
    # converts the image to an array
    image_matrix = image.img_to_array(test_image)
    # expands the shape of the array
    image_matrix = np.expand_dims(image_matrix, axis= 0)
    # classifies the level of people within the image
    result = classify(image_matrix)
    
    # returns category classification
    return result

# function classifies the level of people in the image
def classify(image_matrix):
    
    
app.run(host= "127.0.0.1", port= "5000")