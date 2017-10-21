		    var getProductsData = new XMLHttpRequest();

    getProductsData.onreadystatechange = function() {
		
        //checking for when response is received from server
        if(getProductsData.readyState === 4) {
			function truncate(string){
   if (string.length > 80)
      return string.substring(0,89)+'...';
   else
      return string;
};
		
		
		
		var productInfo = JSON.parse(getProductsData.responseText)[0];
		var visitedProduct = productInfo.data.item,
		visitedProductId = visitedProduct.businessId,
		visitedProductName = visitedProduct.name,
		visitedProductImage = visitedProduct.imageName,
		visitedProductPrice = visitedProduct.price,
		visitedProductOldPrice = visitedProduct.oldPrice,
		visitedProductInfo = visitedProduct.productInfo.paymentConditions;
		
		
		var visitedImage = '<img src="' +visitedProductImage+ '" />';
		var visitedName = '<p class="product-name">'+ truncate(visitedProductName) +'</p>';
		
		if (visitedProductOldPrice != null){
			oldPrice = '<span class="old-product-price">'+ visitedProduct.oldPrice +'</span>';
		} else {
			oldPrice = '';
		}

		
		var visitedPrice = '<p class="product-price">'+ oldPrice +' Por: <span class="current-product-price">'+ visitedProductPrice +'</span> </p>';
		
		
		var visitedProductInfo = visitedProduct.productInfo.paymentConditions,
			newProductInfoStart = visitedProductInfo.replace('ou até', 'ou até <span>'),
			newProductInfo = newProductInfoStart.replace(' sem juros', '</span> sem juros'),
			visitedproductInfoHtml = '<p class="product-pay-conditions">' + newProductInfo + '</p>';
		
		
		
		var visitedButton = '<a href="' + document.location.origin + '/itelios-challenge/' + visitedProductId + '" class="product-link"><span>adicionar ao carrinho</span><i class="material-icons">add_shopping_cart</i></a>';
		
		
		
		visitedProductHtml = '<a class="product-anchor" href="#">' + visitedImage + visitedName + visitedPrice + visitedproductInfoHtml + visitedButton + '</a>';


		document.getElementById("visited").innerHTML = visitedProductHtml;
		
		
		
		
		
		
		
		
		
		/**
		 * Get product recomendations
		 */
		var recommendations = productInfo.data.recommendation;
		var recomendationsProductHtml = '';
		// Loop through products and render HTML
		for (var i = 0; i < recommendations.length; i++) {
			// get individual values from products list
			var recommendedProductId = recommendations[i].businessId,
		recommendedProductName = recommendations[i].name,
		recommendedProductImage = recommendations[i].imageName,
		recommendedProductPrice = recommendations[i].price,
		recommendedProductOldPrice = recommendations[i].oldPrice,
		recommendedProductInfo = recommendations[i].productInfo.paymentConditions;
		
		
		var recommendedImage = '<img src="' +recommendedProductImage+ '" />';
		var recommendedName = '<p class="product-name">'+ truncate(recommendedProductName) +'</p>';
		
		if (recommendedProductOldPrice != null){
		oldPrice = '<span class="old-product-price">'+ recommendations[i].oldPrice +'</span>';
		} else {
			oldPrice = '';
		}
		
		
		var recommendedPrice = '<p class="product-price">' + oldPrice + ' Por: <span class="current-product-price">'+ recommendedProductPrice +'</span> </p>';
		
		
		var recommendedProductInfo = recommendations[i].productInfo.paymentConditions,
			newProductInfoStart = recommendedProductInfo.replace('ou até', 'ou até <span>'),
			newProductInfo = newProductInfoStart.replace(' sem juros', '</span> sem juros'),
			recommendedInfoHtml = '<p class="product-pay-conditions">' + newProductInfo + '</p>';
		
		
		
		var recommendedButton = '<a href="' + document.location.origin + '/itelios-challenge/' + recommendedProductId + '" class="product-link"><span>adicionar ao carrinho</span><i class="material-icons">add_shopping_cart</i></a>';
		
		
		
		recomendationsProductHtml += '<div class="product-item"><a class="product-anchor" href="#">' + recommendedImage + recommendedName + recommendedPrice + recommendedInfoHtml + recommendedButton + '</a></div>';
		}
		// insert products in the recommendations-list
		document.getElementById("recommended").innerHTML = recomendationsProductHtml;
		
		
		
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

