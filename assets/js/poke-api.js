const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types //vai pegar a primeira posição do array

    pokemon.types = types
    pokemon.type = type

    return pokemon
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json()) //quando a promise resolver vai pro proximo then
        .then((jsonBody) => jsonBody.results) //pega só os resultados, excluindo detalhes irrelevantes
        .then((pokemons) => pokemons.map((pokeApi.getPokemonDetails))) //mapeada lista com sites de requisições para cada pokemon
        .then((detailedRequests) => Promise.all(detailedRequests)) //vai fazer fetch da requisição de cada pokemon
        .then((pokemonDetails) =>pokemonDetails) //vai retornar a lista com o resultado de cada requisição particular de pokemon, com mais detalhes
        .catch((error) => console.error(error)) //se der erro vai aparecer o que foi
} 