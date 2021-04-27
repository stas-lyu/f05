$(document).ready(function() {

    let renderSkirts = document.querySelector('.skirts');

    fetch('catalog.json')
        .then(response => response.json())
        .then(json => {
            json.skirts.forEach((el) =>{

                let productSkirts = document.createElement('div');
                let slider = document.createElement('div');
                let skirtContainer = document.createElement('div');

                skirtContainer.classList.add('skirtContainer','col', 's12', 'm4');
                productSkirts.classList.add('descriptionSkirts');
                slider.classList.add('single-itemSkirts');

                skirtContainer.append(slider, productSkirts);
                renderSkirts.append(skirtContainer);

                productSkirts.innerHTML += `
            <p class="skirt-name" style="font-weight: lighter">${el.name}</p>
            <div class="priceSkirts">
            <p class="skirt-currPrice" style="font-weight: bold">${el.currentPrice}₴</p>            
            <p class="skirt-prevPrice" style="opacity: 0.7;text-decoration: line-through; margin-left: 10px;font-weight: 300;">${el.previousPrice}₴</p>
            <a class="waves-effect waves-light btn modal-trigger" href="#modal1" style="margin-left: 20px">Заказать</a>  
            </div>
            <p class="skirt-brand">${el.brand}</p>
            <p class="skirt-color">Цвет: ${el.color}</p>
            <div class="skirt-param"><p style="font-weight: bold; margin-bottom: 10px">Размеры: </p>
            <div class="sizeSkirt">
            <div class="sizes">${el.parametrs[0]}</div>
            <div class="sizes">${el.parametrs[1]}</div>
            <div class="sizes">${el.parametrs[2]}</div>
            </div>
            </div>
            <p class="skirt-quantity">Наличие: ${el.quantity} шт.</p> 
            <p class="skirt-description">${el.description}</p>
            `
                el.imageUrls.forEach((url) => {
                    let imgSkirts = document.createElement('img');
                    imgSkirts.classList.add('skirtImage');
                    imgSkirts.src = url;
                    imgSkirts.setAttribute('data-lazy', url);
                    slider.append(imgSkirts);
                })
            });
        })

        .then(() =>{
            let slick = $('.single-itemSkirts');
            slick.slick({
                lazyLoad: 'progressive',
                dots: true,
                arrows: false,
            });
        })

        .then(()=>{

            let modal = document.querySelector('.modal-content');
            let skirtContainerTwo = document.querySelectorAll('.skirtContainer');

            skirtContainerTwo.forEach((link)=>{
                link.addEventListener('click', ()=>{
                    let skirtPrice = link.querySelector('.skirt-currPrice').innerText;
                    let skirtName = link.querySelector('.skirt-name').innerText;
                    let skirtBrand = link.querySelector('.skirt-brand').innerText;
                    let skirtPrevPrice = link.querySelector('.skirt-prevPrice').innerText;
                    let skirtDescr = link.querySelector('.skirt-description').innerText;
                    let skirtColor = link.querySelector('.skirt-color').innerText;
                    let skirtParam = link.querySelector('.skirt-param').innerHTML;
                    let skirtQuanity = link.querySelector('.skirt-quantity').innerText;

                    let modalSkirtGallery = link.querySelector('.single-itemSkirts').innerHTML;
                    let modalSkirtImg = link.querySelector('.skirtImage').src;

                    modal.innerHTML =`
                <div class="modalSkirt row">
                 <div class="col s12 m6">
                <img class="modalImgSkirt" src="${modalSkirtImg}" alt="Product"></div>
                <div class="modalDescr col s12 m6">
                     <p style="font-weight: lighter;font-size: 30px;">${skirtName}</p>
                     <p><span style="font-weight: bold">Brand: </span>${skirtBrand}</p>
                     <p style="font-weight: bold; font-size: 30px; margin-bottom: 0">${skirtPrice}</p>
                     <p style="opacity: 0.7;text-decoration: line-through;margin-top: 0">${skirtPrevPrice}</p>
                     <p><span style="font-weight: bold">ОПИСАНИЕ</span><br></br>${skirtDescr}</p>
                     <p>${skirtColor}</p>
                     <div>${skirtParam}</div>
                     <p>${skirtQuanity}</p>
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

});


