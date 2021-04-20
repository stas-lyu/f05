fetch('catalog.json')
    .then(response => response.json())
    .then(json => {
        console.log(json)
        let row = document.querySelector('.shirt-box')
        json.shirt.forEach(element => {

            row.innerHTML += `
            <div class=" col s12 m6">
        <div class="shirt_product">
        <div class="shirt_brand">Бренд : ${element.brand}</div>
        <div class="carusel">

        </div>
        <div class="shirt_name">Названые: ${element.name}</div>
        <div class="price"> Цена :
            <div class="oldPrice">${element.previousPrice}</div>
            <div class="newPrice">${element.currentPrice}</div>
        </div>
        </div>
        </div>
        `
            postImg(element.imageUrls)
        });
    })



let postImg = (array) => {
    let carusel = document.querySelectorAll('.carusel')
    array.forEach(src => {
        let img = document.createElement('img');
        img.style.width = '100px';
        img.style.height = '100px'
        img.src = src
        carusel.forEach(el => {
            el.appendChild(img);
        })
    })
}