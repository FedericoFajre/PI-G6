import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"

function NotFound(){
    return(
        <React.Fragment>
        <section className="error"> 
        <h1>Error 404</h1>
        <p>Contenido inexistente</p>
        <Link to="/">Presione aquí para volver a la página principal</Link>
        </section>
        </React.Fragment>
        
    )
}

export default NotFound