const hoodieBlock = document.querySelector('.hoodie_block');
const modalHoodie = document.querySelector('.modal-content');

fetch(`catalog.json`)
    .then(response => response.json())
    .then(json => {
        json.hoodie.forEach(element => {
            let img = "";
            element.imageUrls.forEach((prod) => {
                img += `<img class="image-hoodie" src="${prod}"/>`
            });
            hoodieBlock.innerHTML += `
                <div class="hoodie_prod" id="${element.id}">
                    <div class="single-items productImg-hoodie">${img}</div>
                    <div class="hoodie_name div-in-hoodie">${element.name}</div>
                    <div class="priceHoodie" style="display: flex; font-size: 18px;">
                    <div class="currentPrice-hoodie div-in-hoodie">Цена: ${element.currentPrice}₴</div>
                    <div class="newPrice-hoodie div-in-hoodie" style="text-decoration: line-through; margin-left:20px; color: #a1a0a0;">${element.previousPrice}₴</div>
                    </div>
                    <div class="like"><i class="fas fa-heart"></i></div>
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
                    <div class="hoodie-display">
                    <div class="color-hoodie div-in-hoodie">${element.color}</div>
                    <div class="brand-hoodie div-in-hoodie">${element.brand}</div>
                    <div class="parametrs-hoodie div-in-hoodie">${element.parametrs}</div>
                    <div class="description-hoodie div-in-hoodie">${element.description}</div>
                    </div>
                    </div>
        `
            let like = document.querySelector(`#${element.id} .like`);

            like.addEventListener('click',()=> {
                if (like.style.color == "black") {
                    like.style.color = "red"
                    console.log('test!')
                } else { like.style.color = "black" }
            })
        });
    })
    .then(()=> {
        let hoodieProd = document.querySelectorAll('.hoodie_prod');
        hoodieProd.forEach(item => {
            item.addEventListener('click', () => {
                let productNameHoodie = item.querySelector('.hoodie_name');
                let productPriceHoodie = item.querySelector('.currentPrice-hoodie');
                let productColorHoodie = item.querySelector('.color-hoodie');
                let productBrandHoodie = item.querySelector('.brand-hoodie');
                let productParametrsHoodie = item.querySelector('.parametrs-hoodie');
                let productDescriptionHoodie = item.querySelector('.description-hoodie');
                let productImgHoodie = item.querySelector('.image-hoodie');
                modalHoodie.innerHTML = `
                <img src="${productImgHoodie.src}" alt="" style="width: 400px;">
                <p><span>Название:</span>${productNameHoodie.innerText}</p>
                <p><span>Брэнд:</span>${productBrandHoodie.innerText}</p>
                <p><span>Цвет:</span>${productColorHoodie.innerText}</p>
                <p><span>Параметры:</span>${productParametrsHoodie.innerText}</p>
                <p><span>Описание:</span>${productDescriptionHoodie.innerText}</p>
                <p><span>Цена:</span>${productPriceHoodie.innerText}</p>
                <form style="padding: 25px 25px 70px 25px" id="formInModal" action="">
                    <label for="name">
                    <input type="text" name="name" id="name" placeholder="Ivan Ivanov">
                    </label>
                    <label for="phone">
                    <input type="text" name="phone" id="phone" placeholder="+3809966546453">
                    </label>
                    <input style="float:right; background-color: #000; color: #fff; border: none; padding: 10px 15px;" type="button" value="Заказать">
                </form>
                `
            })
        })
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