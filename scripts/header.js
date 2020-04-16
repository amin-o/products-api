
 const selectElement = (element) => document.querySelector(element);

 
selectElement('.menu-icons').addEventListener('click', () =>{
    selectElement('.nav-list').classList.toggle('notactive');

})

 