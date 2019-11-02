import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar} from 'react-native';

export default class App extends React.Component {
    render() {
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

                </View>
                <View style = {sectionStyles.footer}>
                    <View style = {elementStyles.button}></View>
                    <View style = {elementStyles.button}></View>
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
        backgroundColor: UI_THEME_COLOR_TWO,
        width: 75,
        height: 45,

        margin: 20,
        borderRadius: 100,
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
