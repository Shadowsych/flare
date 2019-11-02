import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style = {sectionStyles.container}>
        <View style = {sectionStyles.header}>
            <Text style = {elementStyles.title}>
                FLARE
            </Text>
        </View>
        <View style = {sectionStyles.body}>

        </View>
        <View style = {sectionStyles.footer}>
            <View style = {elementStyles.button}>

            </View>
            <View style = {elementStyles.button}>

            </View>
        </View>

    </View>
  );
}

const UI_THEME_COLOR_ONE = '#ff425e';
const UI_THEME_COLOR_TWO = '#ffffff';

const elementStyles = StyleSheet.create({
    title: {
        color: UI_THEME_COLOR_TWO,
        fontWeight: 'bold',
        fontSize: 65,
        textAlign: 'center',
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
