import { Component } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
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
            <View>
                <TextInput
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={text => this.setState({email: text})}
                value={this.state.email}/>
                <Text>{this.state.errorMail}</Text>
                <TextInput
                keyboardType="default"
                placeholder="Contraseña"
                secureTextEntry= {true}
                onChangeText={text => this.setState({password: text})}
                value={this.state.password}/>
                <Text>{this.state.errorPass}</Text>
                <TouchableOpacity
                onPress={() => this.onSubmit(this.state.email, this.state.password)}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Register')}>
                    <Text>Ir al Registro</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default Login