import { Component } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
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
            <View>
                 <TextInput
                keyboardType="default"
                placeholder="post"
                onChangeText={text => this.setState({post: text})}
                value={this.state.post}
                />

                <TouchableOpacity
                onPress={()=>this.posteo(this.state.post, this.state.like)}>
                    <Text>Postear</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default NuevoPost