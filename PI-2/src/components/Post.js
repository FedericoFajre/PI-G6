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
                    boton: this.state.likeado ? "Deslikear" : "Likear"
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
           boton: "Likear"
       })
       }
       else{
           this.setState({
               boton: "Deslikear"
           })
       }
       this.setState({likeado: !this.state.likeado})
    
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>{this.props.datos.data.owner}: "{this.props.datos.data.posteo}"
                <TouchableOpacity onPress={() => this.actualizarDatos()}> 
                 <Text> {this.state.boton} </Text>
                </TouchableOpacity> 
                Este posteo tiene {this.props.datos.data.likeado.length} likes
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        marginTop: 20
    },
})

export default Post