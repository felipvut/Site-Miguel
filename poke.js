const xhttp = new XMLHttpRequest
xhttp.open("GET",'https://pokeapi.co/api/v2/pokemon?&limit=100', false)
xhttp.send()
const requisicao = JSON.parse(xhttp.responseText).results
let passagem = requisicao
// console.log(requisicao)

function section(classe){
    let section2 = document.createElement('section')
    section2.classList.add(classe)
    
    return section2
}

function div() {
    let div = document.createElement('div')
    div.classList.add('pokemon')
    return div
}

function h2(){
    let h2 = document.createElement('h2')
    h2.classList.add('pokemon__name')

    return h2
}

function ul() {
    let ul = document.createElement('ul')
    ul.classList.add('pokemon__tipos')
    return ul
}


function carregar(iteracao) {
    let article = document.createElement('article')
    for(pokemon of iteracao) {
        let xhttpPoke = new XMLHttpRequest
        xhttpPoke.open("GET", pokemon.url, false)    
        xhttpPoke.send()
        let requisicao2 = JSON.parse(xhttpPoke.responseText)

        let section = document.createElement('section')
        section.classList.add("pokemons")

        let div = document.createElement('div')
        div.classList.add('pokemon')

        let sectionInt = document.createElement('section')

        let h2 = document.createElement('h2')
        h2.classList.add('pokemon__name')
        h2.textContent = pokemon.name

        let ul = document.createElement('ul')
        ul.classList.add("pokemon__tipos")

        for(tipos of requisicao2.types) {
            let li = document.createElement('li')
            li.textContent = tipos.type.name
            ul.appendChild(li)
        }

        let sectionImg = document.createElement('section')
        section.classList.add("pokemon__img")

        let img = document.createElement('img')
        img.setAttribute("src", requisicao2.sprites.front_default)
        section.appendChild(div)
        div.appendChild(sectionInt)
        sectionInt.appendChild(h2)
        sectionInt.appendChild(ul)
        div.appendChild(sectionImg)
        sectionImg.appendChild(img)
        article.appendChild(section)
    }
    let get = document.querySelector('article')
    let body = document.querySelector('body')
    // console.log(get)
    if(get != null) {
        body.removeChild(get)
    }
    document.body.appendChild(article)
}

document.addEventListener('keyup', () => {
    let search = document.querySelector('.search')
    let filtro = requisicao.filter((res) => {
        return !(res.name.indexOf(search.value.toLowerCase()))
    })
    // console.log(search.value)
    passagem = filtro
    carregar(passagem)
})
carregar(passagem)