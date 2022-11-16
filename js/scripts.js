import {crypto_list} from './crypto_list.js';

async function getData(choice) {
    // let url = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${choice}&tsyms=EUR;`);
    let response1 = await fetch('https://min-api.cryptocompare.com/data/price?fsym=KCS&tsyms=EUR')
    let data_graph = [response1.json()]
    return data_graph
}

async function addData(chart) {
    let new_data = await getData()
    for (let i = 0; i< new_data.length; i++) {
        let fresh = await new_data[i]
        chart.data.datasets[i].data.push(fresh["EUR"])
    }
    let date = new Date;
    chart.data.labels.push(`${date.getHours()}h${date.getMinutes()}`)
    chart.update();
}

function alea(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function build_graph(nb_graph) {
    const graph = document.createElement("canvas"); //créer un element HTML => canvas
    graph.setAttribute('id',`Chart${nb_graph}`); //donne un id à l'element HTML => id incrémentable
    graph.classList.add("graph")
    const choice = "KCS"
    const config = config_graph(choice)
    const builded = new Chart(graph,config);
    $('.add_crypto').append(graph);
    setInterval(() => {
        addData(builded);}, 10000);
}
  
function config_graph(choice) {
    // Choisi une couleur aléatoire
    let color = [alea(0, 255),alea(0, 255),alea(0, 255)]
    // Config pour les labels du graphs(heures)
    const labels = []
     // Config pour les datas du graphs(legende + data)
    const data = {
        labels: labels,
        datasets: [{
            // Donne un nom à la legende du graph par rapport au choix de l'utilisateur
            label: `${choice}/EUR`,
            // Donne une couleur aleatoire
            backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`,
            borderColor: `rgb(${color[0]},${color[1]},${color[2]})`,
            // Array qui contient les datas pour construires le graph
            data: [],
        }]
    }
    
    const config = {
        // Définit le type de graph
        type: 'line',
        // ajoute les configs
        data: data,
        // options pour personnaliser son graph (voir doc)
        options: {}
    }
    // retourne la config du graph
    return config
}


function slider_coin(list) {
    // /////////////////////////////

    let values = list
    // /////////////////////////////
    let list_wpr = document.createElement("div");
    list_wpr.classList.add("list_wpr")

    let search_cryptos = document.createElement("input")
    search_cryptos.classList.add("search")
    search_cryptos.setAttribute('placeholder',`search`);
    $(list_wpr).append(search_cryptos);

    let userList = new List('cryptos_list', values);
    const list_coin = document.createElement("ul");
    list_coin.setAttribute('id',`cryptos_wpr`);

    list.forEach(element => {
        let coin_wpr = document.createElement("li");
        let coin = document.createElement("button");
        $(coin_wpr).append(coin); 
        coin.setAttribute('id',`coins`);
        let text = document.createTextNode(`${element.currency}-${element.abbreviation}`);
        coin.appendChild(text);
        $(list_coin).append(coin_wpr);
        $(list_wpr).append(coin_wpr);
    });
    console.log(list_wpr)
    swal({
        title: "Choisi un crypto",
        content: list_wpr,
      });
}





const start_btn = document.querySelector(".start");
const close_btn = document.querySelector(".close");
const add_btn = document.querySelector(".add_btn");
let nb_graph = 0

add_btn.addEventListener('click', () => {
    slider_coin(crypto_list)
    build_graph(nb_graph)
    nb_graph++
})

$(".close").hide();
$(".graph_wpr").hide();
$(".add_crypto").hide();
$(".page_title").hide();



start_btn.addEventListener('click', () => {
    $(".close").show();
    $(".start").hide()
    $(".page_title").show();
    $(".description").hide();
    $(".add_crypto").show();
})

close_btn.addEventListener('click', () => {
    $(".start").show()
    $(".close").hide();
    $(".add_crypto").hide();
    $(".description").show();
    $(".page_title").hide();
})






