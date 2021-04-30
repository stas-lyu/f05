const hoodieBlock = document.querySelector('.hoodie_block');
let carts = [];



fetch(`catalog.json`)
    .then(response => response.json())
    .then(json => {
        json.hoodie.forEach(element => {

            let productHoodie = document.createElement('div');
            let sliderHoodie = document.createElement('div');
            let containerHoodie = document.createElement('div');

            containerHoodie.classList.add('hoodieContainer', 'col', 's12', 'm4');
            productHoodie.classList.add('descriptionHoodie');
            sliderHoodie.classList.add('single-itemHoodie');
            productHoodie.id = element.id;

            containerHoodie.append(sliderHoodie, productHoodie);
            hoodieBlock.append(containerHoodie);

            productHoodie.innerHTML += `
            <p class="hoodie_name" style="font-weight: lighter">${element.name}</p>
            <div class="priceHoodie" style="display: flex; font-size: 18px; font-weight: bold;" >
            <p class="currentPrice-hoodie">${element.currentPrice}₴</p>            
            <p class="newPrice-hoodie" style="color: #afaeae;text-decoration: line-through; margin-left: 20px;">${element.previousPrice}₴</p>
            </div>
             <i class="fas addCartHoodie fa-cart-plus"></i>
            <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Заказать</a>  
            <div class="hoodie-display">
            <p class="brand-hoodie">${element.brand}</p>
            <p class="color-hoodie">Цвет: ${element.color}</p>
            <p class="parametrs-hoodie">Наличие: ${element.quantity} шт.</p> 
            <p class="description-hoodie">${element.description}</p>
            </div>
            `
            element.imageUrls.forEach((url) => {
                let imgHoodie = document.createElement('img');
                imgHoodie.classList.add('hoodieImage');
                imgHoodie.src = url;
                imgHoodie.setAttribute('data-lazy', url);
                sliderHoodie.append(imgHoodie);
            })

            let addCartHoodie = document.querySelector(`#${element.id} .addCartHoodie`);

            addCartHoodie.addEventListener('click', () => {
                if (addCartHoodie.style.color === "red") {
                    addCartHoodie.style.color = "black"
                    carts.forEach((value, key) => {
                        if (value.id === `${element.id}`)
                            delete carts[key]
                    })
                } else {
                    addCartHoodie.style.color = "red"
                    carts.push(element);
                }
            })
        });

        const modalHoodieSecond = document.querySelector("#modal2 .modal-content");
        const cardBoxHoodie = document.querySelector('#card_box');
        const shoppBagHoodie = document.querySelector('.shopping_bag')

        cardBoxHoodie.addEventListener('click', () => {

            shoppBagHoodie.innerHTML=``;
            carts.forEach((item) => {

                shoppBagHoodie.innerHTML += `
                      <div class='marginBlocks'>
                          <div class="iconsModal" style="margin: 0 10px">
                            <span class='delete'><i class="fas fa-trash-alt"></i></span>
                           </div>
                           <div class="imgModalBlock" style="margin: 0 10px">
                           <img class="cart_img"src='${item.imageUrls[0]}'> 
                           </div>
                        <div class='modalNameHoodie' style="width: 250px; margin: 0 10px;">
                        <p style="padding: 0; margin: 0;">${item.name}</p>
                        <p style="padding: 0; margin: 0;">${item.color}</p>
                        </div>
                        <div class="countHoodie">
                                <span class="minusModalHoodie btnModalPlusMines"><i class="fas fa-minus"></i></span>
                                <input class="counter" type="text" value="1">
                                <span class="plusModalHoodie btnModalPlusMines"><i class="fas fa-plus"></i></span>
                              </div>
                            <div class="finnalSummModalStore marginBlocks">
                              <p id="price_sum" style="font-size: 18px;">${item.currentPrice}₴</p>
                            </div>
                        </div>
                      </div>
                    `
                    let priceHoodie = item.currentPrice;
                
                    $(".plusModalHoodie").click(function () {
                        priceHoodie += item.currentPrice;
                        $(".counter").attr('value', parseInt($(".counter").val()) + 1);
                        $(".minusModalHoodie").css('visibility', 'visible')
                        $('#price_sum').text("$ " + priceHoodie)

                    });
                    $(".minusModalHoodie").click(function () {
                        priceHoodie -= item.currentPrice;
                        $(".counter").attr('value', parseInt($(".counter").val()) - 1);
                        if ($(".counter").val() == 0) {
                            $(".minusModalHoodie").css('visibility', 'hidden')
                        } else {
                        }
                        $('#price_sum').text("$ " + priceHoodie)
                    })
            });
        })
    })
    .then(()=> {
        const modalHoodie = document.querySelector('.modal-content');
        let hoodieContainer = document.querySelectorAll('.hoodieContainer');

        hoodieContainer.forEach((link) => {
            link.addEventListener('click', () => {
                let productHoodieCurrentPrice = link.querySelector('.currentPrice-hoodie').innerText;
                let productHoodieName = link.querySelector('.hoodie_name').innerText;
                let productHoodieBrand = link.querySelector('.brand-hoodie').innerText;
                let productHoodiePrevPrice = link.querySelector('.newPrice-hoodie').innerText;
                let productHoodieDescr = link.querySelector('.description-hoodie').innerText;
                let productHoodieColor = link.querySelector('.color-hoodie').innerText;
                let productHoodieParam = link.querySelector('.parametrs-hoodie').innerHTML;

                let modalSkirtGallery = link.querySelector('.single-itemHoodie').innerHTML;
                let modalSkirtImg = link.querySelector('.hoodieImage').src;

                modalHoodie.innerHTML = `
                <div class="modalSkirt row">
                 <div class="col s12 m6">
                <img class="modalImgHoodie" src="${modalSkirtImg}" alt="Product"></div>
                <div class="modalDescr col s12 m6">
                     <p style="font-weight: lighter;font-size: 30px;">${productHoodieName}</p>
                     <p><span style="font-weight: bold">Brand: </span>${productHoodieBrand}</p>
                     <p style="font-weight: bold; font-size: 30px; margin-bottom: 0">${productHoodieCurrentPrice}</p>
                     <p style="opacity: 0.7;text-decoration: line-through;margin-top: 0">${productHoodiePrevPrice}</p>
                     <p><span style="font-weight: bold">ОПИСАНИЕ</span><br></br>${productHoodieDescr}</p>
                     <p>${productHoodieColor}</p>
                     <div>${productHoodieParam}</div>
                      <form class="d-flex flex-column">
                      <div class="form">
                       <input placeholder="Введите свое имя" type="text" name="name" required>
                       <input placeholder="Введите свой номер телефона" type="text" name="phone" required>
                       <button class="btnOrder" type="submit">Заказать</button>
                      </div>
                  </form>
                </div>
                </div>
                `
            })
        })
    })
    .then(() => {
        let slicks = $('.single-itemHoodie');
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
    });
