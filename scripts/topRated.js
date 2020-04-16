let gridTopRated = document.querySelector('.gridTopRated');
let topRated = document.querySelector('#topRated');
let btnLoadMore = document.querySelector('.loadMore');
btnLoadMore.addEventListener('click', loadMoreTopItems);

var pageSize = 6;
var page = 1; //prikazi prvih 6 podataka
fetchData();

pageSize = 3 //u buduce uvijek ucitavaj samo po tri! jedino prvi put 6.
page = 2; // u prvom sledecem pozicu inkrementiracemo i bice na stranici 3 kao sto treba

//api poziv je takav da:
//vraca nam proizvode iz kategorije games, music, movie
//samo proizvodi sa ocjenom izmedju 4 i 5
//osim toga, onSale = true, sto znaci da su svi na akciji
//koristimo i paginaciju, pagesize = 6 inicijalno, a kasnije ce biti po 3

async function fetchData(){
	url = `https://api.bestbuy.com/v1/products(shortDescription=*&customerReviewAverage>4&customerReviewAverage<5&onSale=true&(type=game|type=movie|type=music))?apiKey=${apiKey}&format=json&show=sku,name,shortDescription,image,regularPrice,salePrice,releaseDate,type,customerReviewAverage,onSale&sort=customerReviewAverage.desc&pageSize=${pageSize}&page=${page}`;
	try{
		let response = await fetch(url);
		let json = await response.json();
		fillTopRated(json);
	}
	catch(err){
		alert(err);
	} 
}

function fillTopRated(json){
	//u json.products je niz objekata koji nama trebaju
	let topRatedItems = json.products;
	console.log(topRatedItems);
	topRatedItems.forEach(item => {
		let name = item.name;
         
        let shortDescription = item.shortDescription;
        let image = item.image;
        let regularPrice = item.regularPrice;
        let salePrice = item.salePrice;salePrice;
        let releaseDate = item.releaseDate;
        let type = item.type;
        let customerReviewAverage = item.customerReviewAverage;
        appendNewTopRatedItem(name, image, shortDescription, shortDescription, regularPrice, salePrice, releaseDate, type,customerReviewAverage);
	})
}


function appendNewTopRatedItem(name, image, shortDescription, longDescription, regularPrice, salePrice, releaseDate, type,customerReviewAverage){

	let item = elWithClass('div', 'topRatedItem' );
	let itemInfos = elWithClass('div', "topRatedInfo");

	let img = elWithClass('img', 'imgTopRatedItem');
	img.src=image;
	img.addEventListener('click', function(){

setSliderModalValues(image, name, longDescription, customerReviewAverage, type, regularPrice, salePrice, releaseDate)		

	});


	let title = elWithClass('p', "titleTopRatedItem");
	title.innerText = name;

	let desc = elWithClass('p', "descTopRatedItem");
	desc.innerText = shortDescription;

	let priceText = elWithClass('p', "priceTopRatedItem" );
	priceText.innerText ="Sale Price: ";
	let sale = elWithClass('span', "salePriceTopItem");
	sale.append(salePrice);
	priceText.append(sale);

	itemInfos.append(title);
	itemInfos.append(desc);
	itemInfos.append(priceText);

	item.append(img);
	item.append(itemInfos);

	gridTopRated.append(item);
}

function elWithClass(el,className){
	let a = document.createElement(el);
	a.className = className;
	return a;
}

function loadMoreTopItems(){
 page++;
 fetchData();
}