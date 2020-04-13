function resizeFBPlugin() {
    var container_width = (Number($('#facebookSidebar').width()) - Number($('#facebookSidebar').css('padding-left').replace("px", ""))).toFixed(0);
    document.getElementById("fb").src = 'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fhttps%3A%2F%2Fwww.facebook.com%2FTest-Page-104781377866619&tabs=timeline%2C%20messages&width='+ container_width +'&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId';
    document.getElementById("fb").width = container_width;
  };
  
  $(window).on('resize', function() {
  setTimeout(function(){resizeFBPlugin()}, 500);
  });
  
  $(window).on('load', function() {
  setTimeout(function(){resizeFBPlugin()}, 1500);
  });