const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { offset = 0 } = req.query;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
        const pokemons = await Promise.all(response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
                name: pokemon.name,
                image: details.data.sprites.front_default,
                abilities: details.data.abilities.map(ability => ability.ability.name),
                types: details.data.types.map(type => type.type.name)
            };
        }));
        res.json(pokemons);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        res.status(500).json({ message: 'Error fetching Pokémon data' });
    }
});

module.exports = router;
