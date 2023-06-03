
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonPopup = document.getElementById('popup-wrapper');
const loadPrevious = document.getElementById('loadPrevious')
let id = "";
const allPokemons = []

const maxRecords = 649;
const limit = 20;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return ` <li id="${pokemon.number}" class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span> 
        <span class="name">${pokemon.name}</span>
    
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
   
    </li>`
}

function generatePokemonDetails(pokemon) { 
    console.log(pokemon)
    return `
    <div id="popup" class="popup ${pokemon.type}">
        <div class="popup-close">x</div>
        <div class="popup-content">
            <div class="header-popup">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
            </div>
            <div class="types-popup">
                <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>

            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        <div class="white-part">

            <span>Base Stats</span>
            <ol class="status">
                <li>
                    <span>HP</span>
                    <span>${pokemon.hp}</span>
                </li>
                <li>
                    <span>Attack</span>
                    <span>${pokemon.attack}</span>
                </li>
                <li>
                    <span>Defense</span>
                    <span>${pokemon.defense}</span>
                </li>
                <li>
                    <span>Special-attack</span>
                    <span>${pokemon.specialAttack}</span>
                </li>
                <li>
                    <span>Special-Defense</span>
                    <span>${pokemon.specialDefense}</span>
                </li>
                <li>
                    <span>Speed</span>
                    <span>${pokemon.speed}</span>
                </li>
                <li>
                    <span>Total</span>
                    <span>${pokemon.total}</span>
                </li>
            </ol>
           
        </div>
    </div>
    `
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

        pokemons.forEach(pokemon => {
            allPokemons.push(pokemon)
        });
    })
        .catch((error) => console.error(error));

}

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit);
    }
})

loadPokemonItems(offset, limit)

pokemonList.addEventListener('click', function (event) {
    
    if (event.target.tagName === 'LI' || event.target.parentElement.tagName === 'LI' || event.target.parentElement.parentElement.tagName === 'LI' || event.target.parentElement.parentElement.parentElement.tagName === 'LI') {

        elementHtml = event.target.tagName; 
        idHtml = event.target.id;
        if (elementHtml === 'LI') {
            if (idHtml === undefined) {
                id = event.target.parentElement.parentElement.parentElement.id; 
            } else {
                id = event.target.id;
            }
            console.log(id)
        } else if (elementHtml === "IMG") {
            id = event.target.parentElement.parentElement.id
            
        } else if (elementHtml === 'SPAN') {
            id = event.target.parentElement.id
            
        } else if (elementHtml === "DIV") {
            id = event.target.parentElement.id
            
        } else {
            console.log(erro)
        }
    }
   
    ModalGenerator(id)
});

function ModalGenerator(id) {
    const newPopup = generatePokemonDetails(PokemonSeparator(id, allPokemons))
    pokemonPopup.innerHTML = newPopup;
    pokemonPopup.style.display = 'block'
}
 function PokemonSeparator(id, pokemons) {

        return pokemons[id - 1]
    }