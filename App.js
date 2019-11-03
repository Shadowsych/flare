import {AppRegistry, Platform, StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import {fromRight, fromTop, fromLeft, zoomIn} from 'react-navigation-transitions';

// screens
import Map from "./screens/Map";
import Info from "./screens/Info";

// custom animation transitions
const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  if(prevScene &&
    prevScene.route.routeName == "Map"
    && nextScene.route.routeName == "Info") {
      return fromRight();
  }
  // by default, open the page from the left
  return fromLeft();
}

// create the stackNavigator that holds all the pages (Intents)
const Navigation = createStackNavigator({
  Map: {
    screen: Map
  },
	Info: {
		screen: Info
	}
}, {
  // default navigation options
  defaultNavigationOptions: {
    header: null
  },
  // transition animations to other pages
  transitionConfig: (nav) => handleCustomTransition(nav)
});

// export the App class as an app container
const App = createAppContainer(Navigation);
export default App;

// disable yellow Expo warning boxes
console.disableYellowBox = true;
