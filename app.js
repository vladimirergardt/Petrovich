/*global fetch*/
"use strict";

let getProducts = () => {

let checkStatus = (response) => {
    if (response.status != 200) {
        return Promise.reject(new Error(response.statusText));
    }
    return Promise.resolve(response);
};

let toJson  = (response) => {
    return response.json();
};

let fetchFromJson = () => {

    return fetch(`./products.json`)
        .then(checkStatus)
        .then(toJson);
};

return fetchFromJson();
};

getProducts()
    .then((response) => {
        //console.log(response);
        let render = renderProductList(response);
        let node = document.querySelector("#products_section");
        node.innerHTML = render;
        //renderProduct(response);
    })
    .catch((error) => {
        console.log(`error`, error);
    });

let createProductTags = (productTags) => {
    let tagsList = productTags.split(`;\n`);
    let lastElemTagList = tagsList[tagsList.length - 1].split(`;`).join(``);
    tagsList.splice(tagsList.length - 1, 1);
    return tagsList.map((tag) => {
        return `
            <a href="#" class="url--link">${tag.split(`;`).join(``)}</a>`
    }) + `, <a href="#" class="url--link">${lastElemTagList}.</a>`;
};

let roundPrice = (price) => {
    return Math.round(price * 100) / 100;
};


let renderProduct = (product) => {
    /*let parent = document.body.querySelector(`.products_page`);
    let listItem = document.createElement(`div`);
    listItem.className = `product product_horizontal`;
    */

    //let product = products[1];
    let primaryImageUrl = product.primaryImageUrl;
    let title = product.title;
    let code = product.code;
    let assocProducts = product.assocProducts;
    let priceRetailAlt = product.priceRetailAlt;
    let priceGoldAlt = product.priceGoldAlt;
    let bonusAmount = product.bonusAmount;

    let unit = product.unit;
    //let unitRatio = product[0].unitRatio;
    let unitAlt = product.unitAlt;
    let unitRatioAlt = product.unitRatioAlt;

    /* unit": "упак.",
     "unitFull": "упаковка",
     "unitRatio": 1,
     "unitAlt": "м. кв.",
     "unitRatioAlt": 0.9615,
     "unitFullAlt": "метр квадратный",*/

        return /*listItem.innerHTML =*/ `
        <span class="product_code">Код: ${+code}</span>
        <div class="product_status_tooltip_container">
            <span class="product_status">Наличие</span>
        </div>                                
        <div class="product_photo">
            <a href="#" class="url--link product__link">
                <img src=${primaryImageUrl} width="220" height="220" >
            </a>                                    
        </div>
        <div class="product_description">
            <a href="#" class="product__link">${title}</a>
        </div>
        <div class="product_tags hidden-sm">
            <p>Могут понадобиться:</p>
            ${createProductTags(assocProducts)}
        </div>
        <div class="product_units">
            <div class="unit--wrapper">
                <div class="unit--select unit--active">
                    <p class="ng-binding">За м. кв.</p>
                </div>
                <div class="unit--select">
                    <p class="ng-binding">За упаковку</p>
                </div>
            </div>
        </div>
        <p class="product_price_club_card">
            <span class="product_price_club_card_text">По карте<br>клуба</span>
            <span class="goldPrice">${roundPrice(priceGoldAlt)}</span>
            <span class="rouble__i black__i">
                <svg version="1.0" id="rouble__b" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                   <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_black"></use>
                </svg>
             </span>
        </p>
        <p class="product_price_default">
            <span class="retailPrice">${roundPrice(priceRetailAlt)}</span>
            <span class="rouble__i black__i">
                <svg version="1.0" id="rouble__g" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                   <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_gray"></use>
                </svg>
             </span>
        </p>
        <div class="product_price_points">
            <p class="ng-binding">Можно купить за ${bonusAmount} балла</p>
        </div>
        <div class="list--unit-padd"></div>
        <div class="list--unit-desc">
            <div class="unit--info">
                <div class="unit--desc-i"></div>
                <div class="unit--desc-t">
                    <p>
                        <span class="ng-binding">Продается упаковками:</span>
                        <span class="unit--infoInn">1 ${unit} = ${roundPrice(unitRatioAlt)} ${unitAlt}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="product__wrapper">
            <div class="product_count_wrapper">
                <div class="stepper">
                    <input class="product__count stepper-input" type="text" value="1">
                    <span class="stepper-arrow up"></span>
                    <span class="stepper-arrow down"></span>                                            
                </div>
            </div>
            <span class="btn btn_cart" data-url="/cart/" data-product-id="9bf0afd7-5190-11e5-b9a9-00259036a192">
                <svg class="ic ic_cart">
                   <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart"></use>
                </svg>
                <span class="ng-binding">В корзину</span>
            </span>
        </div>
       
        `;
    //parent.appendChild(listItem);

};

let renderProductList = (products) => {
    return `
        <div class="products_page pg_0">
            ${products.map((product) => {
            return `
                <div class="product product_horizontal">
                    ${renderProduct(product)}
                </div>
            `        
    }).join()};
        </div>
    `
};






//renderProduct();
