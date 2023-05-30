const { Router } = require('express')
const router = Router();
const axios = require('axios');
const {
    getAllPokemons,
    getApiTypes,
} = require('../controllers/pokemons_c');
const {Pokemon, Type} = require('../db');

router.get('/pokemons', async(req, res) => {
    try {
        const apiData = await getAllPokemons()
        const allPokemons = [];
        apiData.map((e) => {
            allPokemons.push(e)
        })
        res.send(allPokemons)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get("/", async(req, res) => {
    const {name} = req.query;
    const allPokesName = await getAllPokemons();
    
    try {
        if (name) {
            let poke = allPokesName.filter(e => e.name === name);
            poke.length ? res.status(200).send(poke) : res.status(404).send('Pokemon not found'); 
        } else {
            let pokemons = await getAllPokemons();
            return res.status(200).send(pokemons);
        }
    } catch (e) {
        console.log(e);
    }

});

router.get("/:id", async(req, res, next) => {
    const { id } = req.params;
    const allPokesId = await getAllPokemons(); 
    try {
        if(id) {
            let pokemonById = allPokesId.filter(e => e.id == id);
            pokemonById.length ? res.status(200).send(pokemonById) : res.status(404).send('Pokemon not found')
        } else {
            res.status(404).send("Id is missing")
        }
    } catch (e) {
        console.log(e);
    }
});

router.post('/', async(req, res, next) =>{
    const {name, hp, attack, defense, speed, height, weight, img, types} = req.body;
    try {
        if(name) {
            const allPoke = await getAllPokemons();
            const isPoke = allPoke.find(e => e.name === name.toLowerCase());
            if (!isPoke) {
                const pokemon = await Pokemon.create({
                        name,
                        hp,
                        attack,
                        defense,
                        speed,
                        height,
                        weight,
                        img 
                });
            
                const typeDb = await Type.findAll({
                    where: {
                        name: types,
                    }
                });
                pokemon.addType(typeDb);
                return res.status(201).send(pokemon);
            }
            return alert('Pokemon name already exist')
        } 
        if(!name) return alert('Pokemon name is obligatory');
    } catch (e) {
        res.status(400).send(e);
    }
})

module.exports = router;