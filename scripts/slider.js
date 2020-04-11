const apiKey = 'PrMnGciaOjAm4BpX0oxci8AB';
let previousBtn = document.querySelector('.sliderPreviousBtn');
let nextBtn = document.querySelector('.sliderNextBtn');
let slider = document.querySelector('#slider');
previousBtn.addEventListener('click', sliderLoadPrevious);
nextBtn.addEventListener('click', sliderLoadNext);

let mouseOverSlider = false;
let sliderFirstElIndex = 0;
let sliderMidElIndex = 1;
let sliderLastElIndex = 2;
var sliderItems = [];

slider.addEventListener('mouseenter', function(){
    mouseOverSlider = true;
    clearInterval(autoSlider); //if we are in slider area, stop auto swiping slider
})
slider.addEventListener('mouseleave', function(){
mouseOverSlider = false;
autoSlider = setInterval(sliderLoadAuto, 3000); //start autoSlider again when leave slider area
})

let autoSlider = setInterval(sliderLoadAuto, 3000);

function sliderLoadAuto(){
    sliderLoadNext();
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

fetch(`https://api.bestbuy.com/v1/products(releaseDate<=today&longDescription!=null)?apiKey=${apiKey}&format=json&show=sku,name,longDescription,image,regularPrice,salePrice,releaseDate,type&sort=releaseDate.dsc`)
    .then(handleErrors)
    .then(response => response.json())
    .then(response => response.products)
    .then(loadSlider)
    .catch(function(error) {
        console.log(error);
    });

function loadSlider(jsonResponse){
    //initial slider load - show first 3 items from response
    sliderItems = jsonResponse;
    sliderShowElements([0,1,2]);
}

function sliderShowElements(arrIndexes){
    arrIndexes.forEach(function(i){
        let name = sliderItems[i].name;
        let longDescription = sliderItems[i].longDescription;
        let image = sliderItems[i].image;
        let regularPrice = sliderItems[i].regularPrice;
        let salePrice = sliderItems[i].salePrice;salePrice;
        let releaseDate = sliderItems[i].releaseDate;
        let type = sliderItems[i].type;
        appendNewSliderItem(name,longDescription,image, regularPrice, salePrice, releaseDate,type);
    })
}

function appendNewSliderItem(name,longDescription,image, regularPrice, salePrice, releaseDate,type){
    
    let div = document.createElement('div');
    div.classList.add('sliderItem');

    let img = document.createElement('img');
    img.src=image;
    img.alt = name;

    let p = document.createElement('p');
    p.classList.add('sliderProductTitle');
    p.innerText = name;

    let btn = document.createElement('button');
    btn.innerText = 'Read More';
    btn.classList.add('sliderReadMoreBtn');
    btn.addEventListener('click', openModal)
    function openModal(){
        //this function will not be here, this is just for testine
    }
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(btn);

    slider.appendChild(div);
}

function sliderLoadNext(){
    clearSlider();
    sliderFirstElIndex =(sliderFirstElIndex + 3 ) % 10;
    sliderMidElIndex = (sliderMidElIndex + 3 ) % 10;
    sliderLastElIndex = (sliderLastElIndex + 3 ) % 10;
    sliderShowElements([sliderFirstElIndex, sliderMidElIndex, sliderLastElIndex]);
}

function sliderLoadPrevious(){
    clearSlider();

    sliderFirstElIndex =(sliderFirstElIndex + 7 ) % 10;
    sliderMidElIndex = (sliderMidElIndex + 7 ) % 10;
    sliderLastElIndex = (sliderLastElIndex + 7 ) % 10;
    sliderShowElements([sliderFirstElIndex, sliderMidElIndex, sliderLastElIndex]);
}

function clearSlider(){
    //makes current slider items non visible 
    //prepraring slider for new 3 items
    for (let i = 4; i>=2; i--){
        slider.children[i].remove();
        //starting from index = 2 because first two childs are btns for slider navigartion
    }
}

document.addEventListener('keydown', function(e){
//this function allows us to navigate slider with keyboard arrows
if (mouseOverSlider){ //
    if (e.keyCode == 37){
        sliderLoadPrevious();
    }else if (e.keyCode == 39){
        sliderLoadNext();
    }
}
})