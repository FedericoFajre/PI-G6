import { Component } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
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
            error: "Completar todos los campos"
        }
    }

    onSubmit(email, pass, usuario){
        if(!this.state.email.includes("@")){
            this.setState({errorMail: "Email mal formateado"})
       }
       if (this.state.password.length < 6) {
            this.setState({errorPass: "La contraseña debe tener una longitud mínima de 6 caracteres"})
        }
        if (this.state.usuario.length < 4) {
            this.setState({errorUser: "El usuario debe tener una longitud mínima de 4 caracteres"})
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
         const completarForm = this.state.email.length > 0 && this.state.password.length > 0 && this.state.usuario.length > 0;
        return(
            <View style={styles.container}>
                <TextInput style={styles.input}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={ text => this.setState({email:text})}
                value={this.state.email}
                />
                <Text>{this.state.errorMail}</Text>
                <TextInput style={styles.input}
                keyboardType="default"
                placeholder="Usuario"
                onChangeText={ text => this.setState({usuario:text})}
                value={this.state.usuario}
                />
                <Text>{this.state.errorUser}</Text>
                <TextInput style={styles.input}
                keyboardType="default"
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={ text => this.setState({password:text})}
                value={this.state.password}
                />
                <Text>{this.state.errorPass}</Text>


                {completarForm ? <TouchableOpacity style={styles.boton}
                onPress={() => this.onSubmit(this.state.email, this.state.password, this.state.usuario)}> 
                <Text style={styles.texto}>Resgistrate</Text> 
                </TouchableOpacity> : <Text style={styles.completar}>{this.state.error}</Text>}
                

        <TouchableOpacity style={styles.container}
                onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Ir al Login</Text>
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

export default Register