let jacket = document.querySelector('.jacket')
let jacketProd = document.querySelector('.jacket_prod')

$(document).ready(function(){
    let card = []
})
fetch('catalog.json')
    .then(response => response.json())
    .then(json => {
        json.jacket.forEach(item => {

            jacket.innerHTML += `
            <div class="col s12 m4">
            <div class="jacket_prod" id= '${item.id}'>                    
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
                    <div class="like"><i class="fas fa-heart"></i></div>
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Перейти к покупке</a>
                    </div>
                    </div>
        `
            postImg(item.imageUrls)
        });
        $('.modal').modal();
        let jacketProd = document.querySelectorAll(".jacket_prod")
        let modalContent = document.querySelector(".modal-content");
        jacketProd.forEach((item) => {
            item.addEventListener("click", () => {
                let jacket_name = item.querySelector(".jacket_name").innerText;
                let carousel = item.querySelector(".carousel").innerHTML;
                let oldPrice = item.querySelector(".oldPrice").innerText;
                let newprice = item.querySelector(".newprice").innerText;
                let categories = item.querySelector(".jacket_categories").innerHTML;
                let quantity = item.querySelector(".jacket_quantity").innerText;
                let color = item.querySelector(".jacket_color").innerText;
                jacketProd.id = item.id
            //     modalContent.innerHTML = `
            //     <div class="jacket_name">Бренд : ${jacket_name}</div>
            //     <img src="${carousel}" alt="">
            // <div>
            //         <div class="jacket_price">Цена :
            //         <div class="oldPrice">${oldPrice}</div>
            //         <div class="newprice">${newprice}</div>
            //         <div class="jacket_categories">Категория:${categories}</div>
            //         <div class="jacket_quantity">Количество:${quantity}</div>
            //         <div class="jacket_color">Цвета в наличии: ${color}</div>
            //         </div>
            //
            //     `

            })
            let like = document.querySelector(`#${item.id} .like`);

                like.addEventListener("click",(e)=>{
                    if (like.style.color == "black") {
                        like.style.color = "red"
                    } else { like.style.color = "black" }
                })
        })

    }).then(() => {
    let slick = $('.carousel');

    slick.slick({
        lazyLoad: 'progressive',
        dots: true,
        arrows: false,
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


