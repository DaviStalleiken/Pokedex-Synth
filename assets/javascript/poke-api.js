const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types =  pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types

    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    
    pokemon.hp = pokeDetail.stats[0].base_stat
    pokemon.attack =  pokeDetail.stats[1].base_stat
    pokemon.defense =  pokeDetail.stats[2].base_stat
    pokemon.specialAttack =  pokeDetail.stats[3].base_stat
    pokemon.specialDefense =  pokeDetail.stats[4].base_stat
    pokemon.speed =  pokeDetail.stats[5].base_stat
    pokemon.total = pokemon.hp + pokemon.attack +  pokemon.defense + pokemon.specialAttack +  pokemon.specialDefense + pokemon.speed
    return pokemon;
}
pokeApi.getPokemonDetail = async (pokemon) => {
    const response = await fetch(pokemon.url);
    const pokeDetail = await response.json();
    return convertPokeApiDetailToPokemon(pokeDetail);
}

pokeApi.getPokemons = async ( offset = 0, limit = 5) => {

   const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    try {
        const response = await fetch(url);
        const jsonBody = await response.json();
        const pokemons = jsonBody.results;
        const detailRequests = pokemons.map(pokeApi.getPokemonDetail);
        const pokemonDetails = await Promise.all(detailRequests);
        return pokemonDetails;
    } catch (error) {
        return console.error(error);
    }
}