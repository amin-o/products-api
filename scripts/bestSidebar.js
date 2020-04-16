let api = 'PrMnGciaOjAm4BpX0oxci8AB';

(function(){

    //fetch data from api on page load
    fetchBestSiderbarData();
    
})();

function fetchBestSiderbarData(){

    //give slider 2 seconds to fetch then start async fetch call
    setTimeout(async function(){

        try{
            //fetch 3 movies that are highly rated and on sale
            let response = await fetch(`https://api.bestbuy.com/v1/products(onSale=true&inStoreAvailability=true&customerReviewAverage>=4&type=movie)?format=json&pageSize=3&show=name,shortDescription,image,regularPrice,salePrice,subclass,releaseDate,type,customerReviewAverage&sort=salePrice&apiKey=${api}&sort=salePrice.asc`)
            let data = await response.json();
        
            let products = data['products'];
            
            for(let x in products){
              
                populateBestSidebar(parseInt(x)+1,products[x]['name'], products[x]['image'], products[x]['salePrice'],
                                    products[x]['regularPrice'], products[x]['releaseDate'], products[x]['subclass'], 
                                    products[x]['shortDescription'], products[x]['customerReviewAverage']);

            }

        } catch(error) { console.log(error); } 
        
    },2000)
    
}

//function to populate the best sidebar with 3 articles based following inputs. Function will also attach listener to the details button
//to open modal window on click
function populateBestSidebar(bestBarSection, productName, image, salePrice, regularPrice, releaseDate, categories, description, rating){
    
    let getChildren = document.getElementsByClassName(`best-sidebar-item-${bestBarSection}`)[0].children;

    //set main info the the side bar
    getChildren[0].textContent = productName;
    getChildren[1].src = image;
    getChildren[2].textContent = `ON SALE: ${salePrice}$`;

    //open modal with more details on button click
    getChildren[3].addEventListener('click', ()=>{

        setSliderModalValues(image, productName, description, rating, categories, regularPrice, salePrice, releaseDate)

    });

}