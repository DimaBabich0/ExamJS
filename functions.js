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

/*
    Код для отправки на сервер json объекта с блюдами
    В консоль: npx json-server --watch db.json

    let url = "http://localhost:3000/order";
    let tast = !object;
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
*/