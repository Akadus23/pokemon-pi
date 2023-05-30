import axios from 'axios';
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const CLEAN_POKEMONS = "CLEAN_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_NAME = "ORDER_NAME";
export const FILTER_TYPE = "FILTER_TYPE";
export const ORDER_STR = "ORDER_STR";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME"

export const getPokemons = () =>{
    return  function(dispatch){
        try {
            let url = 'http://localhost:3001/pokemons';
            fetch(url)
            .then((response) => response.json())
            .then((data) => { dispatch({
                type: GET_POKEMONS,
                payload: data
            })
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export function getDetail(id){
    return function (dispatch){
        axios.get(`http://localhost:3001/pokemons/${id}`)
        .then((poke) => {
            dispatch({
                type: GET_DETAIL,
                payload: poke.data
            })
        })
        .catch(error => console.log(error))
    }
}

export const cleanPokemons = (dispatch) => {
    return dispatch({
        type: CLEAN_POKEMONS,
        payload: []
    })
}

export const cleanDetail = (dispatch) => {
    return dispatch({
        type: CLEAN_DETAIL,
        payload: []
    })
}

export const getTypes = () => {
    return async (dispatch) => {
        try {
            await axios.get('http://localhost:3001/types').then((types) => {
                let allTypes = types.data.map((type) => type.name)
                return dispatch({
                    type: GET_TYPES,
                    payload: allTypes
            })
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export const createPokemon = (payload) => {
    return async () => {
        try {
            var createPoke = await axios.post('http://localhost:3001/pokemons', payload);
            console.log(createPoke);
            alert('New pokemón is created!');
            return createPoke;
        } catch (e) {
            alert('Pokemon name already exist')
            console.log(e);
        }
    };
};

export const filterCreated = (payload) => {
    return {
        type: FILTER_CREATED,
        payload: payload
    };
};

export const orderName = (payload) => {
    return {
        type: ORDER_NAME,
        payload: payload
    };
};

export const filterType = (payload) => {
    return {
        type: FILTER_TYPE,
        payload: payload
    };
};

export const filterStr = (payload) => {
    return {
        type: ORDER_STR,
        payload: payload
    }
}

export const getPokemonByName = (name) => {
    return async (dispatch) => {
        try {
            await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            .then((poke) => {
                return dispatch({
                    type: GET_POKEMON_BY_NAME,
                    payload: poke.data
                })
            })
            
        } catch (error) {
            alert('Pokemon not found');
            window.location.href = "http://localhost:3000/home";
            console.log(error);
        }
    }
}