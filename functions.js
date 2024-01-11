let dataService = {
    basketDishes: [],

    get allbasketDishes() {
        return this.basketDishes;
    },

    add(dish) {
        this.allbasketDishes.push(dish);
        deleteAllDishesToBasket();
        addDishesToBasket();
        this.save();
        refreshDataBasket();
        addEventBtnDeleteDish();
    },

    save() {
        localStorage.setItem("basketDishes", JSON.stringify(this.basketDishes));
    },
    
    delete() {
        localStorage.setItem("basketDishes", JSON.stringify([]));
        this.basketDishes = [];
    },

    deleteByData(title, amount, totalPrice)
    {
        for (let i = 0; i < this.basketDishes.length; i++) 
        {
            const element = this.basketDishes[i];
            if(title == element.elTitle &&
                amount == element.elAmount &&
                totalPrice == element.elTotalPrice)
            {
                this.basketDishes.splice(i, 1);
                this.save();
                refreshDataBasket();
                return;
            }
        }
    },

    open() {
        this.basketDishes = JSON.parse(localStorage.getItem("basketDishes")) || [];
    }
}

function GetJsonInfo(u_url) 
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

function PostOrder(object)
{
    let url = "http://localhost:3000/order";
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
}

//функция для изменения данных о товарах в корзине
function refreshDataBasket()
{
    dataService.open();
    
    const priceElements = document.querySelectorAll("#basketTotalCost");
    const amtElements = document.querySelectorAll("#basketTotalAmount");

    let newPrice = 0;
    let newAmount = 0;
    
    for (let i = 0; i < dataService.allbasketDishes.length; i++) {
        newPrice += parseFloat(dataService.allbasketDishes[i].elTotalPrice);
        newAmount += parseFloat(dataService.allbasketDishes[i].elAmount);
    }
    priceElements.forEach(element => {
        element.innerHTML = newPrice;
    });

    amtElements.forEach(element => {
        element.innerHTML = newAmount;
    });
}

function updatePrice(formDiv, amount)
{
    const priceDiv = formDiv.querySelector("#totalСost");
    const basePrice = formDiv.querySelector("#baseCost").innerHTML;
    const newPrice = basePrice * amount;
    priceDiv.innerHTML = newPrice; 
}

function deleteAllDishesToBasket()
{
    const basket = document.querySelector("#basket");
    basket.querySelector("#basketDishesList").innerHTML = "";
}

function addDishesToBasket()
{
    const arrOfDishes = dataService.allbasketDishes;
    
    let templateDish = document.querySelector("#templateBasketDish").innerHTML;
    let output = document.querySelector("#basketDishesList");

    arrOfDishes.forEach(element => {
        let html = Mustache.render(templateDish, element);
        output.insertAdjacentHTML("beforeend", html);
    });
}

function addEventBtnDeleteDish()
{
    const btnDelDishFromBasket = document.querySelectorAll("#btnDeleteDish");
    btnDelDishFromBasket.forEach(element => {
        element.addEventListener("click", function ()
        {
            const form = element.parentElement.parentElement;

            const title = form.querySelector("#basketDishTitle").innerHTML;
            const amount = form.querySelector("#basketAmount").innerHTML;
            const totalPrice = form.querySelector("#basketTotalPrice").innerHTML;
            
            form.remove();
            dataService.deleteByData(title, amount, totalPrice);
        });
    });
}

function sendOrderToJSON(object)
{
    /*
    Код для отправки на сервер json объекта с блюдами
    В консоль: npx json-server --watch db.json
    */
    let url = "http://localhost:3000/order";
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
}