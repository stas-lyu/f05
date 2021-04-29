$(document).ready(function() {

    let cart = [];

    fetch('catalog.json')
        .then(response => response.json())
        .then(json => {
            console.log(json)

            let row = document.querySelector('.shirt-box')
            json.shirt.forEach(element => {
                row.innerHTML += `
                <div id='${element.id}' class=" col s12 m4 shirt_product">

                <div class="carusel-shirt">
                     </div>

                     <p class="shirt_name">Названые: ${element.name}</p>
                    <div class="price"> Цена :
                     <span class="oldPrice">${element.previousPrice} ₴</span>
                    <span class="newPrice">${element.currentPrice} ₴</span>
                    
                    </div>
                    <div class="modalInfo">
                    <div class="shirt-brand">${element.brand}</div>
                    <div class="shirt-color">${element.color} </div>
                    <div class="shirt-discription">${element.description}</div>
                    </div>
                    <div class="orderBox">
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Заказать</a>
                    <i class="fas addCard fa-cart-plus"></i>
                    </div>
                     </div>
              
                `
                postImg(element.imageUrls)

                let addCardBtns = document.querySelectorAll(`.addCard`);

                addCardBtns.forEach((item)=> {
                    item.addEventListener('click', ()=> {
                        if (item.style.color == "red") {
                            item.style.color = "black"
                            cart.forEach((value, key) => {
                                if (value.id === `${element.id}`)
                                    delete cart[key]
                            })
                        } else {
                            item.style.color = "red"
                            cart.push(element);
                        }
                    })
                })

                // let addCard = document.querySelector(`#${element.id} .addCard`);

                // addCard.addEventListener('click', (e) => {
                //     console.log(add)
                //     if (addCard.style.color == "red") {
                //         addCard.style.color = "black"
                //         cart.forEach((value, key) => {
                //             if (value.id === `${element.id}`)
                //                 delete cart[key]
                //         })
                //     } else {
                //         addCard.style.color = "red"
                //         cart.push(element);
                //     }
                // })

            });
        }).then(() => {
            const modalShirt = document.querySelector('.modal-content');
            let modalCard = document.querySelectorAll('.shirt_product');

            modalCard.forEach(el => {
                el.addEventListener('click', () => {
                    let shirtBrand = el.querySelector('.shirt-brand');
                    let shirtColor = el.querySelector('.shirt-color');
                    let shirtDiscription = el.querySelector('.shirt-discription');
                    let newPrice = el.querySelector('.newPrice');
                    let oldPrice = el.querySelector('.oldPrice')
                    let shirtName = el.querySelector('.shirt_name');
                    let image = el.querySelector('.img-shirt')
                    modalShirt.innerHTML = `
                    <div class="row modalBox">

                    <div class="col s12 m6">
                    <img class="modal-img" src='${image.src}'> 
                        </div>

                    <div class="col s12 m6">
                    
                    <h5 class="shirtNameModal">${shirtName.textContent}</h5>
                        
                        <div class="shirt-brand"><b>Бренд:</b> ${shirtBrand.textContent}</div>
                        <div class="shirt-discription"><b>Описания:</b> ${shirtDiscription.textContent}
                        <div class="shirt-color">Цвет: ${shirtColor.textContent}</div>
                        </div>
                        <div class="price"><b>Цена:</b>
                        <span class="oldPrice">${oldPrice.textContent}</span>
                        <span class="newPriceModal">${newPrice.textContent}</span>
                        </div>
                    </div>
                
                </div>
    
                <div class="col s12">
                    <form method="post" class="d-flex flex-column w-100" action="">
                        <input placeholder="Имя*" type="text" name="name" required="">
                        <input placeholder="Телефон*" type="text" name="phone" required="">
                        <button class="grey darken-4 waves-effect waves-light btn" type="button">Заказать</button>
                    </form>
                </div>
                    
            `
                })

            })
        }).then(() => {
            let slick = $('.carusel-shirt');
            slick.slick({
                dots: true,
                arrows: false,
                lazyLoad: 'progressive',
                slidesToShow: 1,
            });

        })

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

});

