import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Button,
    Alert,} from 'react-native';

import CameraButton from './components/CameraButton';
import InfoButton from './components/InfoButton';
import PopulationMap from './components/PopulationMap';

export default class App extends Component {
    render = () => {
        return (
            <View style = {sectionStyles.container}>
                <StatusBar hidden={1} />
                <View style = {sectionStyles.header}>
                    <Image
                        style = {elementStyles.title}
                        source = {require('../Flare/assets/titleicon.png')}
                    />
                </View>
                <View style = {sectionStyles.body}>


                <PopulationMap/>


                </View>
                <View style = {sectionStyles.footer}>
                    <View style = {elementStyles.button}>
                        <InfoButton/>
                    </View>
                    <View style = {elementStyles.button}>
                        <CameraButton/>
                    </View>
                </View>

            </View>
        );
    }
}

const UI_THEME_COLOR_ONE = '#ff425e';
const UI_THEME_COLOR_TWO = '#ffffff';
const UI_THEME_FONT_ONE = 'Verdana';

const UI_THEME_TITLE_SIZE = '90%';

const elementStyles = StyleSheet.create({
    title: {
        resizeMode: 'contain',
        height: UI_THEME_TITLE_SIZE,
    },
    button: {
        width: 50,
        height: 50,

        margin: 20,

        alignItems: 'center',
        justifyContent: 'center',
    },
});

const sectionStyles = StyleSheet.create({
    header: {
        backgroundColor: UI_THEME_COLOR_ONE,
        width: '100%',
        height: '10%',

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        backgroundColor: 'white',
        width: '100%',
        height: '80%',

    },
    footer: {
        backgroundColor: UI_THEME_COLOR_ONE,
        width: '100%',
        height: '10%',

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

AppRegistry.registerComponent('App', () => App);
