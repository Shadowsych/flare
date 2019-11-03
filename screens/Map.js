import React, {Component} from 'react';
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
    Alert} from 'react-native';

import { Icon } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";

import {LinearGradient} from 'expo-linear-gradient';
import CameraButton from '../components/CameraButton';
import InfoButton from '../components/InfoButton';
import PopulationMap from '../components/PopulationMap';

// <InfoButton/>
// <CameraButton/>

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

    // load the information page
    loadInfoPage() {
      this.props.navigation.navigate("Info");
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
          resolved.json().then((data) => {
            Alert.alert("Test", data);
          });
        }).catch((error) => {
          Alert.alert("Connection error!", error.message);
          return;
        });
      }
    }
}

const UI_THEME_COLOR_ONE = '#ff425e';
const UI_THEME_COLOR_TWO = 'rgba(255,66,94,0)';
const UI_THEME_FONT_ONE = Platform.OS == "ios" ? "Verdana" : "Roboto";

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
