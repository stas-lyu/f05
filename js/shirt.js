const modal2 = document.querySelector("#modal2 .modal-content");
const cardBoxShirt = document.querySelector('#card_box');
const shoppBagShirt = document.querySelector('.shopping_bag')

$(document).ready(function() {
    let card = [];

    fetch('catalog.json')
        .then(response => response.json())
        .then(json => {
            return json.shirt
        })
        .then(json => {
            console.log(json)
            let divBox = document.querySelector('.shirt-box')
            json.forEach(element => {
                renderCard(element, divBox)
                postImg(element.imageUrls)


                let addCart = document.querySelector(`#${element.id} .addCard`);
                addCart.addEventListener('click', (e) => {
                    if (addCart.style.color == "red") {
                        addCart.style.color = "black"

                        card.forEach((value, key) => {
                            if (value.id === `${element.id}`)
                                delete card[key]
                        })
                    } else {
                        addCart.style.color = "red"
                        card.push(element);
                    }
                })


            });
            modalRender()


            cardBoxShirt.addEventListener('click', () => {
                shoppBagShirt.innerHTML = ``;
                renderCart(card)
                plusItemCart(card)
            })



        }).then(() => {
            let slick = $('.carusel-shirt');
            slick.slick({
                dots: false,
                arrows: false,
                lazyLoad: 'progressive',
                slidesToShow: 1,
            });

        })


});




let postImg = (array) => {
    let carousel = document.querySelectorAll('.carusel-shirt')
    array.forEach(src => {
        let img = document.createElement('img');
        img.className = 'img-shirt';
        img.setAttribute('data-lazy', src);
        img.src = 'assets/img/placeholder.jpg';
        carousel.forEach(el => {
            el.appendChild(img);
        })
    })
}


let renderCard = (array, divBox) => {
    let divContainer = document.createElement('div');
    divContainer.classList.add('col', 's12', 'm4', 'shirt_product');
    divContainer.id = array.id
    let divCarusel = document.createElement('div');
    divCarusel.classList.add('carusel-shirt');

    let shirtName = document.createElement('div')
    shirtName.classList.add('shirt_name')

    let price = document.createElement('div')
    price.classList.add('price')

    let shirtBrand = document.createElement('div')
    shirtBrand.classList.add('shirt-brand')

    let shirtColor = document.createElement('div')
    shirtColor.classList.add('shirt-color')

    let shirtDiscription = document.createElement('div')
    shirtDiscription.classList.add('shirt-discription')

    let icon = document.createElement('i')
    icon.classList.add('fas', 'fa-cart-plus', 'addCard')

    let modalBtnOrder = document.createElement('a')
    modalBtnOrder.classList.add('waves-effect', 'waves-light', 'btn', 'modal-trigger')
    modalBtnOrder.href = '#modal1'

    shirtName.innerHTML = `Названые: ${array.name}`
    price.innerHTML = `
    <span class="oldPrice">${array.previousPrice} ₴</span>
    <span class="newPrice">${array.currentPrice} ₴</span>`
    shirtBrand.innerHTML = `<div class="shirt-brand">${array.brand}</div>`
    shirtColor.innerHTML = `<div class="shirt-color">${array.color} </div>`
    shirtDiscription.innerHTML = `<div class="shirt-discription">${array.description}</div>`
    modalBtnOrder.innerHTML = `Заказать`
    price.append(icon)
    divContainer.append(divCarusel, shirtName, price, shirtBrand, shirtColor, shirtDiscription, modalBtnOrder)
    divBox.append(divContainer)
}


let modalRender = () => {
    const modal = document.querySelector('#modal1 .modal-content');

    let itemCardArray = document.querySelectorAll('.shirt_product');
    itemCardArray.forEach(el => {
        el.addEventListener('click', () => {
            let shirtBrand = el.querySelector('.shirt-brand');
            let shirtColor = el.querySelector('.shirt-color');
            let shirtDiscription = el.querySelector('.shirt-discription');
            let newPrice = el.querySelector('.newPrice');
            let oldPrice = el.querySelector('.oldPrice')
            let shirtName = el.querySelector('.shirt_name');
            let image = el.querySelector('.img-shirt')

            let row = document.createElement('div')
            row.classList.add('row', 'modalBox')

            let colLeft = document.createElement('div')
            colLeft.classList.add('col', 's12', 'm6')
            colLeft.innerHTML = `<img class="modal-img" src='${image.src}'>`

            let colRight = document.createElement('div')
            colRight.classList.add('col', 's12', 'm6')
            colRight.innerHTML = `
            <h5 class="shirtNameModal">${shirtName.textContent}</h5>
            <div class="shirt-brand-modal"><b>Бренд:</b> ${shirtBrand.textContent}</div>
            <div class="shirt-discription-modal"><b>Описания:</b> ${shirtDiscription.textContent}
            <div class="shirt-color-modal"><b>Цвет:</b> ${shirtColor.textContent}</div>
            </div>
            <div class="price"><b>Цена:</b>
            <span class="oldPrice">${oldPrice.textContent}</span>
            <span class="newPriceModal">${newPrice.textContent}</span>
            </div>
            </div>
            `

            let colCentr = document.createElement('div')
            colCentr.classList.add('col', 's12')
            colCentr.innerHTML = `
             <form method="post" class="d-flex flex-column w-100" action="">
             <input placeholder="Имя*" type="text" name="name" required="">
             <input placeholder="Телефон*" type="text" name="phone" required="">
             <button class="grey darken-4 waves-effect waves-light btn" type="button">Заказать</button>
             </form>
            `
            row.append(colLeft, colRight, colCentr)
            modal.innerHTML = ''
            modal.append(row)

        })
    })

}




let render = (el, item) => {
    let cardBox = document.createElement('div');
    cardBox.classList.add('cart_box')
    cardBox.id = `cartId_${item.id}`
    let deletes = document.createElement('span');
    deletes.id = `delete_${item.id}`
    deletes.innerHTML = `<i class="fas fa-trash-alt"></i>`
    deletes.classList.add('delete')
    let modal2NameColor = document.createElement('div');
    modal2NameColor.classList.add('modal2_name_color')
    modal2NameColor.innerHTML = `
<span>${item.name.slice(0, 25) + ' ...'}</span>
<span style="color:${item.color};" >${item.color}</span>`
    let img = document.createElement('img');
    img.src = `${item.imageUrls[0]}`;
    img.classList.add('cart_img')
    let calc = document.createElement('div');
    calc.classList.add('count')
    let minus = document.createElement('span');
    minus.innerHTML = `<i class="fas fa-minus"></i>`;
    minus.classList.add('minus');
    minus.id = `minus_${item.id}`;
    let plus = document.createElement('span');
    plus.innerHTML = `<i class="fas fa-plus"></i>`
    plus.id = `plus_${item.id}`;
    plus.classList.add('plus');
    let caunt = document.createElement('input');
    caunt.id = `count_${item.id}`;
    caunt.classList.add('counter');
    caunt.value = `1`
    calc.append(minus, caunt, plus);
    let result = document.createElement('p')
    result.id = `result_${item.id}`
    result.classList.add('priceCalc');
    result.innerHTML = `$ ${item.currentPrice}`

    cardBox.append(deletes, img, modal2NameColor, calc, result)

    el.append(cardBox)

}


let renderCart = (card) => {
    card.forEach((e) => {
        render(shoppBagShirt, e);

    })
}

let plusItemCart = (json) => {

    json.forEach((item) => {
        let amount = 0
        let cauntNum = 0
        let price = item.currentPrice;
        let plus = document.querySelector(`#plus_${item.id}`);
        let minus = document.querySelector(`#minus_${item.id}`);
        let result = document.querySelector(`#result_${item.id}`);
        let count = document.querySelector(`#count_${item.id}`);
        let deletes = document.querySelector(`#delete_${item.id}`);
        let box = document.querySelector(`#cartId_${item.id}`)

        deletes.addEventListener('click', () => {
            box.parentNode.removeChild(box)
        })

        plus.addEventListener('click', () => {
            count.value = ++cauntNum;
            amount += price;
            result.textContent = ("$ " + amount);
            return amount, count
        })
        minus.addEventListener('click', () => {
            if (cauntNum <= 0) {
                count.value = 0;
                amount = 0;
                result.textContent = ("$ " + amount);
                return amount, count
            } else count.value = --cauntNum;
            amount -= price;
            result.textContent = ("$ " + amount);
            return amount, count
        })
    })
}