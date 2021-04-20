fetch("catalog.json")
    .then(response =>
        response.json()
    )
    .then(json => {
        console.log(json)
        let render = document.querySelector("#render")
        json.jacket.forEach(item => {
            let img = "";
            let text = "";
            let size = "";

            item.imageUrls.forEach((prod) => {
                img += `<img src="${prod}"/>`
            });
            item.description.forEach((info)=>{
                text += `<div class="">${info}</div>`
            })
            item.parametrs.forEach((argument)=>{
                size += `<div class="">${argument}</div>`
            })

            render.innerHTML += `
                <div class="jacket_prod">
                    <div class="jacket_name">${item.name}</div>
                    <div class="jacket_price">
                    <div class="oldPrice">${item.currentPrice}</div>
                    <div class="new_price">${item.previousPrice}</div>
                    </div>
                    <div class="jacket_categories">${item.categories}</div>
                    <div class="jacket_carusel">
                    ${img}</div>
                    <div class="jacket_quantity">${item.quantity}</div>
                    <div class="jacket_color">${item.color}</div>
                    <div class="jacket_productUrl">${item.productUrl}</div>
                    <div class="jacket_brand">${item.brand}</div>
                    <div class="jacket_parametrs">${size}</div>
                    <div class="jacket_description">${text}</div>
        `
        });
    });