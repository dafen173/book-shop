# Book Shop

This project is a book shop built with `Javascript`.

## [DEMO version](https://dafen173.github.io/book-shop/)

<hr>
<br>

## Description

+ The content of catalog page created thru the JavaScript. User sees the book image, title, author, price, show more and add to bag buttons.

+ After user clicks on Show more button the popup with description and close button are shown.

+ The HTML elements should be added to the page using document fragment.

+ When the user adds the book to the bag (either by click on Add to bag button or by drag-and-drop), the book appears in the bag with shorten data (title, author, price) and remove (cross) button. Also, the total sum is updated.

+ When user click on Confirm order he appears in the Order page ( with form ).

+ The order form contains fields with own validation rules and Complete button.

+ Name (mandatory, the length not less than 4 symbols, strings only, without spaces).

+ Surname (mandatory, the length not less than 5 symbols, strings only, without spaces).

+ Delivery date(mandatory, not earlier than next day).

+ Street (mandatory, the length not less than 5 symbols, the numbers are allowed).

+ House number(mandatory, numbers only, positive numbers only).

+ Flat number(mandatory, numbers only, positive numbers only, the dash symbol is allowed. Means, the flat number shouldn't start with minus/dash symbol. For example: -37 is invalid, but 1-37 is valid).

+ Choose the payment type(radio buttons group): Cash or Card (mandatory).

+ Choose 2 gifts:
  - pack as a gift,
  - add postcard,
  - provide 2% discount to the next time,
  - branded pen or pencil

+ The Complete button is disabled until the user full form with valid information +5.

+ If user left the field empty or fill with invalid data, this field became red (means red border) and the validation message (The field is invalid) is appeared. After user fix data and left the field again, the validation red border and message should disappear.

+ After user fill all mandatory field with valid information, the Complete button become active.

+ After user click on Complete button, he will see the summarized information: for instance, The order created. The delivery address is Amazing street house 3 flat 10. Customer John Gald.
