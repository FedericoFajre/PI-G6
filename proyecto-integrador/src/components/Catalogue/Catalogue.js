import React, {Component} from 'react'
import ListaCata from '../ListaCata/ListaCata'
import Filtrar from '../Filtrar/Filtrar'
import "./Catalogue.css"

class Catalogue extends Component{
    constructor(props){
        super(props)
        this.state = {
            catalogo: "",
            filtrado: "",
            numeroPagina: 1
        }
    }

    componentDidMount(){
    fetch('https://api.themoviedb.org/3/movie/popular?api_key='+ process.env.REACT_APP_API_KEY)
    .then(res => res.json())
    .then((data)=> {
        console.log(data);
        this.setState({
            catalogo: data.results,
            filtrado: data.results,
            numeroPagina: this.state.numeroPagina + 1
        })
    })
    .catch(error => console.log(error));
    }

    filtroPeliculas(titulo){
        let peliFiltradas = this.state.filtrado.filter((verTodo)=> verTodo.title.toLowerCase().includes(titulo.toLowerCase()))
        this.setState({
            catalogo: peliFiltradas
        })
    }

    cargarMas(){
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${this.state.numeroPagina}`)
        .then(res => res.json())
        .then((data)=> {
        console.log(data);
        this.setState({
            catalogo: this.state.catalogo.concat(data.results),
            numeroPagina: this.state.numeroPagina + 1
        })
    })
        .catch(error => console.log(error));
    }

    


    render(){
        return(

        <section className="contenedor">
            <div className='formulario'>
                    <Filtrar filtroPeliculas={(titulo) => this.filtroPeliculas(titulo)}/>
            </div>
            {this.state.catalogo.length === 0 ?
            <h3>Cargando...</h3>:
            <React.Fragment>
            <article className='articulo'>
           {this.state.catalogo.map((verTodo, idx) =>  <ListaCata key={verTodo + idx} data= {verTodo}/>)}
            </article>
            <div className='divBoton'>
                <button onClick={()=>this.cargarMas()}>Ver más</button>
            </div>
           </React.Fragment>
           }
        </section>  
            
       




        )
    }
}


export default Catalogue