import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { cleanDetail, cleanPokemons, getDetail } from "../Redux/actions"
import pokeDefault from '../images/defaultPoke.png'
import Style from '../Detail/Detail.module.css'
import Loading from '../Loading/Loading'
import NavBar from "../NavBar/NavBar";


const Detail = () => {
    
    let {id} = useParams();

    const dispatch = useDispatch();
    const poke = useSelector((state) => state.pokeDetail)
    

    useEffect(() => {
        dispatch(getDetail(id))
        return () => {
            dispatch(cleanDetail(dispatch), cleanPokemons(dispatch))
        }
    }, [dispatch, id]);

    return(
        <div>
            <NavBar/>
            {
                
                poke.length > 0 ?
                <div className={Style.container}>
                    <div className={Style.card}>

                    <h2 className={Style.h2}>{poke[0].name.charAt(0).toUpperCase() + poke[0].name.slice(1)} </h2>
                    <img className={Style.image} src={poke[0].img ? poke[0].img : pokeDefault} alt="img not found" height='170vh' weight='170vh'></img>
                    <div className={Style.types}>
                        <h3>{poke[0].types?.map((e, k) => {
                            console.log(e);
                            return(
                                <div className={Style.types} key={k}>
                                    <p className={Style.text}> {e.name.charAt(0).toUpperCase() + e.name.slice(1)} </p>
                                </div>
                            )
                        })} </h3>
                    </div>
                    <h5 className={Style.h5}>HP: {poke[0].hp} </h5>
                    <h5 className={Style.h5}>Attack: {poke[0].attack} </h5>
                    <h5 className={Style.h5}>Defense: {poke[0].defense} </h5>
                    <h5 className={Style.h5}>Speed: {poke[0].speed} </h5>
                    <h5 className={Style.h5}>Height: {poke[0].height} </h5>
                    <h5 className={Style.h5}>Weight: {poke[0].weight} </h5>
                </div>
            </div> : 
                <div>
                    <Loading />
                </div>
            }
            <div>
                <Link to='/home'>
                    <button className={Style.btn}>Go back</button>
                </Link>
            </div>
        </div>
    )

}

export default Detail;