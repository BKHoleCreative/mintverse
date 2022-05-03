function notedit(w = '鯨魚'){
  return new p5(p5 => {
    const parentId = 'noedit'
    let kMax; 
    let step = 0.01; 
    let n = 200; 
    let radius = 0;
    let inter = 0.06; 
    let maxNoise = 800; 
    let countdown = 0;
    let world = w;
    let font;
    p5.preload = function() {
      font = p5.loadFont('../font/NotoSerifTC-Bold.otf');
    }
    p5.setup = function() {
      p5.frameRate(24);
      p5.pixelDensity(2.0);
      p5.createCanvas(800, 800).parent(parentId);
      p5.colorMode(p5.RGB, 255, 255, 255, 1);
    	p5.angleMode(p5.DEGREES);
      p5.noFill();
    	//noLoop();
      p5.textFont(font);
    	kMax = p5.random(0.6, 1.0);
    	p5.noStroke();
    	p5.textAlign(p5.CENTER,p5.CENTER);
    	p5.textSize(150);
    }

    p5.draw = function(){
      p5.background(0);
      let t = p5.frameCount/300;
      p5.drawingContext.shadowBlur = 0;
      for (let i = n; i > 0; i--) {
    		let alpha = 0.5 - (i / n);
    		// fill((alpha/5)%1, 10, 255, alpha);
    		p5.fill(0, 0, 100, alpha);
    		let size = radius + i * inter;
    		let k = kMax * p5.sqrt(i/n);
    		let noisiness = maxNoise * (i / n);
        blob(size*2, p5.width/2, p5.height/2.2, k, t - i * step, noisiness);
      }
      p5.fill(255,255,255,p5.map(p5.sin(countdown * 1.5 ),-1,1,0.4,0.9));
      p5.drawingContext.shadowColor = p5.color(255,255,255);
      p5.drawingContext.shadowBlur= p5.map(p5.sin(countdown / 2 ),-1,1,80,80);
      p5.text(world, p5.width/2, p5.height/2.3);
       countdown += 1.2;
    }

    function blob(size, xCenter, yCenter, k, t, noisiness) {
      p5.beginShape();
    	let angleStep = 360 / 10;
      for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
        let r1, r2;
    		r1 = p5.cos(theta)+1;
    		r2 = p5.sin(theta)+1; // +1 because it has to be positive for the function noise
        let r = size + p5.noise(k * r1,  k * r2, t) * noisiness;
        let x = xCenter + r * p5.cos(theta);
        let y = yCenter + r * p5.sin(theta);
        p5.curveVertex(x, y);
      }
      p5.endShape();
    }
  })
}