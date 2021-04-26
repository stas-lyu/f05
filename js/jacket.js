
fetch('catalog.json')
    .then(response => response.json())
    .then(json => {

        let row = document.querySelector('.jacket')
        json.jacket.forEach(item => {

            jacket.innerHTML += `
            <div class="col s12 m6">
                 <div class="jacket_prod">
                    <div class="jacket_name">Бренд : ${item.name}</div>
                    <div class="carousel">
                    </div>
                    <div class="jacket_price">Цена :
                    <div class="oldPrice">${item.previousPrice}</div>
                    <div class="newprice">${item.currentPrice}</div>
                    </div>
                    <div class="jacket_categories">Категория:${item.categories}</div>
                    <div class="jacket_quantity">Количество:${item.quantity}</div>
                    <div class="jacket_color">Цвета в наличии: ${item.color}</div>
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Перейти к покупке</a>
                    </div>
                        </div>
        `
            let jacketProd = document.querySelectorAll(".jacket_prod")

            jacketProd.forEach((item) => {
                item.addEventListener("click", (item) => {

                })
            })

            postImg(item.imageUrls)
        });
        // <div class="jacket_description">Описание: ${item.description}</div>
    }).then(() => {
    let slick = $('.carousel');

    slick.slick({
        dots: true,
        // infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true

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


