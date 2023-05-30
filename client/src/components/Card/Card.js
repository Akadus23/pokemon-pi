import React from "react";
import { NavLink } from "react-router-dom";
import defaultPoke from '../images/defaultPoke.png';
import Style from './Card.module.css'

export default function Card({name, img, types, id}){
    return(
        <div className={Style.all}>
            <NavLink className={Style.none}  to={`/pokemon/${id}`}>
                <div>
                    <img src={img ? img: defaultPoke} alt="img not found"  width="150px" height="150px" />
                    <h2>{ name ? name.toUpperCase(): 'unknwon'} </h2>
                    <div className={Style.types}>
                        {
                            
                            types?.map((e, k) => {
                                return(
                                    <div key={k}>
                                        
                                        <p  className={Style.text}>
                                            
                                            {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                                            
                                        </p>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </NavLink>
        </div>
    )
}