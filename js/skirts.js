$(document).ready(function() {

    let renderSkirts = document.querySelector('#renderSkirts');

fetch('catalog.json')
    .then(response => response.json())
    .then(json => {
        json.skirts.forEach((el) =>{

            let productSkr = document.createElement('div');
            let productSkirts = document.createElement('div');
            let slider = document.createElement('div');

            let skirtContainer = document.createElement('div');
            skirtContainer.classList.add('skirtContainer');
            let skirtsDetails = document.createElement('div');
            skirtsDetails.classList.add('skirtsDetails');


            productSkirts.classList.add('descriptionSkirts');
            slider.classList.add('single-itemSkirts');
            productSkr.classList.add('skirtInfo');

            productSkr.append(productSkirts, skirtContainer);
            skirtContainer.append(slider, skirtsDetails)
            renderSkirts.append(productSkr);

            productSkirts.innerHTML += `
            <p class="skirt-name" style="font-weight: lighter">${el.name}</p>
            <p class="skirt-brand"><span style="font-weight: bold">Brand: </span>${el.brand}</p>
            <p class="skirt-currPrice" style="font-weight: bold; font-size: 20px">${el.currentPrice} ₴</p>            
            <p class="skirt-prevPrice" style="text-decoration: line-through">${el.previousPrice} ₴</p>
            <p class="skirt-color">Цвет: ${el.color}</p>
            <p class="skirt-param">Размеры: ${el.parametrs[0]},${el.parametrs[1]},${el.parametrs[2]}</p>
            <p class="skirt-quantity">Наличие: ${el.quantity} шт.</p> 
            <p class="description"><span style="font-weight: bold">ОПИСАНИЕ</span><br></br>${el.description}</p>
        `
            el.imageUrls.forEach((url) => {
                let imgSkirts = document.createElement('img');
                imgSkirts.src = 'assets/img/placeholder.jpg';
                imgSkirts.setAttribute('data-lazy', url);
                slider.append(imgSkirts);
            })
            skirtsDetails.innerHTML = `
             <p class="skirt-name">${el.name}</p>
             <div class="priceSkirts">
                  <p class="skirt-currPrice">${el.currentPrice} ₴  </p>  
                  <p class="skirt-prevPrice" style="opacity: 0.7;text-decoration: line-through; margin-left: 20px">  ${el.previousPrice} ₴</p>  
             </div>
            `
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

});
