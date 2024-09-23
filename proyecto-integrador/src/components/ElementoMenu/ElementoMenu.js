import React from "react";
import { Link } from "react-router-dom";
import "./ElementoMenu.css"


function ElementoMenu(props) {
    return(
        <li className="navbar"> <Link to={props.link}> {props.name}</Link></li>
    )
}

export default ElementoMenu; 