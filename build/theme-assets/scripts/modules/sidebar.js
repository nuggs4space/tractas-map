let $ = require('jquery');

$('.dataset .heading').click(function(){
  $(this).parent('.dataset').toggleClass('chosen');
});

$('.dataset .content li').click(function(){
  $(this).toggleClass('chosen');
});

$('.dataset.parent').click(function(){
	if($(this).hasClass('chosen')){
		$(this).find('.content').slideDown('slow');
	}else{
		$(this).find('.content').slideUp('slow');
	}
});