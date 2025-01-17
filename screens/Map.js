import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    StatusBar,
    Platform,
    Button,
    Dimensions,
    Alert} from 'react-native';

import { Icon } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";

import {LinearGradient} from 'expo-linear-gradient';
import CameraButton from '../components/CameraButton';
import InfoButton from '../components/InfoButton';

import * as Location from "expo-location";

import {
    Appearance,
    AppearanceProvider,
    useColorScheme } from 'react-native-appearance';

// <InfoButton/>
// <CameraButton/>

export default class Map extends Component {
    // construct the state of the component
    constructor(props) {
      super(props);
      this.state = {
        location: {
          longitude: -97.73675,
          latitude: 30.28265
        },
        locationDelta: {
          longitudeDelta: 0.005,
          latitudeDelta: 0.005
        },
        markers: [
            
        ]
      }

      // initial mapview
      this.mapView = undefined;
    }

      // called whenever the component loads
     componentDidMount() {
       this.watchLocation();
     }


    render = () => {
        return (
            <View style = {sectionStyles.container}>
                <StatusBar hidden={true} />
                <View style = {sectionStyles.header}>
                    <Image
                        style = {elementStyles.title}
                        source = {require('../assets/titleicon.png')}
                    />
                </View>
                <View className = 'body' style = {sectionStyles.body}>


                    <View>
                        <AppearanceProvider>
                            <MapView
                                ref={(mapView) => {this.mapView = mapView}}
                                style={elementStyles.mapStyle}
                                mapType = 'standard'
                                initialRegion={{
                                  longitude: this.state.location.longitude,
                                  longitudeDelta: this.state.locationDelta.longitudeDelta,
                                  latitude: this.state.location.latitude,
                                  latitudeDelta: this.state.locationDelta.latitudeDelta
                                }}
                                showsUserLocation={true}
                            >
                            {this.state.markers.map((marker, key) => (
                                <MapView.Marker
                                    key = {key}
                                    coordinate = {{
                                        longitude: marker.longitude,
                                        latitude: marker.latitude,
                                    }}
                                    centerOffset = {{x: 0, y: -25}}
                                >
                                    <TouchableOpacity onPress={() => this.loadInfoPage()} style = {elementStyles.button}>
                                        {this.renderMarkerIcon(marker.risk)}
                                    </TouchableOpacity>

                                </MapView.Marker>
                            ))}
                            </MapView>
                        </AppearanceProvider>
                    </View>


                </View>
                <View style = {sectionStyles.footer}>
                    <TouchableOpacity onPress={() => this.loadInfoPage()} style = {elementStyles.button}>
                        <Icon reverse raised type = 'font-awesome' name = 'info' color = {UI_THEME_COLOR_ONE}/>


                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.uploadPictureDemo()} style = {elementStyles.button}>
                        <Icon reverse raised type = 'font-awesome' name = 'camera-retro' color = {UI_THEME_COLOR_ONE}/>


                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    // render the marker icon based on its risk
    renderMarkerIcon(risk) {
        if(risk == "Low") {
            return <Image style = {{height: 50, resizeMode: 'contain'}} source = {require('../assets/Low.png')}/>;
        } else if (risk == "Medium") {
            return <Image style = {{height: 50, resizeMode: 'contain'}} source = {require('../assets/Medium.png')}/>;
        } else if (risk == "High") {
            return <Image style = {{height: 50, resizeMode: 'contain'}} source = {require('../assets/High.png')}/>;
        }
    }

    // watch the location of the user
    async watchLocation() {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status === "granted") {
          // continously watch the location of the user
          Location.watchPositionAsync({enableBalancedAccuracy: true,
            timeInterval: 3000, distanceInterval: 10}, (position) => {
              // the transition time in miliseconds
              let transitionTime = 1000;

              // animate the camera to the region
              this.mapView.animateCamera({
                center: {
                  longitude: position.coords.longitude,
                  latitude: position.coords.latitude
                }
              }, transitionTime);

              // set the state of the longitude and latitude
              this.setState({
                location: {
                  longitude: position.coords.longitude,
                  latitude: position.coords.latitude
                }
              });
          }).then((resolved) => {
            return;
          }).catch((error) => {
            Alert.alert("GPS Error!", "Please make sure your location (GPS) is turned on.");
          });
        }
    }

    // load the information page
    loadInfoPage() {
      this.props.navigation.navigate("Info");
    }

    // load the photo page
    loadPhotoPage() {
      this.props.navigation.navigate("Picture");
    }

    // upload a picture demonstration
    async uploadPictureDemo() {
      await Permissions.askAsync(Permissions.CAMERA);
      await Permissions.askAsync(Permissions.CAMERA_ROLL);

      // open the camera, then await for the user to take a picture
      let picture = await ImagePicker.launchCameraAsync({
        base64: true,
        quality: 0.2,
        allowsEditing: true,
        aspect: [4, 3]
      });

        if(!picture.cancelled) {
            // send the picture to the server
            let pictureBase64 = `${picture.base64}`;

            // create the form data for the fetch request
            let formData = new FormData();
            formData.append("pictureBase64", pictureBase64);

            // send an HTTP request to the server to predict the population density
            await fetch("http://172.20.10.5:5000/predict_density", {
              method: "POST",
              body: formData,
              header: {
                "content-type": "multipart/form-data",
              },
            }).then((resolved) => {
                // Update the map by adding this marker
                resolved.json().then((risk) => {
                    if(risk == "Low" || risk == "Medium" || risk == "High") {
                        // add this marker into the map
                        this.setState({
                            markers: this.state.markers.concat({
                                risk: risk,
                                pictureBase64: pictureBase64,
                                longitude: this.state.location.longitude,
                                latitude: this.state.location.latitude
                            })
                        })
                    } else {
                        Alert.alert("No risk!", "There was no risk detected by the drone.");
                    }
                });
            }).catch((error) => {
              Alert.alert("Connection error!", error.message);
              return;
            });
        } else {
            return "None"
        }
    }
}

const UI_THEME_COLOR_ONE = '#ff425e';
const UI_THEME_COLOR_TWO = 'rgba(255,66,94,0)';
const UI_THEME_FONT_ONE = Platform.OS == "ios" ? "Verdana" : "Roboto";

const UI_THEME_TITLE_SIZE = '59%';

const elementStyles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    title: {
        resizeMode: 'contain',
        height: UI_THEME_TITLE_SIZE,
        top: 10,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 5,
        top: -10,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const sectionStyles = StyleSheet.create({
    header: {
        zIndex: 1,
        top: -20,
        position: 'absolute',
        backgroundColor: UI_THEME_COLOR_ONE,
        width: '65%',
        height: '10%',
        borderRadius: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
    footer: {
        bottom: 0,
        width: '100%',
        height: '10%',
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    container: {
        height: '100%',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
