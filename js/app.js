const cards = document.querySelector('.cards')

window.addEventListener("DOMContentLoaded", () => {
    FetchData()
})


async function FetchData() {
    //limit 1148
    const limit = Math.round(Math.random() * 869)
    const get = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=6&offset=${limit}`)
    const data = await get.json()
    const { results } = data
    const urls = results.map(x => x.url)

    IndividualCall(urls)
}

async function IndividualCall(urls) {
    const requests = urls.map(url => fetch(url))
    const promises = await Promise.all(requests)
    const promise = promises.map(each => each.json())
    const result = await Promise.all(promise)

    addData(result)
}

function addData(arrResults) {
    arrResults.forEach(pokemon => {
        const { name, sprites } = pokemon;
        const { front_default, back_default } = sprites

        let card = document.createElement('DIV')
        card.classList.add('card')
        card.innerHTML = `
            <div class="card-info">
              <p class="title">${name}</p>
              <img src="${front_default}" alt"pokemon_${name}">
            </div>
            <div class="card-bio">
              <p class="title">${name}</p>
              <img src="${back_default}" alt"pokemon_${name}">
            </div>
    `
        cards.append(card)
    })
}