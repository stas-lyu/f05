fetch('catalog.json')
    .then(response => response.json())
    .then(json => {

        let row = document.querySelector('.shirt-box')
        json.shirt.forEach(element => {

            row.innerHTML += `
            <div class=" col s12 m6 ">
        <div class="shirt_product">
        <p class="shirt_brand">Бренд : ${element.brand}</p>

        <div class="carusel">
        </div>

        <p class="shirt_name">Названые: ${element.name}</p>
        <div class="price"> Цена :
            <div class="oldPrice">${element.previousPrice} ₴</div>
            <div class="newPrice">${element.currentPrice} ₴</div>
        </div>
        </div>
        </div>
        `
            postImg(element.imageUrls)
        });
    }).then(() => {
        let slick = $('.carusel');

        slick.slick({
            dots: true,
            arrows: false,
            lazyLoad: 'ondemand',

        });

        slick.on('afterChange', bLazy.revalidate);
    })



let postImg = (array) => {
    let carusel = document.querySelectorAll('.carusel')
    array.forEach(src => {
        let img = document.createElement('img');
        img.setAttribute('data-src', src);
        img.classList.add('b-lazy')
        img.src = src
        carusel.forEach(el => {
            el.appendChild(img);
        })
    })
}