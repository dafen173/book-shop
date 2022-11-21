
const render = document.getElementById('container')

const docFrag = document.createDocumentFragment()


//==================================navbar section==================================================
const nav = document.createElement('div')
nav.className = 'navbar'

let navAnchor = document.createElement('a')
navAnchor.href = './index.html'
nav.appendChild(navAnchor)

let title = document.createElement('h2')
title.className = 'title'
title.textContent = 'Books shop'
navAnchor.appendChild(title)

let cartAnchor = document.createElement('a')
cartAnchor.href = './cart/cart.html'
nav.appendChild(cartAnchor)

let cart = document.createElement('div')
cart.className = 'cart'

let cartAmount = document.createElement('div')
cartAmount.className = 'cartAmount'
cartAmount.id = 'cartAmount'
cartAmount.textContent = '0'
cart.appendChild(cartAmount)

let iconCart = new Image()
iconCart.src = './assets/images/shopping-cart.svg'
iconCart.alt = 'cart icon'
iconCart.className = 'icon-cart'
cart.prepend(iconCart)

cartAnchor.appendChild(cart)





//==================================products section==================================================


let shop = document.createElement('div')
shop.className = 'shop'
shop.id = 'shop'

let basket = JSON.parse(localStorage.getItem('data')) || []


let increment = (id) => {
    let search = basket.find((x) => x.id === id)
    if (search === undefined) {
        basket.push({
            id: id,
            item: 1,
        })
    } else {
        search.item += 1
    }

    update(id)
    localStorage.setItem('data', JSON.stringify(basket))
}
let decrement = (id) => {
    let search = basket.find((x) => x.id === id)
    if (search === undefined) return
    else if (search.item === 0) return
    else {
        search.item -= 1
    }

    update(id)
    basket = basket.filter(x => x.item !== 0)
    localStorage.setItem('data', JSON.stringify(basket))
}
let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation()
}

let calculation = () => {
    let cartIcon = document.getElementById('cartAmount')
    cartIcon.innerHTML = basket.map(x => x.item).reduce((x,y) => x + y, 0)
}



let createCards = function (obj){
    let {id} = obj
    let search = basket.find( x => x.id === id) || []

    let item = document.createElement('div')
    item.className = 'item'
    item.id = `product-id-${obj.id}`
    shop.appendChild(item)

    let itemImage = document.createElement('img')
    itemImage.src = obj.imageLink
    itemImage.alt = obj.title
    itemImage.className = obj.id
    itemImage.draggable = 'true'
    itemImage.ondragstart = drag
    function drag(event) {
        event.dataTransfer.setData('className', event.target.className)
        console.log(event.dataTransfer.getData('className'))
    }
    item.appendChild(itemImage)



    let details = document.createElement('div')
    details.className = 'details'
    item.appendChild(details)

    let title = document.createElement('h3')
    title.textContent = obj.title
    details.appendChild(title)

    let author = document.createElement('p')
    author.textContent = obj.author
    details.appendChild(author)

    let priceQty = document.createElement('div')
    priceQty.className = 'price-qty'
    details.appendChild(priceQty)

    let priceValue = document.createElement('h2')
    priceValue.textContent = '$ ' + obj.price
    priceQty.appendChild(priceValue)

    let buttons = document.createElement('div')
    buttons.className = 'buttons'
    priceQty.appendChild(buttons)

    let minusSign = document.createElement('img')
    minusSign.src = './assets/icons/minus-line.svg'
    minusSign.className = 'minus'
    minusSign.addEventListener('click', () => decrement(id))
    buttons.appendChild(minusSign)

    let qty = document.createElement('div')
    qty.className = 'qty'
    qty.id = obj.id
    qty.textContent = search.item === undefined ? 0 : search.item
    buttons.appendChild(qty)

    let plusSign = document.createElement('div')
    plusSign.className = 'plus-btn'
    plusSign.textContent = 'Add to Bag'
    plusSign.addEventListener('click', () => increment(id) )
    buttons.appendChild(plusSign)
    // let plusSign = document.createElement('img')
    // plusSign.src = './assets/icons/add-button.svg'
    // plusSign.className = 'plus-btn'
    // plusSign.addEventListener('click', () => increment(id) )
    // buttons.appendChild(plusSign)


    let popup = document.createElement('div')
    popup.textContent = obj.description
    popup.className = 'popup'
    item.appendChild(popup)

    let showMoreBtn = document.createElement('button')
    showMoreBtn.textContent = 'Show more'
    showMoreBtn.className = 'show-more-btn'
    showMoreBtn.addEventListener('click', () => {
        popup.classList.toggle("show")
        if (showMoreBtn.textContent === 'Show more') {
            showMoreBtn.textContent = 'Close'
        } else {
            showMoreBtn.textContent = 'Show more'
        }
    })
    details.appendChild(showMoreBtn)
}

data.map(createCards)


//==============================RENDER===========================================================
docFrag.appendChild(nav)
docFrag.appendChild(shop)

render.appendChild(docFrag)
calculation()



//===========================DRAG AND DROP===============================================================


cart.ondragover = allowDrop
function allowDrop(event) {
    event.preventDefault()
}

cart.ondrop = drop
function drop(event) {
    let dragImageClass = event.dataTransfer.getData('className')
    console.log('yoooooo '+dragImageClass)
    let search = basket.find((x) => x.id === dragImageClass)
    if (search === undefined) {
        basket.push({
            id: dragImageClass,
            item: 1,
        })
    } else {
        search.item += 1
    }
    // console.log(basket)
    update(dragImageClass)
    localStorage.setItem('data', JSON.stringify(basket))
}





