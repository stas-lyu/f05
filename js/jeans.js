$(document).ready(function () {
    const modal2 = document.querySelector("#modal2 .modal-content");
    const cardBox = document.querySelector('#card_box');
    const shoppBag = document.querySelector('.shopping_bag')

    let cart = [];

    // function deleteCartItem(item, id, el) {
    //     item.addEventListener('click', () => {
    //         cart.forEach((value, key) => {
    //             if (value.id === id)
    //                 delete cart[key]
    //         })
    //         el.innerHTML = ''
    //         renderCart(cart)
    //     })
    // }

    function deleteCartItem(id, el) {
            cart.forEach((value, key) => {
                if (value.id === id)
                    delete cart[key]
            })
            el.innerHTML = ''
            renderCart(cart)
    }

    // function plusItemCart(element, json) {
    //     element.addEventListener("click", (item) => {
    //         let price = json.currentPrice;
    //         let plus = $(`#plus_${json.id}`);
    //         let minus = $(`#minus_${json.id}`);
    //         let result = $(`#result_${json.id}`);
    //         let count = $(`#count_${json.id}`);
    //
    //             plus.addEventListener('click', ()=> {
    //                 price += e.currentPrice;
    //                 count.attr('value', parseInt(count.val()) + 1);
    //                 minus.css('visibility', 'visible')
    //                 result.text("$ " + price)
    //             })
    //     })
    // }

    function render(el, item) {
        let container = document.createElement('div').classList.add('.cart_box');

        el.innerHTML += `
                        <div class='cart_box'>
                        <span id="delete_${item.id}" class='delete'><i class="fas fa-trash-alt"></i></span>
                        <img class="cart_img"src='${item.imageUrls[0]}'> 
                        <div class='modal2_name_color'>
                        <span>${item.name.slice(0, 25) + ' ...'}</span>
                        <span style="color:${item.color};" >${item.color}</span>
                        </div>
                        <div class="count">
                                <span id="minus_${item.id}" class="minus"><i class="fas fa-minus"></i></span>
                                <input id="count_${item.id}" class="counter" type="text" value="1">
                                <span id="plus_${item.id}" class="plus"><i class="fas fa-plus"></i></span>
                        </div>
                        <p id="result_${item.id}" class='price_sum'>$ ${item.currentPrice}</p>
                        </div>
                       
                        </div>
                    `
        // let deleteBtn = document.createElement('span');
        // let img = document.createElement('img');
        // img.src = item.imageUrls[0]
        // let id = item.id;
        //
        // deleteBtn.addEventListener('click', deleteCartItem(id, el))
        //
        // container.append(deleteBtn, img)

    }




        // deleteCartItem(document.querySelector(`#delete_${item.id}`), `${item.id}`, el)


    function renderCart(cart) {
        cart.forEach((e)=> {
            render(shoppBag, e);
        })
    }

    fetch('catalog.json')
        .then(response => response.json())
        .then(json => {
            return json.jeans
        })
        .then(json => {
            json.forEach((product) => {
                let itemBox = document.querySelector('.item_box')
                let divCard = document.createElement('div')
                let slider = document.createElement('div')
                let descr = document.createElement('div');
                descr.classList.add('descr')
                slider.classList.add('single-item', 's12', 'm4')
                divCard.classList.add("item_box_card", 's12', 'm4');
                divCard.id = product.id; // ???????????????????? id ?? ???????????????? ????????????
                itemBox.append(divCard);
                divCard.append(slider, descr);
                descr.innerHTML = `
            <p class="product_name">${product.name}</p> 
            <span class="new_price_jeans">${product.currentPrice}$</span>
            <span class="old_price_jeans">${product.previousPrice}$</span>
                        <i class="fas addCart fa-cart-plus"></i>
            <p><a class="waves-effect waves-light btn modal-trigger" href="#modal1">????????????</a></p>
            `
                product.imageUrls.forEach((url) => {
                    let img = document.createElement('img');
                    img.src = 'assets/img/placeholder.jpg';
                    img.className = 'gallery';
                    img.setAttribute('data-lazy', url);
                    slider.append(img);
                })

                let addCart = document.querySelector(`#${product.id} .addCart`);


                addCart.addEventListener('click', (e) => {
                    if (addCart.style.color == "red") {
                        addCart.style.color = "black"

                        cart.forEach((value, key) => {
                            if (value.id === `${product.id}`)
                                delete cart[key]
                        })
                        console.log(cart);
                    } else {
                        addCart.style.color = "red"
                        cart.push(product);


                    }

                })

            });



            cardBox.addEventListener('click', () => {


                shoppBag.innerHTML = ``;

                renderCart(cart)

                // cart.forEach((e) => {
                //     render(shoppBag);
                //     let price = e.currentPrice;
                //     let plus = $(`#plus_${e.id}`);
                //     let minus = $(`#minus_${e.id}`);
                //     let result = $(`#result_${e.id}`);
                //     let count = $(`#count_${e.id}`)
                //
                //     plus.click(function () {
                //         console.log('click')
                //         price += e.currentPrice;
                //         count.attr('value', parseInt(count.val()) + 1);
                //         minus.css('visibility', 'visible')
                //         result.text("$ " + price)
                //     });
                //     minus.click(function () {
                //         price -= e.currentPrice;
                //         count.attr('value', parseInt(count.val()) - 1);
                //         if (count.val() == 0) {
                //             minus.css('visibility', 'hidden')
                //         } else {
                //         }
                //         result.text("$ " + price)
                //     })
                //     console.log(price);
                //
                //     let deleteItem = document.querySelectorAll('.delete')
                //
                //
                //     deleteCartItem(deleteItem);
                //
                //
                // });


            })


        })

        .then(() => {


            // modal
            const modal = document.querySelector('#modal1 .modal-content');
            let modal_new = document.querySelector('#modal1');
            let md_new = modal_new.classList.add('modal_new');
            let itemCard = document.querySelectorAll('.item_box_card');


            // console.log(priceNew);

            itemCard.forEach(item => {

                item.addEventListener('click', (e) => {

                    let priceNew = item.querySelector('.new_price_jeans');
                    let priceOld = item.querySelector('.old_price_jeans')
                    let productName = item.querySelector('.product_name');
                    let image = item.querySelector('.gallery')
                    modal.innerHTML = `
                    <h4>${productName.innerText}</h4>
                    <div class='modal_content'> 
                        <img class="modalImg" src='${image.src}'> 
                        <div class="modal_desc">
                        <div class="modal_prices">
                        <span class='old_price_modal'>${priceOld.innerText}</span>
                        <span class='new_price_modal'>${priceNew.innerText}</span>
                        </div>
                        <div class='count'><button>-</button> 0 <button>+</button></div>
                        <div class='inputs'>
                        <h5>???????????????? ??????????:</h5>
                        <label for="name_jeans">
                            <input placeholder="?????????????? ???????? ??????" type="text"id="name_jeans">
                        </label>
                        <label for="phone_jeans">
                            <input placeholder="?????? ?????????? ????????????????" type="text"id="phone_jeans">
                        </label>
                        <label for="button_send">
                            <input value='????????????????' type="button"id="button_send">
                        </label>
                        </div>
                        </div>
                        
                    </div>
            `
                    // cart.forEach((e) => {

                    //     modal2.innerHTML += `
                    //             <div class='cart_box'>
                    //             <span><i class="fas fa-trash-alt"></i></span>
                    //             <img class="cart_img"src='${e.imageUrls[0]}'>
                    //             <p>${e.currentPrice}</p>

                    //             </div>`

                    //     console.log(cart);


                    // })
                })

            })

        })


        .then(() => {


            let slick = $('.single-item');

            slick.slick({
                dots: true,
                arrows: false,
                infinite: true,
                lazyLoad: 'progressive',
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true
            });

            $('.collapsible').collapsible();

        })
});