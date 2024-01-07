//Materialize работа с каруселью, модальными окнами и меню-бургером
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

//Вывод пицц
const JSONPathPizza = "./Pages/JSON/pizzas.json";
let Pizzas = GetJsonInfo(JSONPathPizza);
let templatePizza = document.querySelector("#templateCardPizza").innerHTML;
let outputPizza = document.getElementById("PizzasSection");
Pizzas.forEach(element => {
    let html = Mustache.render(templatePizza, element);
    outputPizza.insertAdjacentHTML("beforeend", html);
});

//Вывод паст
const JSONPathPasta = "./Pages/JSON/pasta.json";
let Pasta = GetJsonInfo(JSONPathPasta);
let templatePasta = document.querySelector("#templateCardPasta").innerHTML;
let outputPasta = document.getElementById("PastasSection");
Pasta.forEach(element => {
    let htmlPasta = Mustache.render(templatePasta, element);
    outputPasta.insertAdjacentHTML("beforeend", htmlPasta);
});

//Алгоритм добавления пицц в local storage
const addToBasketBtn = document.querySelectorAll("#addToBasket");
addToBasketBtn.forEach(element => {
    element.addEventListener("click", function()
    {
        //поиск формы блюда
        const form = element.parentElement.parentElement.firstElementChild;
        console.log(form);
        const inputs = form.querySelectorAll("input")
        
        //параметры для объекта
        const title = form.querySelector("#dishTitle").innerHTML;
        const userComment = form.querySelector("#userComment").value;
        const amount = form.querySelector("#inputAmount").value;
        const totalСost = form.querySelector("#totalСost").innerHTML;
        const inputRadios = new Array();
        inputs.forEach(element => {
            if(element.checked)
                inputRadios.push(element.value);
        });

        //создание объекта
        let dish = {
            "elTitle": title,
            "elInputRadios": inputRadios,
            "elUserComment": userComment,
            "elAmount": amount,
            "elTotalPrice": totalСost
        }
        
        //добавление объекта в local storage
        dataService.add(dish);
    });
});