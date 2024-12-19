const herolist = document.querySelector('.hero-list')
const herolist2 = document.querySelector('.hero-list2')
const btn = document.querySelector('.btn')
const form = document.querySelector('.hero-form')
const search = document.querySelector('.search')
const mangaqnt = 20;
let pesquisa = 'Nada'

class Manga {
    constructor(nome, capa){
        this.nome = nome
        this.capa = capa
    }


    criaManga(hero){
        const div = document.createElement('div')
        div.classList.add('hero-manga')
        div.title = (`${this.nome}`)
        const div2 = document.createElement('div')
        div2.classList.add('hero-manga-cape')
        div2.style.backgroundImage = `url('${this.capa}')`
        const p = document.createElement('p')
        p.innerText = this.nome;
        p.classList.add('hero-manga-title')

        hero.appendChild(div)
        div.appendChild(div2)
        div.appendChild(p)
    }

}





const api = async (manga) => {
    const mangaData = await fetch(`https://api.jikan.moe/v4/manga?q=${manga}`)
    if(mangaData){
        const mangaDataJS = await mangaData.json()
        return mangaDataJS
    }
}

const DataBase = async (manga) => {
    const data = await api(manga)
    const tamanho = data['data'].length
    console.log(tamanho)
    if(data){
    for(let i = 0; i < tamanho; i++){
    const nome = data['data'][i].title
    const capa = data['data'][i]['images']['jpg']['image_url']
    const capitulos = data['data'][i].chapters
    const texto = data['data'][i].synopsis

    const meumanga = new Manga(nome, capa)
    meumanga.criaManga(herolist2)

    }
}
}







const Recomendations = async () => {

const api = await fetch('https://api.jikan.moe/v4/recommendations/manga')
if(api){
const apiJSON = await api.json()


let mangainfo = []

for(let i = 0; i < mangaqnt; i++){
    for(let u = 0; u < 2; u++){
    const name = apiJSON['data'][i]['entry'][u]['title']
    const cape = apiJSON['data'][i]['entry'][u]['images']['jpg']['image_url']

    let mangainfos = {
        nome: name,
        capa: cape
    }
    
    mangainfo.push(mangainfos)
    }

}
return mangainfo
}
}





const teste = async () => {
    const recomendacoes = await Recomendations();
    for(let i = 0; i < mangaqnt; i++){
    const meumanga = new Manga(recomendacoes[i].nome,recomendacoes[i].capa)
    meumanga.criaManga(herolist)
    }
};
teste()


form.addEventListener('submit', e =>{
    e.preventDefault()
    pesquisa = search.value;
    herolist2.innerHTML = ''
    search.value = ''
    if(pesquisa !== ''){
    DataBase(pesquisa)
    }


})


