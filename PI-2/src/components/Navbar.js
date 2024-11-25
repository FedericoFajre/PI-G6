import { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Home from "./Home";
import Profile from "../screens/Profile";
import NuevoPost from "../screens/NuevoPost";


const Tab = createBottomTabNavigator(); 

class Navbar extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} options={{tabBarIcon: () => <FontAwesome name="home" size={24} color={"black"}/>}}/>
                <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: () => <AntDesign name="user" size={24} color={"black"}/>}}/>
                <Tab.Screen name="Nuevo Post" component={NuevoPost} options={{tabBarIcon: () => <MaterialIcons name="post-add" size={24} color={"black"}/>}}/>

            </Tab.Navigator>
         
        )
    }
}



export default Navbar


