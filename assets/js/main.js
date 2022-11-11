
// const offset = 0
// const limit = 10
// const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
//fetch requisição get
// fetch(url)
//     .then(function (response) {
//         //vai retornar uma promisse o then fala "quando ela chegar faça isso"
//         console.log(response);
//         response.json()
//             .then(function(responseBody) {
//                 //vai retornar convertido, sem ser json
//                 console.log(responseBody);
//             })
//     })
//     .catch(function (error) {
//         console.log(error);
//     })
//     .finally(function () {
//         console.log('requisição concluída');
//     })

//acima versão de estudo

//abaixo versão correta de como deve ser

function convertPokemonToHtml(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detailed">
            <ol>
                ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
            </ol>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.number}.png"
                class="pokeImg" alt="${pokemon.name}"/>
        </div>
    </li>
    `
}

const pokemonOl = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 6
let offset = 0

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {

        //tudo abaixo em uma linha
        const newHtml = pokemonList.map(convertPokemonToHtml).join('')
        pokemonOl.innerHTML += newHtml
        //forma passo a passo

        // //vai receber cada item da pokemonList transformar em html e depois adicionar tudo na lista
        // const newList = pokemonList.map(convertPokemonToHtml)

        // //vai pegar todas as listas e transformar em um html
        // const newHtml = newList.join('')

        // //vai pegar o html gerado e adicionar no documento html
        // pokemonOl.innerHTML += newHtml
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += 6
    loadPokemonItems(offset, limit)
})