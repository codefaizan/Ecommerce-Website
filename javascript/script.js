const cartBtn = document.querySelector('.cartBtn');
const cart = document.querySelector('.cart');

let toggle = false;
cartBtn.addEventListener('click', () => {
    if (toggle == false) {
        cart.style.right = 0;
        toggle = true;
    }
    else if (toggle == true) {
        cart.style.right = '-100%';
        toggle = false;
    }
})


// cart working
// removing from cart

document.readyState = 'loading' ? document.addEventListener('DOMContentLoaded', ready) : ready();

// applying eventListner to all "remove from cart" buttons

function ready() {
    const removeCartBtn = document.getElementsByClassName('cartRemove');
    console.log(removeCartBtn);
    // remove cart
    for (i = 0; i < removeCartBtn.length; i++) {
        let removeBtn = removeCartBtn[i];
        removeBtn.addEventListener('click', removeItem);
    }
    //change quantity
    const quantityValues = document.getElementsByClassName('cartQuantity');
    for (i = 0; i < quantityValues.length; i++) {
        let input = quantityValues[i];
        input.addEventListener('change', quantityChanged);
    }
    //add item
    const addCart = document.getElementsByClassName('addCart');

    for (i = 0; i < addCart.length; i++) {
        const addBtn = addCart[i];
        addBtn.addEventListener('click', addCartClicked);
    }
    // shop button
    const shopBtn = document.getElementsByClassName('buyBtn')[0];
    shopBtn.addEventListener('click', shopBtnClicked)

}
// shop btn clicked
function shopBtnClicked() {
    alert('Your Order Has Been Placed Successfully')
}

// removing the clicked item

function removeItem(event) {
    let removeBtnClicked = event.target;
    removeBtnClicked.parentElement.remove();
    updateTotal();
}

// quantity changed
function quantityChanged(event) {
    let newQuantity = event.target;
    if (isNaN(newQuantity.value) || newQuantity.value <= 0) {
        newQuantity.value = 1;
    }
    updateTotal();
}

function addCartClicked(event) {
    let addBtn = event.target;
    let products = addBtn.parentElement;
    let prodTitle = products.getElementsByClassName('prodTitle')[0].innerText;
    let price = products.getElementsByClassName('prodPrice')[0].innerText;
    let productImage = products.getElementsByClassName('prodImage')[0].src;
    addToCart(prodTitle, price, productImage);
    updateTotal();
}

// add product to cart
function addToCart(prodTitle, price, productImage) {
    let cartProdBox = document.createElement('div');
    cartProdBox.classList.add('cartBox');
    var cartItems = document.getElementsByClassName('cartContent')[0];
    let cartItemsTitles = cartItems.getElementsByClassName('cartProductName');
    // for(i=0; i<cartItemsTitles.length; i++) {
    //     if(cartItemsTitles[i].innerText == prodTitle){
    //     alert('This product already exists in cart');
    //     return;
    //     }
    // }
    let cartBoxContent = `
                        <img src="${productImage}" alt="" class="cartImage">
                        <div class="cartDetails">
                            <div class="cartProductName">${prodTitle}</div>
                         <div class="price">${price}</div>
                          <input type="number" value="1" class="cartQuantity">
                        </div>
                        <i class='bx bxs-x-square cartRemove'></i>`
    cartProdBox.innerHTML = cartBoxContent;
    cartItems.append(cartProdBox);
    cartProdBox
        .getElementsByClassName("cartRemove")[0]
        .addEventListener('click', removeItem);
    cartProdBox
        .getElementsByClassName("cartQuantity")[0]
        .addEventListener('change', quantityChanged);
}

// update total
function updateTotal() {
    let cartContent = document.getElementsByClassName('cartContent')[0];
    let cartBoxes = cartContent.getElementsByClassName('cartBox');
    let total = 0;

    for (i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('price')[0];
        let quantityElement = cartBox.getElementsByClassName('cartQuantity')[0];
        let price = parseFloat(priceElement.innerText.replace('Rs. ', ''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
        total = Math.round(total * 100) / 100;
    }
    document.getElementsByClassName('totalAmount')[0].innerText = 'Rs. ' + total;
}

//2. adding items to cart
// document.readyState='loading'? document.addEventListener('DOMContentLoaded', addCartEvent) : addCartEvent();
// function addCartEvent() {
//     const addCartBtn = document.getElementsByClassName('addCart');
//     console.log(addCartBtn);

//     for(i=0; i<addCartBtn.length; i++) {
//         const addBtn = addCartBtn[i];
//         addBtn.addEventListener('click', addItem);
//     }
// }

// function addItem(event) {
//    let addBtnClicked = event.target;
//    let abc = addBtnClicked.parentElement;
//    let def = abc.firstChild.src;
//    console.log(def);
// }