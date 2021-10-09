import 'react-native-gesture-handler';
/**
 * This library is a polyfill for environments 
 * where the standard crypto.getRandomValues() API is not supported.
 * See https://github.com/uuidjs/uuid#getrandomvalues-not-supported for reference.
 * */
import 'react-native-get-random-values';
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
