import React, { Component } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuarios: [],
            posteos: [],
            cargando: true
        }

    }

    logout() {
        auth.signOut()
        navigation.navigate('Login')
    }


    componentDidMount() {
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let users = [];
                docs.forEach(doc => {
                    users.push({
                        id: doc.id,
                        data: doc.data()
                    })
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
                        data: doc.data()
                    })
                })
                this.setState({
                    posteos: posts,
                    cargando: false
                })
            }
        )
    }

    actualizarDatos(postId) {
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






    render() {
        return (
            <View style={styles.container}>
                {this.state.usuarios.length === 0 ? <ActivityIndicator /> :
                    <View style={styles.article}>
                        
                        <Text style={styles.texto}>Email: {auth.currentUser.email}</Text>
                        <Text style={styles.texto}>Usuario: {this.state.usuarios[0].data.user}</Text>
                        <Text style={styles.texto}>Este usuario realizo {this.state.posteos.length} posteos</Text>
                        <Text style={styles.texto}>Sus posteos son:</Text>
                            <FlatList data={this.state.posteos} keyExtractor={item => item.id.toString()} renderItem={({ item }) =>
                                <Text style={styles.textoFlat}>{item.data.posteo} <TouchableOpacity style={styles.botBorrar}onPress={() => this.actualizarDatos(item.id)}><Text style={styles.borrar}>Borrar posteo</Text></TouchableOpacity> </Text>} />

                        <TouchableOpacity style={styles.touchable}
                            onPress={() => this.logout()}>
                            <Text style={styles.textoDeslog}>Desloguearse</Text>
                        </TouchableOpacity>
                    </View>}


            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flex:1,
        backgroundColor: "black"
    },
    article: {
        margin: 10,
        padding: 8,
        flex:2,
       
        

    },
    borrar: {
        color: "red",
        textAlign: "center"
        
    },

    botBorrar:{
        width: 100,
        backgroundColor: "black",
        border: "1px solid white",
        marginTop: 5
    },
    texto: {
        margin: 8,
        color: "white",
    
    },
    textoFlat:{
        margin: 8,
        color: "white",
        borderColor:"white",
        borderRadius:4,
        border: "1px solid white",
        padding:5,
        display: "flex",
        flexDirection: "column"
    },
    textoDeslog:{
        backgroundColor: "red",
        border: "1px solid white",
        borderRadius:4,
        color: "white",
        width: 100,
        textAlign: "center"
    }, 
    touchable:{
        margin: 30,
    }
})

export default Profile