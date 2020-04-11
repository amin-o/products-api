 
//attach event listeners on page load
(function(){

    //get all developer cards
    [...document.querySelectorAll('.developer-card')].forEach( x =>

        

        x.addEventListener('click', ()=> {
            
            //remove existing styles
            removeDeveloperCardStyles();

            //toggle the class
            x.classList.toggle('about-us-selected-developer');
            
            //change bio based on the clicked developer
            changeBiography(x.firstElementChild.nextElementSibling.textContent);

        }

    ));

})();

//function to remove developer card styles 
function removeDeveloperCardStyles(){

    [...document.querySelectorAll('.developer-card')].forEach( x => 

        x.classList.remove('about-us-selected-developer')

    );

}

//set bio based on username
function changeBiography(developerName){

    let setBio = undefined;

    if(developerName === "Amin Odzic"){

        setBio = "Amin Odzic Biography"

    } else if(developerName === "Marko Krivokapic"){

        setBio = "Marko Krivkapic Biography"

    } else if(developerName === "Vladimir Kontic"){

        setBio = "Vladimir Kontic Biography"

    }

    setBio += ` Lorem ipsum dolor sit amet, consectetur adipiscing 
        elit. In molestie sit amet dolor a malesuada. Ut ornare nunc erat, 
        sit amet vehicula felis fermentum in. Praesent sit amet porttitor libero.
        Curabitur consequat urna eu quam vehicula aliquam. Integer eget diam sollicitudin,
        auctor est et, commodo diam. Ut nec erat varius, dictum ligula nec, ultrices lorem.
        Suspendisse ligula lectus, hendrerit sed sem eget, dignissim finibus sem. In hac habitasse 
        platea dictumst. Mauris in orci sodales, pellentesque justo eget, fringilla diam. Morbi id posuere 
        tortor. Aenean blandit, massa id rhoncus luctus, sapien sapien condimentum tellus, vitae commodo arcu
        ligula non est. Maecenas sit amet tellus eros. Donec nisl eros, faucibus nec dolor nec, 
        lobortis ullamcorper turpis. Suspendisse consectetur tristique nisi id semper. Sed tristique 
        consequat ornare. `

    document.getElementById('aboutUsBiography').textContent = setBio;

}

import { setSliderModalValues } from "scripts/modal.js"