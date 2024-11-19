import { Component } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { auth, db } from "../firebase/config";

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            usuario: "",
            registered: "",
            errorMail: "",
            errorPass: "",
            errorUser: "",
            errorReg: "",
            error: ""
        }
    }

    onSubmit(email, pass, usuario){
        if(!this.state.email.includes("@")){
            this.setState({errorMail: "Email mal formateado"})
       }
       if (this.state.password.length < 6) {
            this.setState({errorPass: "La contraseña debe tener una longitud mínima de 6 caracteres"})
        }
        if (this.state.usuario.length === 0) {
            this.setState({errorUser: "El usuario debe ser completado"})
        }
        auth.createUserWithEmailAndPassword(email, pass)
        .then(response => {
            this.setState({registered: true})
            db.collection('users').add({
                owner: email,
                createdAt: Date.now(),
                user: usuario
            })
            this.props.navigation.navigate('Login');

        })
        .catch(err => {
            this.setState({error: "Fallo en el registro"})
        })
        
    }
    

    render(){
        return(
            <View>
                <TextInput
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={ text => this.setState({email:text})}
                value={this.state.email}
                />
                <Text>{this.state.errorMail}</Text>
                <TextInput
                keyboardType="default"
                placeholder="Usuario"
                onChangeText={ text => this.setState({usuario:text})}
                value={this.state.usuario}
                />
                <Text>{this.state.errorUser}</Text>
                <TextInput
                keyboardType="default"
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={ text => this.setState({password:text})}
                value={this.state.password}
                />
                <Text>{this.state.errorPass}</Text>
                <TouchableOpacity
                onPress={() => this.onSubmit(this.state.email, this.state.password, this.state.usuario)}>
                    <Text>Resgistrate</Text>
                </TouchableOpacity>
                <Text>{this.state.error}</Text>

        <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Ir al Login</Text>
        </TouchableOpacity>
            </View>
        )
    }

}

export default Register