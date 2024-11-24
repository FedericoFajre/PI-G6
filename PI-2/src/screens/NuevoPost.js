import { Component } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

class NuevoPost extends Component{
    constructor(){
        super()
        this.state = {
            post: "",
            email: "",
            like: [],

        }
    }

    posteo(post, like){
        db.collection("posts").add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            posteo: post,
            likeado: like
        })
    }

    render(){
        return(
            <View style={styles.container}>
                 <TextInput style={styles.input}
                keyboardType="default"
                placeholder="Postea"
                onChangeText={text => this.setState({post: text})}
                value={this.state.post}
                />

                <TouchableOpacity style={styles.boton}
                onPress={()=>this.posteo(this.state.post, this.state.like)}>
                    <Text style={styles.texto}>Postear</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        marginTop: 20
    },
    input:{
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10
    },
    boton:{
        backgroundColor: "#28a745",
        paddingHorizontal: 10,
        paddingVertical: 6, 
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28a745"


    },
    texto:{
        color: "#fff"
    }
})

export default NuevoPost