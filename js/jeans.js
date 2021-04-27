$(document).ready(function() {

    fetch('catalog.json')
        .then(response => response.json())
        .then(json => {
            json.jeans.forEach((product) => {
                let itemBox = document.querySelector('.item_box')
                let divCard = document.createElement('div')
                let slider = document.createElement('div')
                let descr = document.createElement('div');
                descr.classList.add('descr')
                slider.classList.add('single-item', 's12', 'm4')
                divCard.classList.add("item_box_card", 's12', 'm4');
                itemBox.append(divCard);
                divCard.append(slider, descr);
                descr.innerHTML = `
            <p class="product_name">${product.name}</p> 
            <span class="new_price_jeans">${product.currentPrice}$</span>
            <span class="old_price_jeans">${product.previousPrice}$</span>
                        <div class="like"><i class="fas fa-heart"></i></div>
            <p><a class="waves-effect waves-light btn modal-trigger" href="#modal1">Купить</a></p>
            `
                product.imageUrls.forEach((url) => {
                    let img = document.createElement('img');
                    img.src = 'assets/img/placeholder.jpg';
                    img.className = 'gallery';
                    img.setAttribute('data-lazy', url);
                    slider.append(img);
                })
            });

            let likes = this.querySelectorAll('.like');

            likes.forEach((like)=> {
                like.addEventListener('click', ()=> {
                    if (like.style.color == "black") {
                        like.style.color = "red"
                    } else { like.style.color = "black" }
                })
            })

        })
        .then(() => {
            // modal
            const modal = document.querySelector('.modal-content');
            let modal_new = document.querySelector('#modal1');
            let md_new = modal_new.classList.add('modal_new');
            let itemCard = document.querySelectorAll('.item_box_card');
            // console.log(priceNew);

            itemCard.forEach(item => {
                item.addEventListener('click', () => {
                    let priceNew = item.querySelector('.new_price_jeans');
                    let priceOld = item.querySelector('.old_price_jeans')
                    let productName = item.querySelector('.product_name');
                    let image = item.querySelector('.gallery')
                    modal.innerHTML = `
                    <h4>${productName.innerText}</h4>
                    <div class='modal_content'> 
                      
                        <img class="modalImg"src='${image.src}'> 
                        <div class="modal_desc">
                        <div class="modal_prices">
                        <span class='old_price_modal'>${priceOld.innerText}</span>
                        <span class='new_price_modal'>${priceNew.innerText}</span>
                        </div>
                        <div class='count'><button>-</button> 0 <button>+</button></div>
                        <div class='inputs'>
                        <h5>Оформить заказ:</h5>
                        <label for="name_jeans">
                            <input placeholder="Введите ваше имя" type="text"id="name_jeans">
                        </label>
                        <label for="phone_jeans">
                            <input placeholder="Ваш номер телефона" type="text"id="phone_jeans">
                        </label>
                        <label for="button_send">
                            <input value='Оправить' type="button"id="button_send">
                        </label>
                        </div>
                        </div>
                        
                    </div>
            `
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
