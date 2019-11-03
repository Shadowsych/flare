import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {
    Alert,
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Dimensions} from 'react-native';

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import {
    Appearance,
    AppearanceProvider,
    useColorScheme } from 'react-native-appearance';


export default class PopulationMap extends Component {

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
      markers: []
    }

    // initial mapview
    this.mapView = undefined;
  }

    // called whenever the component loads
   componentDidMount() {
     this.watchLocation();
   }

    render() {
        return (
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
                    />
                </AppearanceProvider>
            </View>
        )
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
}

const elementStyles = StyleSheet.create({
    mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

AppRegistry.registerComponent('PopulationMap', () => PopulationMap);
