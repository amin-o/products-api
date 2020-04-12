/* function resizeFBPlugin() {
    //calculate parent box width
    var container_width = (Number($('#facebookSidebar').width()) - Number($('#facebookSidebar').css('padding-left').replace("px", ""))).toFixed(0);
    // set the src and replace the actual width with the calculated width. 
    document.getElementById("fb").src = 'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fhttps%3A%2F%2Fwww.facebook.com%2FTest-Page-104781377866619&tabs=timeline%2C%20messages&width='+ container_width +'&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
    // it should look something like this: 'https://www.facebook.com....&width='+container_width+'&height=......';
    // NOTE: take note of the use of apostrophes and + signs
    //set the width of the iframe
    document.getElementById("fb").width = container_width;
  };
  
  // call the function on resize and on window load
  
  $(window).on('resize', function() {
  setTimeout(function(){resizeFBPlugin()}, 500);
  });
  
  $(window).on('load', function() {
  setTimeout(function(){resizeFBPlugin()}, 1500);
  }); */