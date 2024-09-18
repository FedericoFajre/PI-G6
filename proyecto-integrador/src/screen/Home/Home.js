import React from "react"
import Header from "../../components/Header/Header"
import Peliculas from "../../components/Peliculas/Peliculas"
import Footer from "../../components/Footer/Footer"

function Home() {
  return(
    <React.Fragment>
      <Header/>
      <Peliculas/>
      <Footer/>
    </React.Fragment>
  )
};

export default Home;