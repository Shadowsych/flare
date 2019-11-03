import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Button,
    Alert} from 'react-native';

export default class Info extends Component {
    render = () => {
        return (
            <View style = {sectionStyles.container}>
            </View>
        );
    }
}

const UI_THEME_COLOR_ONE = '#ff425e';
const UI_THEME_COLOR_TWO = 'rgba(255,66,94,0)';
const UI_THEME_FONT_ONE = 'Verdana';

const UI_THEME_TITLE_SIZE = '59%';

const elementStyles = StyleSheet.create({
    title: {
        resizeMode: 'contain',
        height: UI_THEME_TITLE_SIZE,
        top: 10,
    },
    button: {
        width: 50,
        height: 50,
        top: 35,
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
        height: '20%',
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
