let dataService = {
    basketDishes: [],

    get allbasketDishes() {
        return this.basketDishes;
    },

    add(dish) {
        this.allbasketDishes.push(dish);
        this.save();
    },

    save() {
        localStorage.setItem("basketDishes", JSON.stringify(this.basketDishes));
    },
    
    delete() {
        localStorage.setItem("basketDishes", JSON.stringify([]));
        this.basketDishes = [];
    },

    open() {
        this.basketDishes = JSON.parse(localStorage.getItem("basketDishes")) || [];
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {
        fullWidth: true,
        indicators: true
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

function LoadData(url)
{
    fetch(url)
    .then(response => response.json())
    .then(json => 
    {
        let ARR = new Array();
        for (let i = 0; i < json.length; i++) {
            ARR.push(json[i]);
        }
        console.log(ARR);
        return ARR;
    });
}


const JSONPath = "./Pages/JSON/pizzas.json";
let Pizzas;
Pizzas = LoadData(JSONPath);
console.log(Pizzas)

let template = document.querySelector("#templateCardPizza").innerHTML;
let output = document.getElementById("PizzasSection");
// console.log(output);
Pizzas.forEach(element => {
    let html = Mustache.render(template, element);
    output.insertAdjacentHTML("beforeend", html);
});