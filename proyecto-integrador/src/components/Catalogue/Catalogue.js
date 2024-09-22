import React, {Component} from 'react'
import ListaCata from '../ListaCata/ListaCata'
import Filtrar from '../Filtrar/Filtrar'
import "./Catalogue.css"

class Catalogue extends Component{
    constructor(props){
        super(props)
        this.state = {
            catalogo: "",
            filtrado: ""
        }
    }

    componentDidMount(){
    fetch('https://api.themoviedb.org/3/movie/popular?api_key='+ process.env.REACT_APP_API_KEY)
    .then(res => res.json())
    .then((data)=> {
        console.log(data);
        this.setState({
            catalogo: data.results,
            filtrado: data.results
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

    


    render(){
        return(

        <section className="contenedor">
            {this.state.catalogo.length === 0 ?
            <h3>Cargando...</h3>:
            <React.Fragment>
                <div className='formulario'>
                    <Filtrar filtroPeliculas={(titulo) => this.filtroPeliculas(titulo)}/>
                </div>
            <article className='articulo'>
           {this.state.catalogo.map((verTodo, idx) =>  <ListaCata key={verTodo + idx} data= {verTodo}/>)}
            </article>
            <div className='divBoton'>
                <button>Ver más</button>
            </div>
           </React.Fragment>
           }
        </section>  
            
       




        )
    }
}


export default Catalogue