const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

let pokemons = []
let pokemons2 = []
let quantidadeDePokemonsAtual = 0
let voltarclicar = false

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                
                <button class="btn" title="Clique e Saiba mais do: ${pokemon.name}" id="${pokemon.name}">  
                <img src="${pokemon.photo}"
                alt="${pokemon.name}"></button>
              
            </div>
        </li>
    `
}

function detalhesDoPokemon(pokemon, detail_pokemon) {
    return `<div class= "pokemonid">
    <li id="poke" class="pokemons ${pokemon.type}">
    <span   class="number"> ${pokemon.number}</span>
    <span class="name"> ${pokemon.name}</span> 
    
    
    <div class="detail">
    <ol class="types">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    </ol>

    <img src="${pokemon.photo}"
         alt="${pokemon.name}">
</div>
<br>
<ul class="types">
        <li>Habilidades: ${detail_pokemon.abilities}</li>
        <li>Experiência: ${detail_pokemon.experience}</li>
        <li>Altura: ${detail_pokemon.height}</li>
        <li>Largura: ${detail_pokemon.weigth}</li>
    </ul>
</li>
</div>
<br>
`
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        quantidadeDePokemonsAtual += limit
        return pokemons
        
    }).then(pokemons => {
        pokemons.forEach(element => {
            pokemons2.push(element)
        })

        pokemons = pokemons2    
        return pokemons
    }).then(pokemons => {
        apresentarDetalhesDosPokemons(pokemons)
    })
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
}) 
function loadPokemon(offset, limit, pokemons) {
    pokeApi2.getPokemons2(offset + 1).then((details_pokemon) => {

        loadMoreButton.style.display = 'none'
        return details_pokemon
    }).then(details_pokemon => {
        pokemonList.innerHTML = detalhesDoPokemon(pokemons[offset], details_pokemon)
    }).then(() => {
        pokemonList.innerHTML += `<button type="button" id="btn">Voltar</button>` 
    }).then(() => {
        let botao = document.getElementById('btn')
        botao.addEventListener('click', () => {
            pokemonList.innerHTML = ''
            offset = 0
            
            quantidadeDePokemonsAtual = 0
            pokemons = []
            pokemons2 = []
            voltarclicar = true

            loadPokemonItens(offset, limit)

            loadMoreButton.style.display = 'inicial'

            
        })
    })
    
}  
function apresentarDetalhesDosPokemons(pokemons) {
    console.log('apresentarDetalheDosPokemons: ' + pokemons.length)
    for (let i = 0; i < pokemons.length; i++) {
        // adicionando o evento de clique de mouse a cada pokemon

        document.getElementById(pokemons[i].name).addEventListener('click', () => {
           // carredando a tela secundaria onde apresenta os detalhes do pokemon 
            loadPokemon(i, 12, pokemons) // parametros (i=elemento clicado, 12=limite de paginacao, pokemons=lista)
        })
        
    }
    
}                                                             

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('clic',() => {
    
    if (voltarclicar === true) {
        offset = 0
        voltarclicar = false
    }
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        console.log('LoadMoreButton: newLimit: ' + newLimit)
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        console.log('LoadMoreButton: offset' + offset + '- limit: ' + limit)
        loadPokemonItens(offset, limit)
    }
})