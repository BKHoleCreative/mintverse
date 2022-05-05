(function($){
	$.fn.setFooter = function(options){
		const el = $(this);
		$(this).append(` 
			<div class="arrow">
				<img src="../image/arrow.png" alt="">
			</div>
			<p class="mintDescript" style="cursor:pointer;" >
				<span>
					<span>5/5 20:00 白名單</span><span>FREEMINT</span>
				</span>
			</p>
			<div class="mint-container">
				<div class="mint">
					<label for="">鑄造</label>
					<p>0000</p>
				</div>
				<div class="total">
					<label for="">總量</label>
					<p>2100</p>
				</div>
			</div>
			<div class="social-container">
				<ul>
					<li data-target="https://www.facebook.com/Mintverse-第二宇宙辭典-106473608717040">
						<img src="../image/fb.svg" alt="">
					</li>
					<li data-target="https://www.instagram.com/mintverse.world/">
						<img src="../image/ig.svg" alt="">
					</li>
					<li data-target="https://discord.gg/rugpullfrens">
						<img src="../image/dc.svg" alt="">
					</li>
					<li>
						<img src="../image/os.svg" alt="">
					</li>
				</ul>
			</div>
			<p class="fontBtn"><span class="secondWorld">第二宇宙世界觀</span><span class="law">法律聲明</span></p>
				
		`)
		$(this).find('.social-container ul li').click(function(event) {
			/* Act on the event */
			if(event.currentTarget.attributes.length!=0){
				if(event.currentTarget.attributes[0].value != 'active'){
					location.href = event.currentTarget.attributes[0].value;
				}
			}
		});
		$(this).find('.law').on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			location.href = '/law';
		});
		$(this).find('.secondWorld').on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			location.href = '/secondworld';
		});
		function whiteListTimeCheck() {
	      let voteStart = new Date(2022, 4, 5, 20, 0, 0, 0);
	      let voteEnd = new Date(2022, 4, 7, 14, 0, 0, 0);
	      let now = new Date();
	      // console.log(voteStart+"\n"+voteEnd+"\n"+now);
	      if (now < voteStart) {
	     	return false;
	      } else if (now > voteEnd) {
	      	return 'whiteListEnd';
	      } else {
	      	return true;
	      }
	    }
		$(this).find('.mintDescript').on('click', function(event) {
			event.preventDefault();
			// if(whiteListTimeCheck())
			location.href = '/mint';
		});
	    if(whiteListTimeCheck() == true || whiteListTimeCheck() == 'whiteListEnd'){
			$(this).find('.mintDescript').addClass('whiteList');
			$(this).find('.mintDescript span span:nth-of-type(1)').text('FREEMINT');
			$(this).find('.mintDescript span span:nth-of-type(2)').text('5/7 14:00截止');
		}
	}

})(jQuery);