import { Component } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { db, auth } from "../firebase/config";

class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            usuarios: [],
            cargando: true
        }
        
    }

    logout(){
        auth.signOut()
        navigation.navigate('Login')
        }

    componentDidMount(){
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
             docs => {
                let users = [];
                docs.forEach(doc => {
                    users.push({
                        id: doc.id,
                        data: doc.data()})
                })
                this.setState({
                    usuarios: users,
                    cargando: false
                }

                )
                
            }
        )
    }


    

    render(){
        return(
            <View>
                <Text>{auth.currentUser.email}</Text>
              {this.state.usuarios.length === 0 ? <ActivityIndicator/> : <Text>{this.state.usuarios[0].data.user}</Text>} 
        <TouchableOpacity
          onPress={() => this.logout()}>
          <Text>Desloguearse</Text>
        </TouchableOpacity>
            </View>
        )
    }

}

export default Profile