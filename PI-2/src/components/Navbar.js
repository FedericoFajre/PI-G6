import { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {FontAwesome} from '@expo/vector-icons';
import Home from "./Home";
import Profile from "./Profile";
import NuevoPost from "../screens/NuevoPost";


const Tab = createBottomTabNavigator(); 

class Navbar extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} options={{tabBarIcon: () => <FontAwesome name="Home" size={22} color={"green"}/>}}/>
                <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: () => <FontAwesome name="Profile" size={22} color={"green"}/>}}/>
                <Tab.Screen name="Nuevo Post" component={NuevoPost} options={{tabBarIcon: () => <FontAwesome name="NuevoPost" size={22} color={"green"}/>}}/>

            </Tab.Navigator>
         
        )
    }
}



export default Navbar


