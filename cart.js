let label = document.getElementById('cart-add')
let ShoppingCart = document.getElementById ('cartmain')


let basket = JSON.parse(localStorage.getItem("data")) || [];

// CALCULATION TO GET TOTAL VALUE OF EVERYTHING IN CART

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
};

calculation();


// FOR DISPLAY OF CART

let generateCartItems = () => {
    if(basket.length !== 0) {  
        
        return    ( ShoppingCart.innerHTML = basket.map((x) => {
           
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
          return `
        <div id="cartall">  
            <div class="cart1"><a href="#"><i onclick="removeItem(${id})" class='bx bxs-x-circle'></i></a></div>
            <div class="cart2"><img src="${search.img}" alt=""></div>
            <div class="cart3"><h4>$ ${search.price * item}</h4></div>
            <div class="cart4"><i onclick="decrement(${id})" class='bx bxs-minus-square'></i></div>
            <div id=${id} class="cart5">${item}</div>
            <div class="cart6"><i onclick="increment(${id})" class='bx bxs-plus-square'></i></div>            
        </div>
       
          `; 
          
          
        }).join(''));
    }else {
        ShoppingCart.innerHTML = ``
       
        label.innerHTML = `
       <div class="emptygroup"> <h1 class="emptycart"> YOUR CART IS EMPTY </h1>
        <a href="index.html">
            <button class="emptybtn">Start Shopping</button>
        </a>
        </div>;`
       
    }
};

generateCartItems();

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
    generateCartItems();
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
 generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

//UPDATE VALUE COUNT ON INDIVIDUAL PRODUCT

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};


//TO TOTALLY REMOVE ITEM FROM CART
 let removeItem = (id) => {
    let selectedItem = id
    basket = basket.filter((x) => x.id !== selectedItem);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
    
 }


 let TotalAmount = () => {
    if (basket.length !== 0){
        let amount = basket.map((x) =>{
            let { item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x,y) => x+y, 0)

        label.innerHTML = `  <div id="coupon">
        <h3>Apply Coupon</h3>
        <div>
            <input type="text" placeholder="Enter Your Coupon">
            <button class="normal">Apply</button>
        </div>
    </div>
    <div id="subtotal">
                 <h3>Cart Total</h3>
                 <table>
                     <tr>
                         <td>Cart Subtotal</td>
                         <td>$ ${amount}</td>
                     </tr>
                     <tr>
                         <td>Shipping</td>
                         <td>Free</td>
                     </tr>
                     <tr>
                         <td><strong>Total</strong></td>
                         <td><strong>$ ${amount}</strong></td>
                     </tr>
                 </table>
                 <button class="normal">Proceed To Checkout</button> 
     
             </div>`
    } else return;
 }

 TotalAmount();


 //TO CLEAR THE WHOLE CART

 let clearCart = () => {
    basket = []
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
 };