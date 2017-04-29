let $ = require('jquery');

$('.dataset a').click(function(){
  $(this).parent('.dataset').toggleClass('chosen');
});