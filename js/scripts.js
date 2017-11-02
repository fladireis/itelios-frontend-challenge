/**
 * Itelios 
 * 
 * Front-End Challenge 
 * 
 * 1.0 | Fladir
 */
var getProductsData = new XMLHttpRequest();

getProductsData.onreadystatechange = function() {

    //checking for when response is received from server
    if (getProductsData.readyState === 4) {

        //trim name of product
        function truncate(string, limit) {
            if (string.length > limit) {
                limit--;
                last = string.substr(limit - 1, 1);
                while (last != ' ' && limit > 0) {
                    limit--;
                    last = string.substr(limit - 1, 1);
                }
                last = string.substr(limit - 2, 1);
                if (last == ',' || last == ';' || last == ':') {
                    string = string.substr(0, limit - 2) + '...';
                } else if (last == '.' || last == '?' || last == '!') {
                    string = string.substr(0, limit - 1);
                } else {
                    string = string.substr(0, limit - 1) + '...';
                }
            }
            return string;
        }

        //get data of visited product
        var productInfo = JSON.parse(getProductsData.responseText)[0];
        var visitedProduct = productInfo.data.item,
            visitedProductId = visitedProduct.businessId,
            visitedProductName = visitedProduct.name,
            visitedProductImage = visitedProduct.imageName,
            visitedProductPrice = visitedProduct.price,
            visitedProductOldPrice = visitedProduct.oldPrice,
            visitedProductInfo = visitedProduct.productInfo.paymentConditions;

        //create tags of visited product informations
        var visitedImage = '<img src="' + visitedProductImage + '" />';
        var visitedName = '<p class="product-name">' + truncate(visitedProductName, 80) + '</p>';

        if (visitedProductOldPrice != null) {
            oldPrice = '<span class="old-product-price">' + visitedProduct.oldPrice + '</span>';
        } else {
            oldPrice = '';
        }

        var visitedPrice = '<p class="product-price">' + oldPrice + ' Por: <span class="current-product-price">' + visitedProductPrice + '</span> </p>';
        var visitedProductInfo = visitedProduct.productInfo.paymentConditions,
            newProductInfoStart = visitedProductInfo.replace('ou até', 'ou até <span>'),
            newProductInfo = newProductInfoStart.replace(' sem juros', '</span> sem juros'),
            visitedproductInfoHtml = '<p class="product-pay-conditions">' + newProductInfo + '</p>';
        var visitedButton = '<a href="' + document.location.origin + '/itelios-challenge/' + visitedProductId + '" class="product-link"><span>adicionar ao carrinho</span><i class="material-icons">add_shopping_cart</i></a>';

        visitedProductHtml = '<div>' + visitedImage + visitedName + visitedPrice + visitedproductInfoHtml + visitedButton + '</div>';

        //insert product in visited area
        document.getElementById("visited").innerHTML = visitedProductHtml;


        //get data of recommended products
        var recommendations = productInfo.data.recommendation;
        var recomendationsProductHtml = '';
        for (var i = 0; i < recommendations.length; i++) {
            var recommendedProductId = recommendations[i].businessId,
                recommendedProductName = recommendations[i].name,
                recommendedProductImage = recommendations[i].imageName,
                recommendedProductPrice = recommendations[i].price,
                recommendedProductOldPrice = recommendations[i].oldPrice,
                recommendedProductInfo = recommendations[i].productInfo.paymentConditions;

        //create tags of recommended product informations
            var recommendedImage = '<img src="' + recommendedProductImage + '" />';
            var recommendedName = '<p class="product-name">' + truncate(recommendedProductName, 80) + '</p>';

            if (recommendedProductOldPrice != null) {
                oldPrice = '<span class="old-product-price">' + recommendations[i].oldPrice + '</span>';
            } else {
                oldPrice = '';
            }

            var recommendedPrice = '<p class="product-price">' + oldPrice + ' Por: <span class="current-product-price">' + recommendedProductPrice + '</span> </p>';
            var recommendedProductInfo = recommendations[i].productInfo.paymentConditions,
                newProductInfoStart = recommendedProductInfo.replace('ou até', 'ou até <span>'),
                newProductInfo = newProductInfoStart.replace(' sem juros', '</span> sem juros'),
                recommendedInfoHtml = '<p class="product-pay-conditions">' + newProductInfo + '</p>';
            var recommendedButton = '<a href="' + document.location.origin + '/itelios-challenge/' + recommendedProductId + '" class="product-link"><span>adicionar ao carrinho</span><i class="material-icons">add_shopping_cart</i></a>';

            recomendationsProductHtml += '<div class="product-item">' + recommendedImage + recommendedName + recommendedPrice + recommendedInfoHtml + recommendedButton + '</div>';
        }
        //insert products in recommended carousel
        document.getElementById("recommended").innerHTML = recomendationsProductHtml;

        //Tiny Slider settings
        var slider = tns({
            container: '.recommended-carousel',
            autoplay: true,
            controls: false,
            autoplayButtonOutput: false,
            speed: 1200,
            autoplayHoverPause: true,
			slideBy: 'page',
            responsive: {
             980: {
					items: 3
				},
             760: {
					items: 2
				},
				480: {
					items: 1
				}
            }
            

        });

		//wrap carousel nav pagination
		var el = document.querySelector('.tns-nav');
		var wrapper = document.createElement('div');
		wrapper.className = "tns-nav-wrapper";
		el.parentNode.insertBefore(wrapper, el);
		wrapper.appendChild(el);
    }
};

getProductsData.open("GET", "products.json", true);
getProductsData.send();

