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


function slider_coin(crypto) {

    let wrapper = document.createElement("div")
    wrapper.classList.add("wrapper")

    let search_input = document.createElement("input")
    search_input.classList.add("search")
    search_input.setAttribute('placeholder',`search`);


    let li_list = document.createElement("ul");
    li_list.classList.add("list")

    crypto.forEach(element => {
        let li = document.createElement("li")
        li.setAttribute('id',`crypto`);
        // btn.classList.add("crypto")
        li.innerHTML += `${element.currency} - ${element.abbreviation}`
        $(li_list).append(li);
    });

    $(wrapper).append(li_list);
    $(wrapper).append(search_input);
    


    swal({
        title: "Choisi un crypto",
        content: wrapper,
      });

    let all = document.querySelectorAll("#crypto")
    search_input.addEventListener('input', ()  => {
        let checkcase = search_input.value.toUpperCase();
        console.log(checkcase)

        for (let i = 0; i < all.length; i++) {
            let txt_coin = all[i].innerText;
            if (txt_coin.toUpperCase().indexOf(checkcase) > -1) {
                all[i].style.display = "";
            } else {
                all[i].style.display = "none";
            }
        }
    });
    let test = ListenToList(all)
    console.log(test)
    
}

// function ListenToList(nodelist) {
//     for (let i = 0; i < nodelist.length; i++) {
//         nodelist[i].addEventListener('click', ()=> {
//             choice = nodelist[i]
//             console.log(choice)
//             $(".list").hide();
//             $(".search").hide();
//             choice = Chosen(choice.innerHTML)
//             // $(wrapper).append(choice);
            
//         });
//     }
// }

// function Chosen(user_choice) {
//     let choose = document.createElement("div")
//     choose.classList.add("choose")
//     choose.innerHTML += user_choice
// }








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




// let values = crypto;
//     let options = {
//         valueNames: [ 'currency', 'abbreviation' ],
//         item: '<li><p class="currency"></p><p class="abbreviation"></p></li>'
//     };

//     // créer un element qui engloble la liste
//     let list_wpr = document.createElement("div");
//     list_wpr.classList.add("list_wpr")

    // créer un element seach qui est un input


    // créer la liste
    // let li_list = document.createElement("ul");
    // li_list.classList.add("list")
    // $(list_wpr).append(li_list);

//     let CList = new List('list_wpr', options, values);

//     crypto.forEach(element => {
//         for (let i = 0; i < element.length; i++) {
//             console.log(element)
//             CList.add({
//                 currency: element[i]
//               });
//         }
//     });


