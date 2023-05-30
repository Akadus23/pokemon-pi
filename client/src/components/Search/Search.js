import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { cleanPokemons, getPokemonByName } from "../Redux/actions";
import Style from './Search.module.css'

const Search = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(cleanPokemons(dispatch));
        dispatch(getPokemonByName(name));
        setName('');
    }

    return (
        <div className={Style.search}>
            <form onSubmit={e => handleSubmit(e)}>
                <input className={Style.input} type="text" placeholder="Name..." onChange={e => {handleInputChange(e)}} value={name} />
                <button className={Style.btn} type="submit">Search</button>
            </form>
        </div>
    )

}

export default Search;