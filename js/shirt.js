$(document).ready(function() {
    fetch('catalog.json')
        .then(response => response.json())
        .then(json => {
            let row = document.querySelector('.shirt-box')
            json.shirt.forEach(element => {

                row.innerHTML += `
            <div class=" col s12 m4 ">
            <div class="shirt_product">
  
            <p class="shirt_brand">Бренд : ${element.brand}</p>
        <p class="shirt_name">Названые: ${element.name}</p>
        <div class="price"> Цена :
            <div class="oldPrice">${element.previousPrice} ₴</div>
            <div class="newPrice">${element.currentPrice} ₴</div>
        </div>
                              <div class="carousel">
            </div>
        <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
        </div>
        </div>
        `
                postImg(element.imageUrls)
            });
        }).then(() => {
        let slick = $('.carousel');

        slick.slick({
            dots: true,
            arrows: false,
            lazyLoad: 'progressive',
            slidesToShow: 1,
        });

    })



    let postImg = (array) => {
        let carousel = document.querySelectorAll('.carousel')
        array.forEach(src => {
            let img = document.createElement('img');
            img.setAttribute('data-lazy', src);
            img.src = 'assets/img/placeholder.jpg';
            carousel.forEach(el => {
                el.appendChild(img);
            })
        })
    }
});

