import React, {Component} from "react";
import "./Detail.css"

class Detail extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: this.props.id,
            info: []
        }
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/${this.state.id}?api_key=`+ process.env.REACT_APP_API_KEY)
        .then(res => res.json())
        .then((data)=> {
        console.log(data);
        this.setState({
            info: data
            })
    })
        .catch(error => console.log(error));

    }

    render(){
        return(
            <section className="detail">
                 {this.state.info.length === 0 ?
            <h3>Cargando...</h3>:
            <React.Fragment>
                <div className="divDetail">
            <img src={"https://image.tmdb.org/t/p/original" + this.state.info.poster_path} alt=""/>
                </div>
            <article className="artDetail">
            <h2>{this.state.info.title}</h2>
            <p><strong>Rating:</strong> {this.state.info.vote_average}</p>
            <p><strong>Duracion:</strong> {this.state.info.runtime} minutos</p>
            <p><strong>Fecha de estreno:</strong> {this.state.info.release_date}</p>
            <p><strong>Sinopsis:</strong> {this.state.info.overview}</p>
            <p><strong>Generos:</strong> {this.state.info.genres.map((genero, idx) => <li key={genero + idx}>{genero.name}</li>)}</p>
            </article>    
            </React.Fragment>
            
            
            }

            </section>
            
        )
    }
}


export default Detail