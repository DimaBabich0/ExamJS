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

function LoadData(u_url) 
{
    let arr = new Array();
    $.ajax({
        url: u_url,
        async: false,
        success: function(json) 
        {
            for (let i = 0; i < json.length; i++) 
            {
                arr.push(json[i]);
            }
        }
    });
    return arr;
}

//Вывод пицц
const JSONPathPizza = "./Pages/JSON/pizzas.json";
let Pizzas = LoadData(JSONPathPizza);
let templatePizza = document.querySelector("#templateCardPizza").innerHTML;
let outputPizza = document.getElementById("PizzasSection");
Pizzas.forEach(element => {
    let html = Mustache.render(templatePizza, element);
    outputPizza.insertAdjacentHTML("beforeend", html);
});

//Вывод паст
const JSONPathPasta = "./Pages/JSON/pasta.json";
let Pasta = LoadData(JSONPathPasta);
let templatePasta = document.querySelector("#templateCardPasta").innerHTML;
let outputPasta = document.getElementById("PastasSection");
Pasta.forEach(element => {
    let htmlPasta = Mustache.render(templatePasta, element);
    outputPasta.insertAdjacentHTML("beforeend", htmlPasta);
});