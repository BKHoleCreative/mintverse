function renderDead(text = '鯨魚') {
    return new p5(p => {
        const parentId = 'myCanvas'
        let font;
        let points;
        let bounds;
        let num = 1;
        p.preload = function() {
            font = p.loadFont('../font/NotoSerifTC-Bold.otf');
        }
        p.setup = function() {
            let textSize = 200;
            if(text.length == 5){
                textSize = 150;
            }else if(text.length == 4){
                textSize = 180;
            }
            p.frameRate(24);
            p.pixelDensity(2.0);
            p.createCanvas(800, 800).parent(parentId);
            points = font.textToPoints(
                text, 0, 0, textSize, {
                    sampleFactor: 1,
                    simplifyThreshold: 0
                });

            bounds = font.textBounds(
                text, 0, 0, textSize);

            p.cursor(p.CROSS);
            p.fill(255, 127);
            p.noStroke();
        }
        p.draw = function() {
            if (p.sin(num) <= -0.9) {
                num += 0;
                setTimeout(function() {
                    num += 0.1;
                }, 2000)
            } else {
                num += 0.1;
            }


            p.background(0);

            // p.stroke(51);
            // p.line(p.width / 2, 0, p.width / 2, p.height);
            // p.line(0, p.height / 2, p.width, p.height / 2);
            p.noStroke();

            
            let centerDist = p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2);
            centerDist = p.map(p.sin(num), -0.9, 0.9, 2, 20);
            let transparency = p.map(centerDist, 0, p.width / 2, 200, 50);
            transparency = p.constrain(transparency, 50, 200);
            p.fill(255, transparency);
            let jiggle = p.map(centerDist, 0, p.width, 1, 300);
            p.translate((p.width - p.abs(bounds.w)) / 2,
                (p.height + p.abs(bounds.h)) / 2.1);
            for (let i = 0; i < points.length; i++) {
                let point = points[i];
                p.ellipse(point.x + jiggle * 2 * p.randomGaussian(),
                    point.y + jiggle * 2 * p.randomGaussian(), 1, 1);
            }
        }
    })
}