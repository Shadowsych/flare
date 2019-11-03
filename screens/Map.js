import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    StatusBar,
    Button,
    Alert} from 'react-native';

import {LinearGradient} from 'expo-linear-gradient';
import CameraButton from '../components/CameraButton';
import InfoButton from '../components/InfoButton';
import PopulationMap from '../components/PopulationMap';

export default class Map extends Component {
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


                <PopulationMap/>


                </View>
                <LinearGradient
                        colors={[UI_THEME_COLOR_ONE, UI_THEME_COLOR_TWO]}
                        start={{ x: 0, y: .95 }}
                        end={{ x: 0, y: .3 }}
                        style = {sectionStyles.footer}>
                    <TouchableOpacity onPress={() => this.loadInfoPage()} style = {elementStyles.button}>
                        <InfoButton/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.loadCameraPage()} style = {elementStyles.button}>
                        <CameraButton/>
                    </TouchableOpacity>
                </LinearGradient>

            </View>
        );
    }

    // load the information page
    loadInfoPage() {
      this.props.navigation.navigate("Info");
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
