const { Router } = require('express');
const {Type} = require('../db');
const router = Router();
const {getApiTypes} = require("../controllers/pokemons_c")
const axios = require('axios')

router.get('/', async (req, res, next) => {
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
})

module.exports = router;