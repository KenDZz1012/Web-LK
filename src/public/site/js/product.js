$(document).ready(function(){
    $('.container__subimg-list-item').click(function(){
        console.log('kiên');
        $(".container__img-product").css({"display" :  "none"})
        $('.container__subimg-list-item').css({'outline':'none'});
        $(this).css({'outline':'1px solid #e93434'})
        $(`.container__img-product:eq(${this.id})`).css({"display" :  "block"})

        
    })
})

