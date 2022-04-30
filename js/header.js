(function($){
	$.fn.setHeader = function(options){
		const el = $(this);
		$(this).append(` 
				<div class="logo">
					<img src="../image/mintve.svg" alt="">
					<img src="../image/r.svg" alt="">
					<img src="../image/se.svg" alt="">
				</div>
				<div class="menu-container">
					<div class="marquee" data-duplicated='true' data-direction='right'>
						<div class="container">
							<div class="item">
								<img src="../image/arrow.png" alt="">
								<img src="../image/title.png" alt="">
							</div>
							<div class="item">
								<img src="../image/arrow.png" alt="">
								<img src="../image/title.png" alt="">
							</div>
							<div class="item">
								<img src="../image/arrow.png" alt="">
								<img src="../image/title.png" alt="">
							</div>
						</div>
					</div>
					<div class="menu">
						<ul>
						  	<li data-target="/declare">宣言</li>
						 	<li data-target="/literature">文獻</li>
						 	<li><span>鑄造</span></li>
						  	<li><span>證明</span></li>
						  	<li><span>ERC-721A</span></li>
						  		<!-- <li data-target="/found">鑄造</li>
						  	<li data-target="/prove">證明</li>
						  	<li data-target="/erc">ERC-721A</li>-->
						</ul>
					</div>
				</div>
		`)
		let path = location.pathname.split('/')[1];
		switch (path) {
			case 'declare':
				$(this).find('li').eq(0).addClass('active');
				break;
			case 'literature':
				$(this).find('li').eq(1).addClass('active');
				break;
			case 'found':
				$(this).find('li').eq(2).addClass('active');
				break;
			case 'prove':
				$(this).find('li').eq(3).addClass('active');
				break;
			case 'prove':
				$(this).find('li').eq(4).addClass('active');
				break;
			default:
				// statements_def
				break;
		}
		$(this).find('.menu-container .marquee').marquee({
			duplicated: true,
			gap:0,
			delayBeforeStart:1000
		});

		setTimeout(function(){
			$('.menu-container .marquee .container').css('opacity', '1');
		},1000)

		$(this).find('.menu li').click(function(event) {
			/* Act on the event */
			if(event.currentTarget.attributes.length!=0){
				if(event.currentTarget.attributes[0].value != 'active'){
					location.href = event.currentTarget.attributes[0].value;
				}
			}
		});
		$(this).find('.logo').on('click',function(event) {
			event.preventDefault();
			/* Act on the event */
			location.href = '/';
		});
	}

})(jQuery);