const initURL = 'https://pokeapi.co/api/v2/';

function getGenerations() {
    return fetch(initURL + 'generation')
};

function getPokes(i) {
    return fetch(i.url);
}

async function getDataPokes() {
    const getResponse = await getGenerations();
    const geracoes = await getResponse.json();
    let pokeList = [];
    for (i of geracoes.results) {
        let getList = await getPokes(i);
        let addList = await getList.json();
        pokeList.push(addList);
    }
    for (index in pokeList) {
        $('.pokelist aside')[0].innerHTML +=
            `
            <details>
                <summary>${pokeList[index].main_region.name}</summary>
                <ul id="${pokeList[index].main_region.name}">
                    `
        for (i of pokeList[index].pokemon_species) {
            $("#" + pokeList[index].main_region.name)[0].innerHTML += `
                        <input type="button" class="pokemons" value="${i.name}">
                        `
        }
        `
                </ul>
            </details>
            `
    }
    $('.pokemons').click(function () {
        const selected = $(this).val();
        fetch(initURL + 'pokemon/' + selected)
            .then(response => response.json())
            .then(pokemon => {
                $('#nome').text(pokemon.name);
                $('#pic').attr('src', pokemon.sprites['front_default']);
                $('#position').html(pokemon.id);


            })
            .catch(error => {
                console.log('Erro: ' + error);
            });

    });
}

getDataPokes();
