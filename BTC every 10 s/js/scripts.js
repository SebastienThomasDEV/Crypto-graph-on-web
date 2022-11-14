import { labels, data, config, myChart } from "./chart.js"

async function getData() {
    let response1 = await fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=EUR')
    let response2 = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR')
    let data_graph = [response1.json(),response2.json()]
    return data_graph
}

async function addData(chart) {
    const new_data = await getData()
    for (let i = 0; i< new_data.length; i++) {
        let fresh = await new_data[i]
        data.datasets[i].data.push(fresh["EUR"])
    }
    let date = new Date;
    data.labels.push(`${date.getHours()}h${date.getMinutes()}`)
    chart.update();
    return 
}

function alea(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  
function addchart(choice) {
    let color = [alea(0, 255),alea(0, 255),alea(0, 255)]
    let template_chart = {
        label: `${choice}/EUR`,
        backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`,
        borderColor: `rgb(${color[0]},${color[1]},${color[2]})`,
        data: [],
    }
    return template_chart
}



const start_btn = document.querySelector(".start");
const close_btn = document.querySelector(".close");
$(".close").hide();
$(".graph_wpr").hide();
$(".add_crypto").hide();




start_btn.addEventListener('click', () => {
    $(".close").show();
    $(".start").hide()
    $(".description").hide();
    // $(".graph_wpr").show();
    $(".add_crypto").show();
})

close_btn.addEventListener('click', () => {
    // $(".graph_wpr").hide();
    $(".start").show()
    $(".close").hide();
    $(".add_crypto").hide();
    $(".description").show();
    

})

let crypto = [];
let choice = '';
let url = `https://min-api.cryptocompare.com/data/price?fsym=${choice}&tsyms=EUR;`;




setInterval(() => {
    addData(myChart);}, 10000);

    




