import { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            likeado: !this.props.datos.data.likeado.includes(auth.currentUser.email),
            boton: "Likear"
        }
    }

    actualizarDatos(){
        db.collection("posts")
        .doc(this.props.datos.id)
        .update({
           likeado: this.state.likeado ? firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) :  firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => {
        if(this.state.likeado){
            this.setState({
           boton: "Deslikear"
       })
       }
       else{
           this.setState({
               boton: "Likear"
           })
       }
       this.setState({likeado: !this.state.likeado})
    
        })
    }

    render(){
        return(
            <View>
                <Text>{this.props.datos.data.owner}: "{this.props.datos.data.posteo}"
                <TouchableOpacity onPress={() => this.actualizarDatos()}> 
                 <Text> {this.state.boton} </Text>
                </TouchableOpacity> 
                {this.props.datos.data.likeado.length} likes
                </Text>
            </View>
        )
    }
}

export default Post