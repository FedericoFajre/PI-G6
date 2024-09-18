import React, {Component} from "react"
import ListaPeli from "../ListaPeli/ListaPeli"
import "./Peliculas.css"

class Peliculas extends Component{
constructor(props){
    super(props)
    this.state = {
        peliculas: ""
    }
}

componentDidMount(){
    fetch('https://api.themoviedb.org/3/movie/popular?api_key='+ process.env.REACT_APP_API_KEY)
    .then(res => res.json())
    .then((data)=> {
        console.log(data);
        this.setState({
            peliculas: data.results,
            filtro: data.results
        })
    })
}

filtrarPeliculas(){
    let peliFiltrada = this.state.filtro.filter((pj)=> pj.index = 5)
    this.setState({
        peliculas: peliFiltrada
    })
}

render(){
    return(
        
        <section className="contenedor">
            {this.state.peliculas.length === 0 ?
            <h3>Cargando...</h3>:
           this.state.peliculas.map((peli, idx) =>  <ListaPeli key={peli + idx} data= {peli}/>)}
            
        </section>
      
    )
}
}

export default Peliculas