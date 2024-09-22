import React, {Component} from 'react'
import "./Filtrar.css"

class Filtrar extends Component{
constructor(props){
    super(props)
    this.state = {
        input: ""
    }
}

evitarSubmit(event){
    event.preventDefult();
}

controlarCambios(event){
    this.setState({
        input: event.target.value
    }, 
    ()=> this.props.filtroPeliculas(this.state.input))
}


render(){
    return(
        <form className="formulario" onSubmit={(event) => this.evitarSubmit(event)}>
            <label>Escribir nombre: </label>
            <input type='text' onChange={(event)=>this.controlarCambios(event)} value={this.state.input}/>
        </form>
    )
}
}

export default Filtrar