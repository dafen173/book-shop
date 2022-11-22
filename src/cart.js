
const render = document.getElementById('container')

const docFrag = document.createDocumentFragment()


//==================================navbar section==================================================
const nav = document.createElement('div')
nav.className = 'navbar'

let navAnchor = document.createElement('a')
navAnchor.href = '../index.html'
nav.appendChild(navAnchor)

let title = document.createElement('h2')
title.className = 'title'
title.textContent = 'Books shop'
navAnchor.appendChild(title)

let cartAnchor = document.createElement('a')
cartAnchor.href = '../cart/cart.html'
nav.appendChild(cartAnchor)

let cart = document.createElement('div')
cart.className = 'cart'

let cartAmount = document.createElement('div')
cartAmount.className = 'cartAmount'
cartAmount.id = 'cartAmount'
cartAmount.textContent = '0'
cart.appendChild(cartAmount)

let iconCart = new Image()
iconCart.src = '../assets/images/shopping-cart.svg'
iconCart.alt = 'cart icon'
iconCart.className = 'icon-cart'
cart.prepend(iconCart)

cartAnchor.appendChild(cart)

//=====================================================================

let basket = JSON.parse(localStorage.getItem('data')) || []

let calculation = () => {
    let cartIcon = document.getElementById('cartAmount')
    cartIcon.innerHTML = basket.map(x => x.item).reduce((x,y) => x + y, 0)
}
//=====================================================================

let labelContainer = document.createElement('div')
labelContainer.className = 'text-center'
labelContainer.id = 'label'

let shoppingCartContainer = document.createElement('div')
shoppingCartContainer.className = 'shopping-cart'
shoppingCartContainer.id = 'shopping-cart'

docFrag.appendChild(nav)
docFrag.appendChild(labelContainer)
docFrag.appendChild(shoppingCartContainer)
render.appendChild(docFrag)


let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map(x => {

            let {id, item} = x
            let search = data.find( y => y.id === id) || []

            return `
            <div class='cart-item'>
                <img class='img-cart-product' width='100px' src='.${search.imageLink}' alt='' />
                <div class="details">
                    <div class="title-price-x">
                        <h4 class='title-price'>
                            <p>${search.title}</p>
                            <p class='cart-item-price'>$ ${search.price}</p>
                        </h4>
                        <img onclick='removeItem(${id})' class='x-sign' width="10px" src="../assets/icons/x-symbol.svg" alt="x sign">
                    </div>

                    <div class="buttons">
                        <img onclick="decrement(${id})" class="minus" src="../assets/icons/minus-line.svg" alt="minus-sign">
                        <div id=${id} class="qty">${item}</div>
                        <img onclick="increment(${id})" class="plus" src="../assets/icons/plus.svg" alt="plus-sign">
                    </div>

                    <h3>$ ${item * search.price}</h3>
                </div>
            </div>
            `
        }).join(''))
    } else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href='../index.html'>
            <button class='home-btn'>Back to home</button>
        </a>
        `
    }
}
generateCartItems()

let test = (x) => console.log(x.id)

let increment = (id) => {
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    } else {
        search.item += 1
    }

    generateCartItems();  //!!!!!!
    update(selectedItem.id)
    localStorage.setItem('data', JSON.stringify(basket))
}
let decrement = (id) => {
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)
    if (search === undefined) return
    else if (search.item === 0) return
    else {
        search.item -= 1
    }
    update(selectedItem.id)
    basket = basket.filter(x => x.item !== 0)
    generateCartItems()
    localStorage.setItem('data', JSON.stringify(basket))
}
let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation()
    totalAmount()
}

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket));
  }

let clearCart = () => {
    basket = []
    generateCartItems()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket))
}

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map(x => {
            let {id, item} = x
            let search = data.find(y => y.id === id) || []
            return item * search.price
        }).reduce((x, y) => x + y)
        // console.log(amount)
        label.innerHTML = `
            <h2>Total Bill: $ ${amount}</h2>
            <a class="order-link" href="../order/order.html">
                <button class="checkout">Confirm order</button>
            </a>

            <button onclick='clearCart()' class="removeAll">Clear Cart</button>
        `
    } else return
}


  totalAmount()

//=====================================================================
// docFrag.appendChild(nav)
// docFrag.appendChild(labelContainer)
// render.appendChild(docFrag)
calculation()






