import React from "react";
import ElementoMenu from "../ElementoMenu/ElementoMenu";
import "./Header.css"

function Header (){

    return(
        <nav>
            <ul className="nav">
                <ElementoMenu name="Home" link="/"/>
                <ElementoMenu name="Catalogo" link="/catalogo"/>
            </ul>
            <ul className="logo">
                <li>PeliculasYA</li>
            </ul>
        </nav>
    );
}

export default Header