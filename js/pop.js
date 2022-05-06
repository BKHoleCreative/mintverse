(function ($) {
    $.fn.setPop = function(options){
        const el = $(this); 
        $(this).append(`
                <div class="bg_black">
                </div>
                <div class="content">
                    <div class="text">
                        <p>Error</p>
                        <a href=""></a>
                    </div>
                    <div class="btn_wrap">
                        <button class="url">View on Etherscan</button>
                        <button class="check_btn">我確定</button>
                        <button class="close">close</button>
                    </div>
                </div>      
            `
        );
        $(this).addClass("pop")
        $(this).find('.close').on('click',function(){
            el.hide();
        })
        $(this).find('.bg_black').on('click',function(){
            el.hide();
        })
    }

    $.fn.openPop = function(options,callback){
        let defaults = {
            message:"error",
            type:"failed", // 三種型態 failed success check,
            url:"",
            complete: function () {
                // alert("complete1");
            }
        }
        let opts = $.extend(defaults, options);
        $(this).find('.check_btn').off();
        $(this).find('.content').attr('class', 'content').addClass(opts.type);
        if(opts.type == 'check')
        {
            $(this).find('.close').empty().append('再檢查一下');
        } else {
            $(this).find('.close').empty().append('close');
        }
        $(this).find('.url').off();
        if(opts.type == 'success'){
            $(this).find('.url').on('click', function(event) {
                event.preventDefault();
                /* Act on the event */
                 window.open(opts.url, '_blank');
            });
        }
        $(this).show();
        $(this).find('p').text(opts.message);
        $(this).find('.check_btn').on('click', function(event) {
            /* Act on the event */
            opts.complete();
        });
    }
})(jQuery);