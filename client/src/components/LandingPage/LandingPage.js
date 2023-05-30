import React from "react";
import { Link } from 'react-router-dom';
import PokeTitle from '../images/pokemonTitle.gif';
import Style from './LandingPage.module.css'

export default function LandingPage(){
    return(
        <div className={Style.bg}>
            <img src={PokeTitle} alt="img not found" className={Style.image} />
            <h2 className={Style.author}>by Davinson Villamizar</h2>
            <Link to='/home'>
                <button className={Style.buttonIng}>PRESS START</button>
            </Link>
        </div>
    )
}