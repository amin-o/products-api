let api = 'PrMnGciaOjAm4BpX0oxci8AB'

let paginationState = {

    current: 1,
    max: 99

}


//get data from all input fields and execute fetch function
function getInputAndFetch(){

    //get text input
    let searchInput = document.getElementById('listSearchText').value;

    //get selected category
    let category = document.getElementById('listCategorySelect').options[document.getElementById('listCategorySelect').selectedIndex].value;

    //get radio input
    let radioInputs = document.querySelectorAll('.radioi');
     
    let selectedRadio = undefined;

    for(let x in radioInputs){

        if(radioInputs[x].checked){

            selectedRadio = radioInputs[x].value;
            break;

        }

    }

    //order of checkboxes: onSale, preowned, homeDelivery, freeShipping
    let checkBoxes = document.querySelectorAll('.addifilters');
    
    //minimum user rewview score
    let minUserAvg = document.getElementById('listSlider').value;

    paginationState.current = 1;

    fetchData(selectedRadio, searchInput, category,
         checkBoxes[0].checked, checkBoxes[1].checked, checkBoxes[2].checked,
         checkBoxes[3].checked, minUserAvg);



}



//searchButton
document.getElementById('listSearchButton').addEventListener('click', getInputAndFetch);



async function fetchData(searchBase, input, category, onSale, preOwned, homeDelivery, freeShipping,minUserAvg){

    let response = await fetch(`https://api.bestbuy.com/v1/products(${searchBase}=${input}*&type=${category}&freeShipping=${freeShipping}&homeDelivery=${homeDelivery}&preowned=${preOwned}&onSale=${onSale}&customerReviewAverage>=${minUserAvg})?apiKey=${api}&format=json&pageSize=52&show=image,name,customerReviewAverage,regularPrice,salePrice&sort=releaseDate.dsc`)

    let data = await response.json();
       
    let products = data['products'];

    let tempArr = [];
    let storage = [];

    let i = 1;

    for(let x in products){

        tempArr.push(products[x])
     
        if(i % 4 === 0){
         
            storage.push(tempArr);
            tempArr = [];
           
        } 

        i++;
    }

    //show searchs on fetch
    document.getElementById('pagination').style.display='flex';
    document.getElementById('dataDisplay').style.display='grid';

    //after u create a storage of all fetched items create pagination
    createPaginationButtons(storage, storage.length);
    displayItems(storage[0]);
    updateSelectedPage(paginationState.current);

}

 

//function which takes array of items and displays them
function displayItems(arr){

    let dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = '';

    for(let x in arr){
        
        let div = document.createElement('div');
        div.classList.add('display-item');

        div.innerHTML = `
        
            <img class="display-item-image" src="${arr[x]['image']}" alt="missing image">
            <p class="display-item-name">${arr[x]['name']}</p>
            <p class="display-item-score">Average Customer Score: ${arr[x]['customerReviewAverage']}</p>
            <p class="display-item-price">Regular Price: ${arr[x]['regularPrice']}</p>
            <p class="display-item-price-sale">Sale Price: ${arr[x]['salePrice']}</p>
            <button class="display-item-button">Buy</button>`

        dataDisplay.appendChild(div);

    }
    
}



//change color of the selected page at the bottom of the page
function updateSelectedPage(id){
    
    let get = document.querySelectorAll('.selectedPage');
   
    get.forEach(function(x) {
       
        x.classList.remove("selectedPage");

    })

    document.getElementById(`page-${id}`).classList.add('selectedPage');

}



//function which will create pagination buttons based on the number of pages
function createPaginationButtons(arr, num){

    let pagination = document.getElementById('pagination');

    pagination.innerHTML = '';

    //craete arrows
    let leftArrow = document.createElement('div');
    leftArrow.innerHTML = `&leftarrow;`;

    let rightArrow = document.createElement('div');
    rightArrow.innerHTML = `&rightarrow;`;

    //attach listeners to the left arrow
    leftArrow.addEventListener('click', ()=>{

        if(paginationState.current === 1){

            paginationState.current = paginationState.max;

        } else {

            paginationState.current--;

        }

        
        displayItems(arr[paginationState.current - 1]);
        updateSelectedPage(paginationState.current);

    })

    //attach listener to the right arrow
    rightArrow.addEventListener('click', ()=>{

        if(paginationState.current === paginationState.max){

            paginationState.current = 1;

        } else {

            paginationState.current++;

        }

        displayItems(arr[paginationState.current - 1]);
        updateSelectedPage(paginationState.current);
    })

    pagination.appendChild(leftArrow);

    //create page numbers and append them between the arrows
    for(let i = 0; i < num;i++){

        let div = document.createElement('div');
        div.innerHTML = i+1;
        div.id = `page-${i+1}`;
        pagination.appendChild(div);

        //on page click load the page
        div.addEventListener('click', ()=>{

            displayItems(arr[i]);
            paginationState.current = i + 1;
            updateSelectedPage(paginationState.current);
        });

    }

    pagination.appendChild(rightArrow);

    paginationState.max = num;

}


//change value of slider on mosemove
document.getElementById('listSlider').addEventListener('mousemove', ()=>{

    let getVal = document.getElementById('listSlider').value;
    document.getElementById('scoreTracker').innerHTML = getVal;

});


//fetch data on mouseup from slider
document.getElementById('listSlider').addEventListener('mouseup',getInputAndFetch);



(function(){

    let getVal = document.getElementById('listSlider').value = 2;
    document.getElementById('scoreTracker').innerHTML = getVal;

    document.getElementById('pagination').style.display='none';
    document.getElementById('dataDisplay').style.display='none';

})();