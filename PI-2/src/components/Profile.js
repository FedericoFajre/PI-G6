import React, { Component } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            usuarios: [],
            posteos: [],
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

        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()})
                })
                this.setState({
                    posteos: posts,
                    cargando: false
                })
            }
        )
    }

    actualizarDatos(postId){
        db.collection('posts')
        .doc(postId)
        .delete()
        .then(() => {
            console.log("Post eliminado exitosamente");
        })
        .catch((error) => {
            console.error("Error al eliminar el post: ", error);
        });
    
    };
    



    

    render(){
        return(
            <View style={styles.container}>
              {this.state.usuarios.length === 0 ? <ActivityIndicator/> : 
              <React.Fragment style={styles.article}>
                <Text>Email: {auth.currentUser.email}</Text>
              <Text>Usuario: {this.state.usuarios[0].data.user}</Text>
             <Text>Este usuario realizo {this.state.posteos.length} posteos</Text>
             <Text>Sus posteos son:</Text>
             <FlatList data={this.state.posteos} keyExtractor={item => item.id.toString()} renderItem={({item}) =>
              <Text>{item.data.posteo} <TouchableOpacity onPress={()=> this.actualizarDatos(item.id)}><Text style={styles.borrar}>Borrar posteo</Text></TouchableOpacity> </Text>}/>
              </React.Fragment>}
              
        <TouchableOpacity
          onPress={() => this.logout()}>
          <Text>Desloguearse</Text>
        </TouchableOpacity>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        marginTop: 20,
        flex:1
    },
    article:{
        margin: 10
    },
    borrar:{
        color: "red"
    }
})

export default Profile