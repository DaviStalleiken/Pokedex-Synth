
const pokeApi = {}

//Conversão de detalhes da API para o modelo da aplicação
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const abilities = pokeDetail.abilities.map((abilitySlot)=>abilitySlot.ability.name)
    const [ability] = abilities
    pokemon.ability = ability
    pokemon.experience = pokeDetail.base_experience
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    return pokemon
}

//Requisição para pegar as informações na API
pokeApi.getDetails = async (pokemon) => {
    const response = await fetch(pokemon.url);
    const pokeDetail = await response.json();
    return convertPokeApiDetailToPokemon(pokeDetail);
}



pokeApi.getPokemons = async (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    const response = await fetch(url);
    const jsonBody = await response.json();
    const pokemons = jsonBody.results;
    const detailRequests = pokemons.map(pokeApi.getDetails);
    const pokemonDetails = await Promise.all(detailRequests);
    return pokemonDetails;
}