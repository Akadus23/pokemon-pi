import { 
    GET_POKEMONS,
    GET_DETAIL,
    CLEAN_DETAIL,
    CLEAN_POKEMONS,
    GET_TYPES,
    CREATE_POKEMON,
    FILTER_CREATED,
    FILTER_TYPE,
    ORDER_NAME,
    ORDER_STR,
    GET_POKEMON_BY_NAME,
} from "./actions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    pokeDetail: [],
    types: [],
};

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                pokeDetail: action.payload
            }
        case CLEAN_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            }
        case CLEAN_DETAIL:
            return {
                ...state,
                pokeDetail: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case CREATE_POKEMON:
            return {
                ...state
            }
        case FILTER_CREATED:
            let copy = state.allPokemons;
            let createdFiltered;
            if (action.payload === 'db') {
                createdFiltered = copy.filter(e => e.createdInDb);
            } else if (action.payload === 'api') {
                createdFiltered = copy.filter(e => !e.createdInDb);
            } else {
                createdFiltered = copy;
            }
            console.log(createdFiltered);
            return {
                ...state,
                pokemons: createdFiltered
            };
        case FILTER_TYPE:
            let copyTwo = state.pokemons;
            const arg = (e) => e.name === action.payload;
            let typeFiltered = []
            typeFiltered = action.payload === 'all' ? copyTwo : copyTwo.filter(e => e.types ? e.types.some(arg) : typeFiltered.length[-1]);
            console.log(typeFiltered);
            if(typeFiltered.length <= 0){
                typeFiltered = copyTwo;   
                alert('There are no pokemon of the indicated type');
            }; 
            return {
                ...state,
                pokemons: typeFiltered
            };
            case ORDER_NAME:
                let sortedArr = [];
                if(action.payload === 'asc'){
                    sortedArr = state.pokemons.sort((a,b) => {
                        if(a.name > b.name) return 1
                        if(a.name < b.name) return -1
                        return 0
                    })
                } else if (action.payload === 'desc'){
                    sortedArr = state.pokemons.sort((a, b) => {
                        if(a.name > b.name) return -1
                        if(a.name < b.name) return 1
                        return 0
                    });
                } else {
                    sortedArr = state.pokemons.slice()
                } return {
                    ...state,
                    pokemons: sortedArr
                }
            case ORDER_STR:
                let copy4 = state.pokemons;
                let sortedStr = action.payload === 'asc' ?
                    copy4.sort((a, b) => a.attack - b.attack) :
                    copy4.sort((a, b) => b.attack - a.attack);
                // console.table(sortedStr);    
                return {
                    ...state,
                    pokemons: sortedStr
                };
            case GET_POKEMON_BY_NAME:
                return {
                    ...state,
                    pokemons: action.payload
                };

        default: 
            return {...state}
    }
};

export default reducer;