import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,} from 'react-native';

export default class InfoButton extends Component {

    render() {
        return (
            <View>
                <Image
                    style = {elementStyles.image}
                    source = {require('../assets/i.png')}
                />
            </View>
        )
    }
}

const elementStyles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
        height: '100%',
    },
});

AppRegistry.registerComponent('InfoButton', () => InfoButton);
