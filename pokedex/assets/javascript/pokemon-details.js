const pokemonDetailslist = document.getElementById('pokemonDetailsList');
const loadDetails = document.getElementById('loadMoreDetails');
const back = document.getElementById('back');
const maxRecord = 200;
let limit = 3;
let offset = 0;


function loadPokemonDetail(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
                
        <div class="pokemon-details">
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
            
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
            
                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
                </li>
            </div>


            <div class="characteristicsPokemon">
                <div class="description">
                    <ul class="descriptionList">
                        
                        <li>Ability:  </li>
                        <li>Experience:  </li>
                        <li>Height:  </li>
                        <li>Weight:  </li>
                        
                    </ul>
                </div>
                <div class="description">
                    <ul class="descriptionList">
                        
                        <li>${pokemon.ability}</li>
                        <li>${pokemon.height}</li>
                        <li>${pokemon.weight}</li>
                        <li>${pokemon.experience}</li>
                
                    </ul>
                </div>
            </div>

            `).join('')
            pokemonDetailsList.innerHTML += newHtml
     })    
}



loadPokemonDetail(offset, limit)



loadDetails.addEventListener('click', () => {

    offset += limit;
    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecord) {
        const newLimit = maxRecord - offset;
        loadPokemonDetail(offset, limit)
        buttonLoadMore.parentElement.removeChild(loadDetails)

    } else {
        loadPokemonDetail(offset, limit)
    }

})

back.addEventListener('click', () => {
    window.location = 'index.html'
})