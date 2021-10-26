jQuery(document).ready(function(){
    jQuery('.screen').on('click','.navigation a',function(e){
        console.log('a');
        e.preventDefault();
        href = jQuery(this).attr('href');
        if(href.length > 0)
            jQuery.ajax({
                url: href,
                success: function(data){
                    jQuery('.screen product-list').json(data);
                }
            })
    });
    jQuery.ajax({
        url: "/site/index",
        success: function(data){
            jQuery('.screen product-list').json(data);
        }
    })

})