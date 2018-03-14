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
        node.insertAdjacentHTML("afterBegin", render);
        checkCart();
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

    let primaryImageUrl = product.primaryImageUrl;
    let title = product.title;
    let code = product.code;
    let assocProducts = product.assocProducts;
    let priceRetailAlt = product.priceRetailAlt;
    let priceGoldAlt = product.priceGoldAlt;
    let priceGold = product.priceGold;
    let priceRetail = product.priceRetail;
    let bonusAmount = Math.round(Math.random() * 30000) / 100;
    let unit = product.unit;
    let unitAlt = product.unitAlt;
    let unitRatioAlt = product.unitRatioAlt;
    let productId = product.productId;

    return `
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
            <span class="goldPrice view_price">${roundPrice(priceGoldAlt)}</span>
            <span class="goldPrice">${roundPrice(priceGold)}</span>
            <span class="rouble__i black__i">
                <svg version="1.0" id="rouble__b" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                   <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_black"></use>
                </svg>
             </span>
        </p>
        <p class="product_price_default">
            <span class="retailPrice view_price">${roundPrice(priceRetailAlt)}</span>
            <span class="retailPrice">${roundPrice(priceRetail)}</span>
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
                        <span class="unit--infoInn"><i class="infoInn_count">1</i> ${unit} = <i class="infoInn_roundPrice" data-round-price = "${roundPrice(unitRatioAlt)}">${roundPrice(unitRatioAlt)}</i> ${unitAlt}</span>
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
            <span class="btn btn_cart" data-url="/cart/" data-product-id="${productId}">
                <svg class="ic ic_cart">
                   <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart"></use>
                </svg>
                <span class="ng-binding">В корзину</span>
            </span>
        </div>   
    `;
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
            }).join(``)}
        </div>
    `
};

let viewFirstPage = () => {
    let maxProductInPage = 10;
    let productCollection = document.querySelectorAll(`.product_horizontal`);
    for (let i = 0; i < productCollection.length; i++) {
        if  (i < maxProductInPage){
            productCollection[i].classList.add(`view`);
        }
    }
};

setTimeout(() => {
    viewFirstPage();
}, 400);

let createButtonSlide = () => {
    let countProducts = document.querySelectorAll(`.product_horizontal`).length;
    let maxProductInPage = 10;
    let countPages = Math.ceil(countProducts / maxProductInPage);

    let buttonSlideHtml =
        `
        <li class="pagination_item link_start ng-scope">
            <span class="button_slide start"> << </span>
        </li>
        <li class="pagination_item link_prev ng-scope">
            <span class="button_slide prev"> < </span>
        </li>
        `;

    for (let i = 1; i <= countPages; i++) {
        buttonSlideHtml +=
            `
            <li class="pagination_item pagination__count">
                    <span class="button_slide page" data-page = "${i}" >${i}</span>
            </li>
            `;
    }

    buttonSlideHtml +=
        `
        <li class="pagination_item link_next ng-scope">
            <span class="button_slide next"> > </span>
        </li>
        <li class="pagination_item link_end ng-scope">
            <span class="button_slide end"> >> </span>
        </li>
        `;

    return buttonSlideHtml;
};

setTimeout(() => {

    let productCollection = document.body.querySelectorAll(`.product_horizontal`);

    [].map.call(productCollection, (product) => {
        let goldPriceAlt = product.querySelectorAll(`.goldPrice`)[0].textContent;
        let goldPrice = product.querySelectorAll(`.goldPrice`)[1].textContent;
        let unitSelectAlt = product.querySelectorAll(`.unit--select`)[0];
        let unitSelect = product.querySelectorAll(`.unit--select`)[1];
        let listInfo = product.querySelectorAll(`.list--unit-desc`);

        if (goldPriceAlt === goldPrice) {
            unitSelectAlt.style.display = `none`;
            unitSelect.classList.add(`unit--active`);
            listInfo[0].style.display = `none`;
        }
    });
}, 400);


let slideAction = (event) => {

    let e = event || window.event;
    let target = e.target;

    let productCollection = document.querySelectorAll(`.product_horizontal`);

    let action = (firstProductInPage, lastProductInPage) => {

        for (let i = 0; i < productCollection.length; i++) {
            productCollection[i].classList.remove(`view`);
        }

        for (let i = firstProductInPage; i < lastProductInPage; i++) {
            if (productCollection[i]) {
                productCollection[i].classList.add(`view`);
            }
        }
    };

    let getActiveElement = () => {
        let count = 0;
        for (let i = 0; i < productCollection.length; i++) {
            count++;
            if (productCollection[i].classList.contains(`view`)) break;
        }
        return count;
    };

    if (target.className == `button_slide start`) {
        let firstProductInPage = 0;
        let lastProductInPage = 10;
        action(firstProductInPage, lastProductInPage);
    }

    if (target.className == `button_slide page`) {
        let lastProductInPage = target.dataset.page * 10;
        let firstProductInPage = lastProductInPage - 10;
        action(firstProductInPage, lastProductInPage);
    }


    if (target.className == `button_slide end`) {
        let lastProductInPage = Math.ceil(productCollection.length / 10) * 10;
        let firstProductInPage = lastProductInPage - 10;
        action(firstProductInPage, lastProductInPage)
    }

    let activeCollection = document.body.querySelectorAll(`.view`);

    if (target.className == `button_slide prev`) {

        let firstElemList = productCollection[0];
        if (firstElemList.classList == `product product_horizontal view`) {
            return false;
        }

        let first = [].map.call(activeCollection, (activeElem) => {
            return activeElem.previousElementSibling;
        });

        for (let i = 0; i < productCollection.length; i++) {
            productCollection[i].classList.remove(`view`);
        }

        let firstElementViewList = first[0];
        firstElementViewList.classList.add(`view`);

        let count = getActiveElement();
        let firstProductInPage = count - 10;
        let lastProductInPage = firstProductInPage + 10;
        action(firstProductInPage, lastProductInPage);
    }

    if (target.className == `button_slide next`) {

        let lastElemList = productCollection[productCollection.length - 1];
        if (lastElemList.classList == `product product_horizontal view`) {
            return false;
        }

        let last = [].map.call(activeCollection, (activeElem) => {
            return activeElem.nextElementSibling;
        });

        for (let i = 0; i < productCollection.length; i++) {
            productCollection[i].classList.remove(`view`);
        }

        let lastElementViewList = last[last.length - 1];
        lastElementViewList.classList.add(`view`);

        let count = getActiveElement();
        let firstProductInPage = count - 1;
        let lastProductInPage = firstProductInPage + 10;
        action(firstProductInPage, lastProductInPage);
    }

    let active = () => {

        let firstActiveElement = Math.ceil(getActiveElement() / 10) ;
        let sliderButtons = document.body.querySelectorAll(`.page`);

        [].map.call(sliderButtons, (button) => {
            if (button.parentNode.classList.contains(`pagination_item_current`)) {
                button.parentNode.classList.remove(`pagination_item_current`);
            }
        });

        [].map.call(sliderButtons, (button) => {
            if (firstActiveElement == button.dataset.page) {
                return button.parentNode.classList.add(`pagination_item_current`);
            }
        });
    };

    active();
    window.scrollTo(0, 0);
};

let cart = {};

let checkCart = () => {
    if (localStorage.getItem(`cart`) != null) {
        cart = JSON.parse(localStorage.getItem(`cart`));
    }
};



let productAction = (event) => {
    let e = event || window.event;
    let target = e.target;

    if (target.className == `stepper-arrow up`) {
        let stepper = target.parentNode;
        let input = stepper.querySelector(`.stepper-input`);
        input.setAttribute(`value`, input.value++);

        let targetProduct = stepper.parentNode.parentNode.parentNode;
        let infoInnCount = targetProduct.querySelector(`.infoInn_count`);
        infoInnCount.innerHTML = input.value;
        let infoInnRoundPrice = targetProduct.querySelector(`.infoInn_roundPrice`);
        let dataRoundPrice = infoInnRoundPrice.dataset.roundPrice;
        let roundPrice = Math.round( (dataRoundPrice * input.value) * 100) / 100;
        infoInnRoundPrice.innerHTML = `${roundPrice}`;
    }

    if (target.className == `stepper-arrow down`) {
        let stepper = target.parentNode;
        let input = stepper.querySelector(`.stepper-input`);
        input.setAttribute(`value`, input.value--);
        if (input.value <= 1) input.value = 1;

        let targetProduct = stepper.parentNode.parentNode.parentNode;
        let infoInnCount = targetProduct.querySelector(`.infoInn_count`);
        infoInnCount.innerHTML = input.value;
        let infoInnRoundPrice = targetProduct.querySelector(`.infoInn_roundPrice`);
        let dataRoundPrice = infoInnRoundPrice.dataset.roundPrice;
        let countRoundPrice = infoInnRoundPrice.textContent;

        if (countRoundPrice > dataRoundPrice) {
            let roundPrice = Math.round( (countRoundPrice - dataRoundPrice) * 100) / 100;
            infoInnRoundPrice.innerHTML = `${roundPrice}`;
        }
    }

    let clickChangePrice = () => {

        let targetProduct = target.parentNode.parentNode;
        target.parentNode.classList.add(`unit--active`);
        if (target.parentNode.classList.contains(`unit--active`)) {
            if (target.parentNode.previousElementSibling){
                target.parentNode.previousElementSibling.classList.remove(`unit--active`);
            } else  {
                target.parentNode.nextElementSibling.classList.remove(`unit--active`);
            }
        }
    };

    let changePrice = () => {

        let targetProduct = target.parentNode.parentNode;

        let targetProductHorizontal = targetProduct.parentNode.parentNode;
        let targetGoldPrice = targetProductHorizontal.querySelectorAll(`.goldPrice`);
        let goldPriceAlt = targetGoldPrice[0];
        let goldPrice = targetGoldPrice[1];

        let targetRetailPrice = targetProductHorizontal.querySelectorAll(`.retailPrice`);
        let retailPriceAlt = targetRetailPrice[0];
        let retailPrice = targetRetailPrice[1];

        return {
            goldPriceAlt,
            goldPrice,
            retailPriceAlt,
            retailPrice
        };

    };

    if (target.innerText == `За упаковку`) {

        clickChangePrice();
        let price = changePrice();

        if (!price.goldPrice.classList.contains(`view_price`)){
            price.goldPrice.classList.add(`view_price`);
            price.retailPrice.classList.add(`view_price`);
            if (price.goldPriceAlt.classList.contains(`view_price`)) {
                price.goldPriceAlt.classList.remove(`view_price`);
                price.retailPriceAlt.classList.remove(`view_price`);
            }
        }
    }

    if (target.innerText == `За м. кв.`) {

        clickChangePrice();
        let price = changePrice();

        if (!price.goldPriceAlt.classList.contains(`view_price`)){
            price.goldPriceAlt.classList.add(`view_price`);
            price.retailPriceAlt.classList.add(`view_price`);
            if (price.goldPrice.classList.contains(`view_price`)) {
                price.goldPrice.classList.remove(`view_price`);
                price.retailPrice.classList.remove(`view_price`);
            }
        }
    }

    if (target.className == `btn btn_cart`
        || target.className.baseVal == `ic ic_cart`
        || target.textContent == `В корзину`) {

        let product = target;
        while (true) {
            if (product.className == `product product_horizontal view`) break;
            product = product.parentNode;
        }

        let productId = product.querySelector(`.btn_cart`).dataset.productId;
        let amountProduct = product.querySelector(`.product__count`).value;

        if (cart[productId] != undefined){
            cart[productId] += +amountProduct;
        } else {
            cart[productId] = +amountProduct;
        }

        localStorage.setItem(`cart`, JSON.stringify(cart));
        console.log(cart);
    }


};


let insertButtonSlide = (html) => {
    let slide = document.body.querySelector(`.pagination_links`);
    slide.insertAdjacentHTML(`afterBegin`, html);
    slide.addEventListener(`click`, slideAction, true);
    let productsSection = document.body.querySelector(`#products_section`);
    productsSection.addEventListener(`click`, productAction, true);
};


setTimeout(() => {
    let buttonSlider = createButtonSlide();
    insertButtonSlide(buttonSlider);
    let firstSlideButton = document.body.querySelectorAll(`.pagination__count`)[0];
    firstSlideButton.classList.add(`pagination_item_current`);
}, 400);














