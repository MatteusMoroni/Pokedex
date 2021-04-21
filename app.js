const fetchPokemonApi = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}` 


    const pokemonPromises = []

    //esse for chama a função getURL e a cada looping gera um id de 1 a 150, corresponde ao pokemon e adiciona
    //ao array acima 

    for (let i = 1; i<= 150; i++){

        pokemonPromises.push(
            fetch (getPokemonUrl(i))
            .then(response => response.json()) // esse then retorna uma promisse da api convertida em json
        )
    }

    Promise.all(pokemonPromises)
     //ssa expressão retorna outras promises essa expressão permite que todas as expressões dentro de pokemonPromises sejam resolvidas em paraleo
        .then(pokemons => {
            const lisPokemons = pokemons.reduce((acc, pokemon) => {

                const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                acc += `
                    <li class="card" ${types[0]}>
                        <img class = " card-image " alt="${pokemon.name}" src = "https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
                        <h2 class = "card-title">${pokemon.id}. ${pokemon.name}</h2>
                        <p class = "card-subtitle">${types.join(' | ')}</p>
                    </li>
                `
                return acc
            }, '')

           const ul = document.querySelector('[data-js="pokedex"]') 
           ul.innerHTML = lisPokemons
        }) // esse then recebe um array com todos os objetos retornados da promise através do reduce obtem e exibe o nome dos pokemons

}

fetchPokemonApi ()