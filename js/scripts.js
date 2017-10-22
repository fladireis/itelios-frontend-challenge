/**
 * Itelios 
 * 
 * Front-End Challenge 
 * 
 * 1.0 | Fladir
 */
var getProductsData = new XMLHttpRequest();

getProductsData.onreadystatechange = function() {

    //checando a resposta do servidor
    if (getProductsData.readyState === 4) {

        //limitar o tamanho do nome do produto
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

        //obter dados dos produtos visitados
        var productInfo = JSON.parse(getProductsData.responseText)[0];
        var visitedProduct = productInfo.data.item,
            visitedProductId = visitedProduct.businessId,
            visitedProductName = visitedProduct.name,
            visitedProductImage = visitedProduct.imageName,
            visitedProductPrice = visitedProduct.price,
            visitedProductOldPrice = visitedProduct.oldPrice,
            visitedProductInfo = visitedProduct.productInfo.paymentConditions;

        //criar tags das informações dos produtos visitados
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

        visitedProductHtml = '<a class="product-anchor" href="#">' + visitedImage + visitedName + visitedPrice + visitedproductInfoHtml + visitedButton + '</a>';

        //inserir produtos na área de produtos visitados
        document.getElementById("visited").innerHTML = visitedProductHtml;


        //obter dados dos produtos recomendados
        var recommendations = productInfo.data.recommendation;
        var recomendationsProductHtml = '';
        for (var i = 0; i < recommendations.length; i++) {
            var recommendedProductId = recommendations[i].businessId,
                recommendedProductName = recommendations[i].name,
                recommendedProductImage = recommendations[i].imageName,
                recommendedProductPrice = recommendations[i].price,
                recommendedProductOldPrice = recommendations[i].oldPrice,
                recommendedProductInfo = recommendations[i].productInfo.paymentConditions;

            //criar tags das informações dos produtos recomendados
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

            recomendationsProductHtml += '<div class="product-item"><a class="product-anchor" href="#">' + recommendedImage + recommendedName + recommendedPrice + recommendedInfoHtml + recommendedButton + '</a></div>';
        }
        //inserir produtos na área de produtos recomendados
        document.getElementById("recommended").innerHTML = recomendationsProductHtml;

        //configurações do carrossel
        var slider = tns({
            container: '.recommended-carousel',
            autoplay: true,
            controls: false,
            autoplayButtonOutput: false,
            speed: 700,
            autoplayHoverPause: true,
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
            },
            slideBy: 'page'

        });
    }
};

getProductsData.open("GET", "products.json", true);
getProductsData.send();