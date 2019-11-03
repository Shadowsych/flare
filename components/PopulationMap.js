import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Dimensions} from 'react-native';

import {
    Appearance,
    AppearanceProvider,
    useColorScheme } from 'react-native-appearance';


export default class PopulationMap extends Component {

    render() {
        return (
            <View>
                <AppearanceProvider>
                    <MapView
                        style={elementStyles.mapStyle}
                        mapType = 'standard'
                        showsUserLocation = {true}
                        followsUserLocation = {true}
                        maxZoomLevel = {20}
                    />
                </AppearanceProvider>
            </View>
        )
    }
}



const elementStyles = StyleSheet.create({
    mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

AppRegistry.registerComponent('PopulationMap', () => PopulationMap);
