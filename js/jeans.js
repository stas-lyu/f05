fetch('catalog.json')
    .then(response => response.json())
    .then(json => {
        json.jeans.forEach((product) => {
            let itemBox = document.querySelector('.item_box')
            let divCard = document.createElement('div')
            let slider = document.createElement('div')
            let descr = document.createElement('div');
            descr.classList.add('descr')
            slider.classList.add('single-item', 'col', 's12', 'm6')
            divCard.classList.add("item_box_card");
            itemBox.append(divCard);
            divCard.append(slider, descr)
            descr.innerHTML = `
            <p>${product.name}</p> 
            <ul class="collapsible text-collaps">
            <li>
            <div class="collapsible-header flex-icon"><b>Подробнее:</b> <i class="far fa-arrow-alt-circle-down m-0"></i></div>
            <div class="collapsible-body flex-body"><span><p class="brand_jeans_name"><b>Бренд:</b><span class='brand_jeans'>${product.brand}</span></span>
               <p class='prise_jeans'> <b>Цвет:</b> <span style="color:${product.color}; font-weight:bold">${product.color}</span></p>
               <p><b>В наличии:</b> ${product.quantity}</p></span></div>
            </li>
            <li>
            <div class="collapsible-header flex-icon"><b>Цена:</b> <i class="far fa-arrow-alt-circle-down m-0"></i></div>
            <div class="collapsible-body flex-body"><span><p><b style="text-decoration:line-through">Старая цена:</b> <span class="old_price_jeans">${product.previousPrice}</span><b>Новая цена:</b> <span class="new_price_jeans">${product.currentPrice}</span></p></span></div>
            </li> 
            <li>
            <div class="collapsible-header flex-icon"><b>Описание:</b> <i class="far fa-arrow-alt-circle-down m-0"></i></div>
            <div class="collapsible-body flex-body"><span><p><b>Параметры:</b> ${product.parametrs[0]}</p>
                <p><b>Описание:</b> ${product.description[0]}</p></span></div>
            </li>
            </ul>
            `


            product.imageUrls.forEach((url) => {
                let img = document.createElement('img');
                img.src = url;
                img.setAttribute('data-lazy', url);
                slider.append(img);
            })
        });

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
    })