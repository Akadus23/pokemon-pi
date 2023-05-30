import React, { useState, useEffect } from 'react';
import NavBar from "../NavBar/NavBar";
import { cleanPokemons, getPokemons } from '../Redux/actions'
import {useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import Style from './Home.module.css'
import Loading from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';
import Filters from '../Filters/Filters';

export default function Home(){

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)
    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);

    const indexLastPokemon = currentPage * pokemonsPerPage;
    const indexFirstPokemon = indexLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexFirstPokemon, indexLastPokemon)

    const pagination = pagesNumber => {
        setCurrentPage(pagesNumber)
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(cleanPokemons(dispatch))
        dispatch(getPokemons())
    }

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])

    

    return <div>
        <NavBar/>
        { allPokemons.length > 0 ?
        <div>
            <div>
                <Pagination 
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    pagination={pagination}
                />
            </div>
        <div className={Style.home}>
            <div className={Style.filters}>
                <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />
                <button className={Style.btn} onClick={e => {handleClick(e)}}>Clear filters</button>
            </div>

            <div className={Style.cards}>
            {
                currentPokemons?.map((e, k) => {
                    if(e.name){
                        return(
                            <div key={k} className={Style.card}>
                            <Card 
                            key={e.id}
                            id={e.id}
                            name={e.name}
                            img={e.img}
                            types={e.types}
                            />
                        </div>
                    )
                }
            })
        }
        </div>
        </div>
        </div> : 
        <Loading />
        
        }
    </div>
}