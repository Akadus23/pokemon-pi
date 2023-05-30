const axios = require('axios');
const { Pokemon, Type } = require('../db');

const getApiData = async () => {
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon/';
        let pokemones = [];
        do {
            let info = await axios.get(url);
            let pokemonesApi = info.data;
            let auxPokemones = pokemonesApi.results.map(e => {
                return {
                    name: e.name,
                    url: e.url,
                }
            })
            pokemones.push(...auxPokemones);
            url = pokemonesApi.next;
        } while (url != null && pokemones.length < 40); //ACA PUEDO LIMITARLOS A LOS QUE QUIERA TRAER
        // console.log(pokemones);
        let pokesWithData = await Promise.all(pokemones.map(async e => {
            let pokemon = await axios.get(e.url);
            return {
                id: pokemon.data.id,
                name: pokemon.data.name,
                img: pokemon.data.sprites.versions['generation-iii'].emerald.front_default,
                types: pokemon.data.types.map(e => {
                    return ({
                        name: e.type.name,
                        img: `https://typedex.app/images/ui/types/dark/${e.type.name}.svg`,
                    })
                }),
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
            }
        }));
        // console.log(pokesWithData);
        return pokesWithData;
    } catch (e) {
        console.log(e);
    };
};

const getDbData = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
};

const getAllPokemons = async () => {
    let pokemonApi = await getApiData();
    let dbData = await getDbData();
    let pokemonDb = dbData.map((e) => e.dataValues)
    let allPokemons = pokemonDb ? pokemonApi.concat(pokemonDb) : pokemonApi;
    return allPokemons
};

const getApiTypes = async () => {
    try {
        let apiType = await axios.get('https://pokeapi.co/api/v2/type');
        let apiTypeInfo = apiType.data;
        let types = apiTypeInfo.results.map(e => e.name);
        types.forEach(type => {
            Type.findOrCreate({
                where: {
                    name: type,
                }
            });
        });
        const allTypes = await Type.findAll();
        return res.status(200).send(allTypes);
    } catch (e) {
        console.log(e);
    };
}



module.exports = {
    getAllPokemons,
    getApiTypes,
}