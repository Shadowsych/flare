import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

Blueprint

Splash Screen (Amirs logo)
big logo

/*

Homepage
Minimal UI
Map using google API
Header with product logo & '+' & 'i'
+ icon accesses phone camera
i icon accesses legend

camera

Minimal UI
Similar to Snapchat

Legend
info popup
short description of icons
1 - 5 - 1 person
6-30 - 3 people
31 <= - 5 people

Color Scheme

Red - RED
White - WHITE
*/


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
