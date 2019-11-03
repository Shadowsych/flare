import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Platform,
    Button,
    Alert} from 'react-native';

export default class Info extends Component {
    render = () => {
        return (
            <View style = {sectionStyles.container}>
                <View style = {sectionStyles.header}>
                    <Text style = {elementStyles.title}>
                        Victim Density
                    </Text>
                </View>

                <View style = {elementStyles.helpBox}>
                    <Image
                        style = {elementStyles.helpImage}
                        source = {require('../assets/green.png')}
                    />
                    <Text style = {elementStyles.helpText}>
                        - Low Density (1-5 Victims)
                    </Text>
                </View>
                <View style = {elementStyles.helpBox}>
                    <Image
                        style = {elementStyles.helpImage}
                        source = {require('../assets/orange.png')}
                    />
                    <Text style = {elementStyles.helpText}>
                        - Medium Density (6-14 Victims)
                    </Text>
                </View>
                <View style = {elementStyles.helpBox}>
                    <Image
                        style = {elementStyles.helpImage}
                        source = {require('../assets/red.png')}
                    />
                    <Text style = {elementStyles.helpText}>
                        - High Density (More Than 15 Victims)
                    </Text>
                </View>

                <View style = {sectionStyles.footer}>
                    <Text style = {elementStyles.title}>
                        SWIPE RIGHT TO RETURN >>>
                    </Text>
                </View>
            </View>
        );
    }
}

const UI_THEME_COLOR_ONE = '#ff425e';
const UI_THEME_COLOR_TWO = 'rgba(255,66,94,0)';
const UI_THEME_FONT_ONE = Platform.OS == "ios" ? "Verdana" : "Roboto";

const UI_THEME_TITLE_SIZE = '59%';

const elementStyles = StyleSheet.create({
    helpBox: {
        width: '95%',
        height: 70,
        backgroundColor: '#eee',
        borderRadius: 20,
        margin: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    helpImage: {
        resizeMode: 'contain',
        height: '100%',
        flexBasis: '20%',
    },
    helpText: {
        fontFamily: UI_THEME_FONT_ONE,
        fontSize: 15,
        flexBasis: '80%',

    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'white',
    },
});

const sectionStyles = StyleSheet.create({
    header: {
        zIndex: 1,
        top: 0,
        position: 'absolute',
        backgroundColor: UI_THEME_COLOR_ONE,
        width: '100%',
        height: '10%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        height: '100%',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        zIndex: 1,
        bottom: 0,
        position: 'absolute',
        backgroundColor: UI_THEME_COLOR_ONE,
        width: '100%',
        height: '10%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
