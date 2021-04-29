let jacket = document.querySelector('.jacket')
let jacketProd = document.querySelector('.jacket_prod')
let cart = [];
fetch('catalog.json')
    .then(response => response.json())
    .then(json => {
        json.jacket.forEach(list => {

            jacket.innerHTML += `
            <div class="col s12 m4">
            <div class="jacket_prod" id= '${list.id}'>                    
                    <div class="jacket_name">${list.name}</div>
                    
                    <div class="carousel_jacket">
                    </div>
                    
                    <div class="jacket_price">Цена :
                    <div class="oldPrice">${list.previousPrice}$</div>
                    <div class="newprice">${list.currentPrice}$</div>
                    </div>
                    <div class="jacket_quantity">Количество: ${list.quantity}</div>
                    <div class="jacket_color">Цвета в наличии: ${list.color}</div>
                    <div class="mt_10">
                    <a class="waves-effect waves-light btn modal-trigger btnSize" href="#modal1">Перейти к покупке</a>
                    <div class="like"><i class="fas fa-shopping-basket fa-3x"></i></div>
                    </div>
                    </div>
        `
            postImg(list.imageUrls)

            $(document).ready(function () {
                let like = document.querySelector(`#${list.id} .like`);
                like.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (like.style.color == "red") {
                        like.style.color = "black"
                        cart.forEach((value, key) => {
                            if (value.id === `${list.id}`)
                                delete cart[key]
                            console.log(cart)
                        })

                    } else {
                        like.style.color = "red"
                        cart.push(list);
                        console.log(cart)
                    }
                })

            });


        })
        $('.modal').modal();
        let jacketProd = document.querySelectorAll(".jacket_prod");
        let modalContent = document.querySelector(".modal-content");
        jacketProd.forEach((item) => {
            item.addEventListener("click", () => {
                let jacket_name = item.querySelector(".jacket_name").innerText;
                let oldPrice = item.querySelector(".oldPrice").innerText;
                let newprice = item.querySelector(".newprice").innerText;
                let quantity = item.querySelector(".jacket_quantity").innerText;
                let color = item.querySelector(".jacket_color").innerText;
                let gallery = item.querySelector('.gallery_jacket');
                console.log("text")
                console.log(gallery)
                modalContent.innerHTML = `
            <h4>Бренд : ${jacket_name}</h4>
            <div class="flex">
            <div class="jacketModalImgSize">
            <img class="modalImg"src='${gallery.src}'> 
            </div>
            <div class="jacketModalTextSize">
           
                <div class="jacket_price">Цена :
                <div class="oldPrice">${oldPrice}</div>
                <div class="newprice">${newprice}</div>
                </div>
                <div class="jacket_quantity">Количество:${quantity}</div>
                <div class="jacket_color">Цвета в наличии: ${color}</div>
                <label for="jacket_name">
                        <input placeholder="Введите ваше имя" type="text"id="jacket_name">
                    </label>
                    <label for="jaket_phone">
                        <input placeholder="Ваш номер телефона" type="text"id="jaket_phone">
                    </label>
                    <label for="button_send">
                        <input value='Оправить' type="button"id="button_send">
                    </label>
                    </div>
            `
            })
        })
    }).then(() => {
    let slick = $('.carousel_jacket');
    slick.slick({
        lazyLoad: 'progressive',
        dots: true,
        arrows: false,
    });
})

let postImg = (array) => {
    let carousel = document.querySelectorAll('.carousel_jacket')
    array.forEach(src => {
        let img = document.createElement('img');
        img.src = src;
        img.setAttribute('data-lazy', src);
        img.className = 'gallery_jacket';
        carousel.forEach(el => {
            el.appendChild(img);
        })
    })
}

$('.modal2').modal();
let bag = document.querySelector(".bag");
let modal2 = document.querySelector(".modal-content_2");
let cardBox = document.querySelector("#card_box");
cardBox.addEventListener("click", () => {
        cardBox.innerHTML = ``;
        cart.forEach((e) => {
            console.log(1)
            bag.innerHTML += `
        <div class='card_box'>
        <span class='delete'><i class="fas fa-trash-alt"></i></span>
        <img class="cart_img"src='${e.imageUrls[0]}'> 
        <div class='modal2_name_color'>
        <span>${e.name.slice(0, 25) + ' ...'}</span>
        <span style="color:${e.color};" >${e.color}</span>
        </div>
        <div class="count">
                <span class="minus"><i class="fas fa-minus"></i></span>
                <input class="counter" type="text" value="1">
                <span class="plus"><i class="fas fa-plus"></i></span>
        </div>
        <p class='price_sum'>$ ${e.currentPrice}</p>
        </div>
        </div>
`

        })
    }
)
