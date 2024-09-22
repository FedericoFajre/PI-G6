import React from "react"
import Header from "../../components/Header/Header"
import Detail from "../../components/Detail/Detail"
import Footer from "../../components/Footer/Footer"

function Detalle(props) {
  return(
    <React.Fragment>
      <Header/>
      <Detail id={props.match.params.id}/>
      <Footer/>
    </React.Fragment>
  )
};

export default Detalle;