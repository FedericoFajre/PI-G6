import React from "react";
import ElementoMenu from "../ElementoMenu/ElementoMenu";
import "./Header.css"

function Header (){

    return(
        <nav>
            <ul className="nav">
                <ElementoMenu name="Home" link="/"/>
                <ElementoMenu name="Catalogo Populares" link="/catalogo"/>
            </ul>
            <ul className="logo">
            <ElementoMenu name="PeliculasYa" link="/"/>
            </ul>
        </nav>
    );
}

export default Header