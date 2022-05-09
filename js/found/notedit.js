function notedit(nftDetail) {
    return new Promise((resolve, reject) => {
        let p5js = new p5((p5) => {
            const parentId = 'noedit'
            let kMax;
            let step = 0.01;
            let n = 200;
            let radius = 0;
            let inter = 0.06;
            let maxNoise = 800;
            let countdown = 0;
            let world = nftDetail.name;
            let font, logo, roboto, robotolight;
            let authorImg, novelImg, dictionaryName, checkImg;
            let authorId = '';
            p5.preload = function() {
                switch (nftDetail.author) {
                    case 'AI':
                      authorId = '0';
                      break;
                    case '甘耀明':
                        authorId = '1';
                        break;
                    case '朱宥勳':
                        authorId = '2';
                        break;
                    case '李屏瑤':
                        authorId = '3';
                        break;
                    case '臥斧':
                        authorId = '4';
                        break;
                    case '陳信傑':
                        authorId = '5';
                        break;
                    case '張西':
                        authorId = '6';
                        break;
                    case '張亦絢':
                        authorId = '7';
                        break;
                    case '黃麗群':
                        authorId = '8';
                        break;
                    case '楊双子':
                        authorId = '9';
                        break;
                    case '瀟湘神':
                        authorId = '10';
                        break;
                    default:

                        break;
                }
                const path = '../image/found/'
                font = p5.loadFont('../font/NotoSerifTC-SemiBold.otf');
                robotolight = p5.loadFont('../font/Roboto/Roboto-Light.ttf');
                roboto = p5.loadFont('../font/Roboto/Roboto-Black.ttf');
                logo = p5.loadImage('../image/logo.png');
                authorImg = p5.loadImage(`${path}author/noedit/author/author${authorId}.png`);
                if(authorId == '3')authorId = '3_title'
                novelImg = p5.loadImage(`${path}novel/novel${authorId}.png`);
                dictionaryName = p5.loadImage(`${path}dictionary.png`);
            }
            p5.setup = function() {
                p5.frameRate(24);
                p5.pixelDensity(2.0);
                p5.createCanvas(800, 800).parent(parentId);
                p5.colorMode(p5.RGB, 255, 255, 255, 1);
                p5.angleMode(p5.DEGREES);
                p5.noFill();
                kMax = p5.random(0.6, 1.0);
                p5.noStroke();
                p5.textAlign(p5.CENTER, p5.CENTER);
                p5.textSize(150);
                p5.noLoop();

                resolve({ p5: p5js, status: 'finish' });
            }

            p5.draw = function() {
                p5.background(0);
                p5.strokeWeight(0);
                let t = p5.frameCount / 300;
                p5.textSize(150);
                p5.textFont(font);
                p5.fill(255, 255, 255, 1);

                for (let i = 0; i < nftDetail.font.length; i++) {
                    p5.text(nftDetail.font[i], p5.width / 2 + (-1 * (nftDetail.font.length - 1 ) + 2 * i) * p5.textWidth(nftDetail.font[i]) / 2.1, p5.height / 2);
                }
                p5.image(logo, (p5.width / 2) - 166, 50, 333, 21)

                p5.fill(0);
                p5.stroke(255)
                p5.strokeWeight(1);
                p5.rect(p5.width / 2 - 50, 150, 100, 30)

                p5.fill(0);
                p5.stroke(255)
                p5.strokeWeight(1);
                p5.rect(p5.width / 2 - 50, 180, 100, 40)

                p5.fill(255);
                p5.textAlign(p5.CENTER, p5.CENTER);

                p5.textFont(robotolight);
                p5.textSize(14);
                let token = 'TOKEN';
                let id = 'ID'
                let startX = p5.width / 2 - 35;
                for (let i = 0; i < token.length; i++) {
                    p5.text(token[i], startX, 180 - 15);
                    startX = startX + p5.textWidth(token[i]) + 2;
                }
                startX += 4;
                for (let i = 0; i < id.length; i++) {
                    p5.text(id[i], startX, 180 - 15);
                    startX = startX + p5.textWidth(id[i]) + 5;
                }

                p5.textFont(roboto);
                p5.textSize(25);
                for (let i = 0; i < nftDetail.id.length; i++) {
                    p5.text(nftDetail.id[i], p5.width / 2 + (-3.6 + 2.5 * i) * p5.textWidth(nftDetail.id[i]) / 2, 180 + 18);
                }


                p5.image(authorImg, 20 + ((p5.width - 40) / 3) * 2.5 - 125.33 * 0.75, p5.height - 95, 125.33 * 1.45, 60.41 * 1.45)
                p5.stroke(255)
                if(authorId == '4' || authorId == '5' || authorId == '6'){
                    p5.image(novelImg, 20 + ((p5.width - 40) / 3) * 1.5 - (142.7*1.2) / 2, p5.height - (60 * 1.2) - 14, 142.7*1.2, 60*1.2)
                }else if(authorId == '3_title'){
                    p5.image(novelImg, 20 + ((p5.width - 40) / 3) * 1.5 - 142.7*1.4 / 2, p5.height - 80, 142.7*1.4, 60)
                }else{
                    p5.image(novelImg, 20 + ((p5.width - 40) / 3) * 1.5 - 142.7 / 2, p5.height - 80, 142.7, 60)
                }

                p5.image(dictionaryName, 20 + ((p5.width - 40) / 3) / 2 - 198.1 / 2, p5.height - 80, 198.1, 60)


                p5.stroke(255);
                p5.strokeWeight(1);
                p5.line(20 + ((p5.width - 40) / 3), p5.height - 30, 20 + ((p5.width - 40) / 3), p5.height - 70);
                p5.line(20 + ((p5.width - 40) / 3) * 2, p5.height - 30, 20 + ((p5.width - 40) / 3) * 2, p5.height - 70);

            }
        })
    });
}