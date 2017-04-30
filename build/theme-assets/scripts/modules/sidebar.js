let $ = require('jquery');

$('.dataset .heading').click(function(){
  $(this).parent('.dataset').toggleClass('chosen');
});

$('.dataset .content li').click(function(){
  $(this).toggleClass('chosen');
});