import React from "react";
import { Link } from 'react-router-dom';
import pokemonTitle from '../images/pokemonTitle.gif';
import Style from './Navbar.module.css'

export default function NavBar () {
    return (
        <header>
            <nav className={Style.nav}>
                <div>
                    <img className={Style.img} src={pokemonTitle} alt="img not found" />
                </div>
                <div>
                    <Link to='/home'>
                        <button className={Style.btn}>Home</button>
                    </Link>
                </div>
                <div>
                    <Link to='/form'>
                        <button className={Style.btn}>Create a Pokemon</button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}