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

