import React, {Component} from "react"
import ListaPeli from "../ListaPeli/ListaPeli"
import "./Peliculas.css"
import { Link } from "react-router-dom/cjs/react-router-dom"

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
    .catch(error => console.log(error));
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
            <React.Fragment>
            <div className="titulo">
            <Link to="/catalogo">Peliculas Populares</Link>
            </div>
            <article className="articulo"> 
           {this.state.peliculas.map((peli, idx) =>  <ListaPeli key={peli + idx} data= {peli}/>)}
            </article>                
            </React.Fragment>
            
}
            
        </section>
      
    )
}
}

export default Peliculas