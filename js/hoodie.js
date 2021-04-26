const hoodieBlock = document.querySelector('.hoodie_block');


fetch(`catalog.json`)
    .then(response => response.json())
    .then(json => {
        json.hoodie.forEach(element => {
            let img = "";

            element.imageUrls.forEach((prod) => {
                img += `<img class="image-hoodie" src="${prod}"/>`
            });
            hoodieBlock.innerHTML += `
                <div class="hoodie_prod">
                    <div class="single-items">${img}</div>
                    <div class="hoodie_name div-in-hoodie">${element.name}</div>
                    <div class="currentPrice-hoodie div-in-hoodie">Цена: ${element.currentPrice}$</div>
                    <div class="hoodie-display">
                    <div class="newPrice-hoodie div-in-hoodie">Цена: ${element.previousPrice}</div>
                    <div class="color-hoodie div-in-hoodie">Цвет: ${element.color}</div>
                    <div class="brand-hoodie div-in-hoodie">Брэнд: ${element.brand}</div>
                    <div class="parametrs-hoodie div-in-hoodie">Состав: ${element.parametrs}</div>
                    <div class="description-hoodie div-in-hoodie">Описание: ${element.description}</div>
                    </div>
                    </div>
        `
        });
    })
    .then(() => {
        let slicks = $('.single-items');

        slicks.slick({
            lazyLoad: 'ondemand',
            dots: true,
        });
        let slickDots = document.querySelectorAll('.slick-dots');
        let slickSlide = document.querySelectorAll('.slick-slide');
        let slickArrow = document.querySelectorAll('.slick-arrow');

        slickDots.forEach((item)=> {
            item.classList.add('slick-dots-hoodie');
        })

        slickSlide.forEach((item)=> {
            item.classList.add('slick-slide-hoodie');
        })

        slickArrow.forEach((item)=> {
            item.classList.add('slick-arrow-hoodie');
        })
    })