import React, {Component} from "react"
import { Link } from "react-router-dom/cjs/react-router-dom"
import "./ListaPeli.css"


class ListaPeli extends Component{
constructor(props){
    super(props)
    this.state = {
        movie: "",
        oculto: true,
        boton: "Ver más",
        vision: "Ver Menos"
    }
}

abrir(){
    if(this.state.oculto){
        this.setState({
       boton: "Ver menos",
       vision: "verMas"
   })
   }
   else{
       this.setState({
           boton: "Ver más",
           vision: "verMenos"
       })
   }
   this.setState({oculto: !this.state.oculto})
}

render(){
    return(

        <article className="tarjetas">
            <img src= {"https://image.tmdb.org/t/p/original" + this.props.data.poster_path} alt=""/>
            <h2>{this.props.data.title}</h2>
            <p className={this.state.vision}>{this.props.data.overview}</p>
            <button onClick={()=> this.abrir()}>{this.state.boton}</button>
            <Link to={`/detalle/${this.props.data.id}`}>Ir al detalle</Link>
        </article>
        
        
    )
}
}

export default ListaPeli 