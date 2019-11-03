# import flask modules
import numpy as np
from flask import Flask, request, jsonify

# tensorflow session modules
import tensorflow as tf
from tensorflow.python.keras.backend import set_session
from tensorflow.keras.models import load_model

# import numpy and tensorflow predicting modules
import numpy as np
from tensorflow.keras.preprocessing import image

# import image modules
import base64

# load the session and model's h5 file
sess = tf.Session()
graph = tf.get_default_graph()
set_session(sess)
classifier = load_model("../notebooks/model.h5")

# create the flask app
app = Flask(__name__)

# routes HTTP request for '/predict' to predict_density() function
@app.route('/predict_density', methods= ['POST'])
def predict_density():
    # format the base 64 image from the client
    picture_base_64 = request.form.get("pictureBase64")
    picture_base_64 += '=' * (-len(picture_base_64) % 4)

    # save the image into this directory
    image_file = "capture.jpg"
    with open(image_file, "wb") as fh:
        fh.write(base64.decodebytes(picture_base_64.encode()))

    # function call to predict the level of people within the area
    prediction = predict(image_file, 224, 224)

    # set the prediction in JSON format
    prediction = jsonify(prediction)

    # returns JSON to the client
    return prediction

def predict(image_file, img_width, img_height):
    global sess
    global graph

    # reformats image for Numpy Array conversion
    predict_image = image.load_img(
        image_file, target_size=(img_width, img_height)
    )

    # converts the image to an array
    image_matrix = image.img_to_array(predict_image)

    # expands the shape of the array
    image_matrix = np.expand_dims(image_matrix, axis= 0)

    # classifies the level of people within the image
    with graph.as_default():
        set_session(sess)
        result = classifier.predict(image_matrix)

    # returns best category classification
    categories = {0: "High", 1: "Low", 2: "Medium", 3: "Zero"}
    return get_predicted_population_density(result, categories)

def get_predicted_population_density(predictions, categories):
    current_category = 0
    best_category = 0

    # receive the category with the highest predicted possibility
    while(current_category < len(predictions[0])):
        print(predictions[0][current_category])
        if(predictions[0][current_category] > predictions[0][best_category]):
            # update the best category
            best_category = current_category
        current_category += 1

    return categories[best_category]

app.run(host= "0.0.0.0", port= "5000")
