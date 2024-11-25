import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Navbar from './src/components/Navbar';
import Profile from './src/screens/Profile';

const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
     <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Navbar" component={Navbar} options={{headerShown: false}}/>
      <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}


