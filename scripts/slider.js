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
    autoSlider = setInterval(sliderLoadAuto, 4300); //start autoSlider again when leave slider area
})

let autoSlider = setInterval(sliderLoadAuto, 4300); //svakih 4 sekunde pozovi funkciju za ucitavanje novih itema slidera

function sliderLoadAuto(){
   sliderLoadNext();
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

fetch(`https://api.bestbuy.com/v1/products(releaseDate<=today)?apiKey=${apiKey}&format=json&show=sku,name,shortDescription,image,regularPrice,salePrice,releaseDate,type,customerReviewAverage&sort=releaseDate.dsc`)
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
    
    if (window.innerWidth > 768){
        sliderShowElements([0,1,2]);
    }else if (window.innerWidth>425){
         sliderShowElements([0,1]);
    }else{
        sliderShowElements([0]);
    }
   
}

function sliderShowElements(arrIndexes){
    arrIndexes.forEach(function(i){
        let name = sliderItems[i].name;
        let shortDescription = sliderItems[i].shortDescription;
        let image = sliderItems[i].image;
        let regularPrice = sliderItems[i].regularPrice;
        let salePrice = sliderItems[i].salePrice;salePrice;
        let releaseDate = sliderItems[i].releaseDate;
        let type = sliderItems[i].type;
        let customerReviewAverage = sliderItems[i].customerReviewAverage;
        appendNewSliderItem(name,shortDescription,image, regularPrice, salePrice, releaseDate,type, customerReviewAverage);
    })
}

function appendNewSliderItem(name,longDescription,image, regularPrice, salePrice, releaseDate,type, customerReviewAverage){
    
    let div = document.createElement('div');
    div.classList.add('sliderItem');

    let img = document.createElement('img');
    img.classList.add('sliderImg');
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
        setSliderModalValues(image, name, longDescription, customerReviewAverage, type, regularPrice, salePrice, releaseDate)
    }
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(btn);

    slider.appendChild(div);
}

function sliderLoadNext(){
    clearSlider();

    if (window.innerWidth > 768){
        sliderFirstElIndex =(sliderFirstElIndex + 3 ) % 10;
        sliderMidElIndex = (sliderMidElIndex + 3 ) % 10;
        sliderLastElIndex = (sliderLastElIndex + 3 ) % 10;
        sliderShowElements([sliderFirstElIndex, sliderMidElIndex, sliderLastElIndex]);    
    }else if (window.innerWidth>425){
        sliderFirstElIndex =(sliderFirstElIndex + 2 ) % 10;
        sliderMidElIndex = (sliderMidElIndex + 2 ) % 10;
         sliderShowElements([sliderFirstElIndex, sliderMidElIndex]);
    }else{
        sliderFirstElIndex =(sliderFirstElIndex + 1 ) % 10;
        sliderShowElements([sliderFirstElIndex]);
    }
    
}

function sliderLoadPrevious(){
    clearSlider();

    if (window.innerWidth > 768){
        sliderFirstElIndex =(sliderFirstElIndex + 7 ) % 10;
        sliderMidElIndex = (sliderMidElIndex + 7 ) % 10;
        sliderLastElIndex = (sliderLastElIndex + 7 ) % 10;
        sliderShowElements([sliderFirstElIndex, sliderMidElIndex, sliderLastElIndex]);
}else if (window>425){
    sliderFirstElIndex =(sliderFirstElIndex + 8 ) % 10;
    sliderMidElIndex = (sliderMidElIndex + 8 ) % 10;
    sliderShowElements([sliderFirstElIndex, sliderMidElIndex]);
}else{
    sliderFirstElIndex =(sliderFirstElIndex + 9 ) % 10;
    sliderShowElements([sliderFirstElIndex]);
}
    
}

function clearSlider(){
    //makes current slider items non visible 
    //prepraring slider for new 3 items
    const numOfItems = slider.childElementCount;
    for (let i = numOfItems-1; i>=2; i--){
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