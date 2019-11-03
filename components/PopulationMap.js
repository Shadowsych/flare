import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Dimensions} from 'react-native';

export default class PopulationMap extends Component {

    render() {
        return (
            <View>
                <MapView style={elementStyles.mapStyle} />
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
