

//FOR CART FUNCTIONALITY


let shop = document.getElementById("shop");


//FOR PRODUCTS IN CART TO BE ADDED

let basket = JSON.parse(localStorage.getItem("data")) || [];


let generateShop = () => {
    return (shop.innerHTML  = shopItemsData.map((x) => {
        let { id, name, price, description, img } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div id=product-id-${id} class="pro">
                    <img src="${img}" alt="">
                    <div class="des">
                        <span>${name}</span>
                        <h5>${description}</h5>
                        <div class="star">
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                        </div>
                        <h4>$ ${price}</h4>
                    </div>
                    <div class="cartcount">
                        <i onclick="decrement(${id})" class='bx bxs-minus-square'></i>
                        <div id=${id} >${search.item === undefined? 0: search.item}</div>
                        <i onclick="increment(${id})" class='bx bxs-plus-square'></i>
                    </div>
                </div>
        `;
    }).join(""));
};


generateShop();


//INCREAMENT COUNT

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem);

    if (search === undefined) {
        basket.push({
            id: selectedItem,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    update(selectedItem);
 localStorage.setItem("data", JSON.stringify(basket));
    
};



//DECREMENT COUNT

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

 update(selectedItem);
 basket = basket.filter((x) => x.item !== 0);
    
    localStorage.setItem("data", JSON.stringify(basket));
};


//UPDATE VALUE COUNT ON INDIVIDUAL PRODUCT

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};



// CALCULATION TO GET TOTAL VALUE OF EVERYTHING IN CART

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
};

calculation();