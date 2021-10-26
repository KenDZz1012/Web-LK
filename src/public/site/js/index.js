$(document).ready(function(){
    let filter = $('.header__menu');
    $(window).scroll(function(){
       let pos_body = $('html, body').scrollTop();
       if(pos_body>150)
       {
           filter.removeClass('position');
           filter.addClass('co_dinh_menu');
       }
       else{
           filter.addClass('position');
           filter.removeClass('co_dinh_menu');
       }
    })
})