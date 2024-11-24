import { Component } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { db } from "../firebase/config";
import Post from "./Post";

class Home extends Component{
    constructor(){
        super()
        this.state = {
            posteo: [],
            cargando: true
        }
    }

    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()})
                })
                this.setState({
                    posteo: posts,
                    cargando: false
                })
            }
        )
    }

    render(){
        return(
            <View style={styles.container}>
               {this.state.cargando ? <ActivityIndicator/> : <FlatList data={this.state.posteo} keyExtractor={item => item.id.toString()} renderItem={({item}) => <Post datos={item}/>}/>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        marginTop: 20,
        flex:1,
        paddingBottom: 10
    },
})

export default Home