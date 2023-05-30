import React from "react";
import './Loading.module.css';
import LoadPoke from '../images/LoadingPokeball.gif'
import Style from './Loading.module.css'
const Loading = () => {
    return (
        <div>
            <img className={Style.container} src={LoadPoke} width='500px' height='500px'></img>
        </div>
    )
}

export default Loading;