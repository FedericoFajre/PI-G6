import { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            posteo: [],
            likeado: this.props.datos.data.likeado.includes(auth.currentUser.email),
            boton: "likear"
        }
    }
    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()})
                })
                this.setState({
                    posteo: posts,
                    boton: this.state.likeado ? "Dislike" : "Like"
                })
            }
        )
    }
    actualizarDatos(){
        db.collection("posts")
        .doc(this.props.datos.id)
        .update({
           likeado: !this.state.likeado ? firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) :  firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => {
        if(this.state.likeado){
            this.setState({
           boton: "Like"
       })
       }
       else{
           this.setState({
               boton: "Dislike"
           })
       }
       this.setState({likeado: !this.state.likeado})
    
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.texto}>{this.props.datos.data.owner}: "{this.props.datos.data.posteo}" </Text>
                <TouchableOpacity style={styles.likeo} onPress={() => this.actualizarDatos()}> 
                 <Text> {this.state.boton} </Text>
                </TouchableOpacity> 
                 <Text style={styles.texto}>{this.props.datos.data.likeado.length} likes</Text> 
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        marginTop: 20,
        flex: 1, 
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
        borderColor:"white",
        borderRadius:4,
        border: "1px solid white"
    },
    likeo: {
        backgroundColor: "#D3D3D3",
        borderRadius: 2,
        borderStyle: "solid",
        borderColor: "black",
        width: 50,
        alignItems: "center"
    },
    texto: {
        color: "white"
    }
})

export default Post