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
cartAnchor.href = '../cart.html'
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


docFrag.appendChild(nav)
// docFrag.appendChild(labelContainer)
render.prepend(docFrag)

//==================================================================

let basket = JSON.parse(localStorage.getItem('data')) || []

let calculation = () => {
    let cartIcon = document.getElementById('cartAmount')
    cartIcon.innerHTML = basket.map(x => x.item).reduce((x,y) => x + y, 0)
}

calculation()
//=====================================================================


const today = new Date()
const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000))

const dayTomorrow = tomorrow.getDate()
const monthTomorrow = tomorrow.getMonth() + 1
const yearTomorrow = tomorrow.getFullYear()
const dateTomorrow = `${yearTomorrow}-${monthTomorrow}-${dayTomorrow}`

let date = document.getElementById('date')
date.min = dateTomorrow


function checkBoxLimit() {
	let checkBoxGroup = document.forms['form_name']['check[]']
    let limit = 2
	for (let i = 0; i < checkBoxGroup.length; i++) {
		checkBoxGroup[i].onclick = function() {
			var checkedcount = 0
			for (var i = 0; i < checkBoxGroup.length; i++) {
				checkedcount += (checkBoxGroup[i].checked) ? 1 : 0
			}
			if (checkedcount > limit) {
				alert("You can select maximum of " + limit + " gifts.")
				this.checked = false
			}
		}
	}
}
checkBoxLimit()



let nameValue = document.querySelector('#name')
let surnameValue = document.querySelector('#surname')
let dateValue = document.querySelector('#date')
let streetValue = document.querySelector('#street')
let houseValue = document.querySelector('#house')
let flatValue = document.querySelector('#flat')
let cashBtn = document.querySelector('#cash')
let cardBtn = document.querySelector('#card')

let onlyChar = /^[a-zA-Zа-яА-Я]+$/
let onlyDigitsAndChar = /^[a-zA-Zа-яА-Я0-9 ]+$/
let onlyDigitsAndDash = /^[0-9]+$|^[0-9]+[-]*[0-9]+$/

function enableSubmit(){
	let btn = document.querySelector('input[type="submit"]')
	let isValid = true

	if (
		   nameValue.value.trim() === ""
		|| nameValue.value === null
		|| nameValue.value.length < 4
		|| onlyChar.test(nameValue.value) === false
		|| surnameValue.value.trim() === ""
		|| surnameValue.value === null
	 	|| surnameValue.value.length < 5
		|| onlyChar.test(surnameValue.value) === false
		|| dateValue.value === ''
		|| Date.parse(dateValue.value) < today.getTime()
		|| streetValue.value.trim() === ""
		|| streetValue.value === null
	 	|| streetValue.value.length < 5
		|| onlyDigitsAndChar.test(streetValue.value) === false
		|| houseValue.value <= 0
		|| flatValue.value.trim() === ""
		|| flatValue.value === null
		|| onlyDigitsAndDash.test(flatValue.value) === false
		// || onlyDigits.test(flatValue.value) === false
		|| ( cashBtn.checked === false && cardBtn.checked === false)
		) {
		isValid = false
	}

	btn.disabled = !isValid
}

let spanName = document.querySelector('.span-name')
let spanSurName = document.querySelector('.span-surname')
let spanDate = document.querySelector('.span-date')
let spanStreet = document.querySelector('.span-street')
let spanHouse = document.querySelector('.span-house')
let spanFlat = document.querySelector('.span-flat')

let labelName = document.querySelector('#label-name')
let labelSurname = document.querySelector('#label-surname')
let labelDate = document.querySelector('#label-date')
let labelStreet = document.querySelector('#label-street')
let labelHouse = document.querySelector('#label-house')
let labelFlat = document.querySelector('#label-flat')

labelName.addEventListener('blur',
	function(x) {
		if(
			nameValue.value.trim() === ""
			|| nameValue.value === null
			|| nameValue.value.length < 4
			|| onlyChar.test(nameValue.value) === false) {
				nameValue.style.cssText = 'border-color: red;'
				spanName.innerHTML = 'The field is invalid'
		} else {
			nameValue.style.cssText = 'border-color: rgb(10, 223, 70);'
			spanName.innerHTML = ''
			// nameValue.nextSibling.textContent = ''
		}
	}, true)

labelSurname.addEventListener('blur',
	function(x) {
		if(
			surnameValue.value.trim() === ""
			|| surnameValue.value === null
	 		|| surnameValue.value.length < 5
			|| onlyChar.test(surnameValue.value) === false
			) {
				surnameValue.style.cssText = 'border-color: red;'
				spanSurName.innerHTML = 'The field is invalid'
		} else {
			surnameValue.style.cssText = 'border-color: rgb(10, 223, 70);'
			spanSurName.innerHTML = ''
			// nameValue.nextSibling.textContent = ''
		}
	}, true)

labelDate.addEventListener('blur',
	function(x) {
		if(
			dateValue.value === ''
			|| Date.parse(dateValue.value) < today.getTime()
			) {
				dateValue.style.cssText = 'border-color: red;'
				spanDate.innerHTML = 'The field is invalid'
		} else {
			dateValue.style.cssText = 'border-color: rgb(10, 223, 70);'
			spanDate.innerHTML = ''
		}
	}, true)

labelStreet.addEventListener('blur',
	function(x) {
		if(
			streetValue.value.trim() === ""
			|| streetValue.value === null
	 		|| streetValue.value.length < 5
			|| onlyDigitsAndChar.test(streetValue.value) === false
			) {
				streetValue.style.cssText = 'border-color: red;'
				spanStreet.innerHTML = 'The field is invalid'
		} else {
			streetValue.style.cssText = 'border-color: rgb(10, 223, 70);'
			spanStreet.innerHTML = ''
		}
	}, true)

labelHouse.addEventListener('blur',
	function(x) {
		if(
			houseValue.value <= 0
			) {
				houseValue.style.cssText = 'border-color: red;'
				spanHouse.innerHTML = 'The field is invalid'
		} else {
			houseValue.style.cssText = 'border-color: rgb(10, 223, 70);'
			spanHouse.innerHTML = ''
		}
	}, true)

labelFlat.addEventListener('blur',
	function(x) {
		if(
			flatValue.value.trim() === ""
			|| flatValue.value === null
			|| onlyDigitsAndDash.test(flatValue.value) === false
			) {
				flatValue.style.cssText = 'border-color: red;'
				spanFlat.innerHTML = 'The field is invalid'
		} else {
			flatValue.style.cssText = 'border-color: rgb(10, 223, 70);'
			spanFlat.innerHTML = ''
		}
	}, true)



let formHandler = () => {
	alert(`The order created. The delivery address is ${streetValue.value} house ${houseValue.value} flat ${flatValue.value}. Customer ${nameValue.value} ${surnameValue.value}.`)
}



