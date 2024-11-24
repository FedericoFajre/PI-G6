import { Component } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { auth } from "../firebase/config";

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            errorMail: "",
            errorPass: "",
            error: "",
            password: "",
            loggedIn: ""
        }
    }

    onSubmit(email, pass){
            if (!this.state.email.includes("@")) {
                 this.setState({errorMail: "Email mal formateado"})
            }
            if (this.state.password.length < 6) {
                this.setState({errorPass: "La password debe tener una longitud mínima de 6 caracteres"})
           }
            auth.signInWithEmailAndPassword(email, pass)
            .then(response => {
                this.setState({loggedIn: true})
                this.props.navigation.navigate('Navbar');
            })
            .catch(err => {
               this.setState({error: "Credenciales incorrectas"}) })
    
        
    }


    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.input}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={text => this.setState({email: text})}
                value={this.state.email}/>
                <Text>{this.state.errorMail}</Text>
                <TextInput style={styles.input}
                keyboardType="default"
                placeholder="Contraseña"
                secureTextEntry= {true}
                onChangeText={text => this.setState({password: text})}
                value={this.state.password}/>
                <Text>{this.state.errorPass}</Text>
                <TouchableOpacity style={styles.boton}
                onPress={() => this.onSubmit(this.state.email, this.state.password)}>
                    <Text style={styles.texto}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container}
                onPress={() => this.props.navigation.navigate('Register')}>
                    <Text>Ir al Registro</Text>
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
        borderColor: "#28a745",
        marginTop: 10       


    },
    texto:{
        color: "#fff"
    },
    completar:{
        color: "red"
    }
})

export default Login