<img src="https://github.com/Shadowsych/flare/blob/master/assets/splash.png" width="250" height="250"/>

# Flare
A React Native mobile application that analyzes the victim density from drone/bird-eye viewed images using deep learning. The app utilizes a convolutional neural network to predict a victim density based on an aerial-view image.

# Devpost
https://devpost.com/software/flare-e1ljfz

# Developers
- Pravat Bhusal (Deep Learning and Full-stack Developer)
- Michael Kasman (Deep Learning and Server-side Developer)
- Fronrich Puno (Front-end Developer)
- Mustafa Amir (UI/UX Designer)

# Technologies
- React Native
- Python 3.0+
- Flask
- Tensorflow 1.14.0
- Google Maps API

# Server-Side
We utilized Flask for the server-side. Inside the ```server``` directory, run ```python server.py``` to start the server.

# Client-Side
We utilized React Native for the client-side. To connnect the client to the server-side, inside the ```screens/Map.js```, change the IP Address inside of the String ```http://172.20.10.5:5000/predict_density``` to the IPV4 Address of the server you're using.

Finally, run ```npm install``` then ```npm start``` in the root directory to start the Expo React Native client.
