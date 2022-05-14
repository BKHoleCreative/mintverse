function nft(data){
  return new Promise((resolve, reject) => { 
  let p5js = new p5( p5 => {
    //console.log(data)
        let cardType = true;
        if(data.category == 1)cardType = false;
        const parentId = 'myCanvas';
        let authorInput;
        let authorLong = 200;
        let bgW = 800, bgH = 800;
        let backgroundColor = cardType ? {h:0,s:0,b:0} : {h:12,s:95,b:96};
        let imgMint, imgR, imgDisctionary, marqueeOne, marqueeTwo , HelveticaBlack, TaipeiSanc, VT323, Roboto, NotoLight, pressStart;
        let blockData = {
          stokeWeight:1,
          textColor: cardType ? 255 : 0,
          labelTextColor : cardType ? {h:0,s:0,b:0} : {h:12,s:95,b:96},
          marquee:{
            width: bgW * 0.08,
            height: bgH,
            x: 0,
            y: 0,
            color: cardType ? {h:0,s:0,b:0} : {h:12,s:95,b:96},
            strokeColor: cardType ? 255 : 0
          },
          top:{
            color: cardType ? {h:0,s:0,b:0} : {h:12,s:95,b:96},
            strokeColor: cardType ? 255 : 0,
            x: 0,
            y: 0,
            height: bgH * 0.088,
            width: bgW * 0.92,
            labelColor:cardType ? 255 : 0,

            blocks:[
              {
                width: 0.314,
                x:0,
              },
              {
                width: 0.236,
                x:0,
              },
              {
                width: 0.136,
                x:0,
              },
              {
                width: 0.314,
                x:0,
              }
            ]
            
          },
          main:{
            color: cardType ? {h:0,s:0,b:0} : {h:12,s:95,b:96},
            strokeColor: cardType ? 255 : 0,
            blocks:[
              {
                width: bgW * 0.92,
                height: bgH * 0.494,
                y: bgH * 0.088,
                x: 0
              },
              {
                width: bgW * 0.054,
                height: bgH * 0.311,
                y: bgH * 0.106 + bgH * 0.088 + bgH * 0.494,
                x: 0
              },
              {
                width: bgW * 0.866,
                height: bgH * 0.311,
                y: bgH * 0.106 + bgH * 0.088 + bgH * 0.494,
                x: bgW * 0.054
              }
            ]
          },
          synonym: {
            color:cardType ? {h:0,s:0,b:0} : {h:12,s:95,b:96},
            strokeColor: cardType ? 255 : 0,
            blocks:[
              {
                width:bgW * 0.054,
                height: bgH * 0.106,
              },
              {
                width:bgW * 0.14,
                height: bgH * 0.053,
              },
              {
                width:bgW * 0.14,
                height: bgH * 0.053,
              },
              {
                width:bgW * 0.054,
                height: bgH * 0.106,
              },
              {
                width:bgW * 0.671,
                height: bgH * 0.106,
              }
            ],
          },
          name:{
            color:cardType ? {h:0,s:0,b:0} : {h:12,s:95,b:96},
            strokeColor: cardType ? 255 : 0,
            height: bgH * 0.106,
            width: bgW * 0.054,
            x: 0,
            y: 0,
          }
        }
        let notes = '', selectContent = '', selectContent1 = '', synonym =  '', author = '', synonymArr = ["", "", "", ""];
        let oldLength = 0;
        const marqueeSpeed = 5;
        let sel,sel1;

        // blink data
        let randomY;
        let randomHight;
        let randomAlpha;
        let randomY_2;
        let randomHight_2;
        let randomAlpha_2;
        let tiempoInicio = 0;
        let tiempoEspera = 100;

        // text animation
        let img, imgDotList;
        let message = "Metaverse";
        let messageIndex = 0;
        let maskPointY = 0;
        let textOpen = true;

        // gradiant animation

        let topGradient,mainGradientTop,mainGradientBottom,marqueeGradient,nameGradient, synonymGradient;
        let topFlash, nameFlash, marqueeFlash, mainFlashTop, mainFlashBottom, synonymFlash;
        let marqueeTimer, nameTimer, topTimer, mainTopTimer, mainBottomTimer, synonymTimer;

        // blink
        let blinkArr = [];
        let spritesheet;
        let spritedata;
        let animations = [];

        let authorImg, novelImg, dictionaryName, checkImg;

        let maskStep = 10; // 切分遮罩動畫格數
        let imgHeight = 380; //圖片高度
        let maskImageGroup = []; //存放不同階段的遮罩圖片
        let textImgAnimation = []; //存放不同階段的主要圖片
        let aniSpeed = 3; //數值越小越快

        let emojiArr = [];

        let mainTextSize = 90;
        let level = [95, 70, 54, 43, 35, 20, 10, 10, 10, 10];
        let lines = [1, 2, 3, 4, 5, 5, 6, 6, 6, 6];
        let currentLevel = 0;
        let currnTextWidth = 0;

    p5.preload = function(){
      let authorId = '0';
          switch (data.author) {
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
          const imageMintName = cardType ? 'mint' : 'mint_black';
          const imageRName = cardType ? 'r' : 'r_black';
          const imgDisctionaryName = cardType ? 'disctionary' : 'disctionary_black';
          img = p5.loadImage(`https://mintverse.s3.ap-northeast-1.amazonaws.com/display/image/found/word_w/${data.font}＿白.png`);
          imgMint = p5.loadImage(`${path}${imageMintName}.png`);
          imgR = p5.loadImage(`${path}${imageRName}.png`);
          imgDisctionary = p5.loadImage(`${path}${imgDisctionaryName}.png`);
          checkImg = p5.loadImage(`${path}check.png`)
          NotoLight = p5.loadFont('../font/NotoSansTC-Light.otf')
          pressStart = p5.loadFont('../font/PressStart2P-Regular.ttf')
          spritedata = p5.loadJSON('../js/found/rSpritesheet.json');
          Roboto = p5.loadFont('../font/Roboto/Roboto-Black.ttf');
          if(cardType){
            spritesheet = p5.loadImage(`${path}spritesheet.png`);
            authorImg = p5.loadImage(`${path}author/noto/author${authorId}.png`);
            novelImg = p5.loadImage(`${path}novel/novel${authorId}.png`);
            dictionaryName = p5.loadImage(`${path}dictionary_m.png`);
            for (var i = 1; i < 5; i++) {
              emojiArr[i] = p5.loadImage(`${path}emoji${i}.png`)
            }
          }else{
            spritesheet = p5.loadImage(`${path}spritesheet_black.png`);
            authorImg = p5.loadImage(`${path}author/noto/author${authorId}_b.png`);
            novelImg = p5.loadImage(`${path}novel/novel${authorId}_b.png`);
            dictionaryName = p5.loadImage(`${path}dictionary_m_b.png`);
            for (var i = 1; i < 5; i++) {
              emojiArr[i] = p5.loadImage(`${path}emoji${i}_b.png`)
            }
          }
          for(let i=0; i< maskStep*2; i++){
            if(cardType)
              textImgAnimation.push(p5.loadImage(`https://mintverse.s3.ap-northeast-1.amazonaws.com/display/image/found/word_w/${data.font}＿白.png`));
            else
              textImgAnimation.push(p5.loadImage(`https://mintverse.s3.ap-northeast-1.amazonaws.com/display/image/found/word_b/${data.font}_黑.png`));
            let maskImg = p5.createImage(300, 150);
            maskImageGroup.push(maskImg);
          }
    }

    p5.setup = function() {
          for(let i=0; i< maskStep*2; i++){
            if(i < maskStep){
              //初始化遮罩圖片，會生成各種階段的遮罩，由高到矮
              makeMask(maskImageGroup[i], false, i*(imgHeight/maskStep) );
            }else{
              makeMask(maskImageGroup[i], true, (i-maskStep)*(imgHeight/maskStep));
            }
            //將所有圖片設定上對應的遮罩
            textImgAnimation[i].mask(maskImageGroup[i]);
          }
          //canvas setting
          p5.frameRate(24);
          p5.pixelDensity(1);
          p5.createCanvas(bgW,bgH).parent(parentId);
          HelveticaBlack = p5.loadFont('../font/Monotype  - Helvetica Now Display Black.otf');
          marqueeTimer = new Timer({p5:p5});
          nameTimer = new Timer({p5:p5}); 
          topTimer = new Timer({p5:p5}); 
          mainTopTimer = new Timer({p5:p5}); 
          mainBottomTimer = new Timer({p5:p5});
          synonymTimer = new Timer({p5:p5});

          let frames = spritedata.frames;
          for (var i = 0; i < frames.length; i++) {
            let pos = frames[i].position;
            let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
            animations.push(img);
          }
          marqueeOne = new marquee({ p5:p5, imgMint:imgMint , imgR:imgR, imgDisctionary:imgDisctionary, blockData:blockData, height:blockData.marquee.height, width:blockData.marquee.width, speed: marqueeSpeed, animation: animations});
          marqueeOne.init();
          marqueeTwo = new marquee({ p5:p5, imgMint:imgMint , imgR:imgR, imgDisctionary:imgDisctionary, blockData:blockData, height:blockData.marquee.height, width:blockData.marquee.width, speed: marqueeSpeed, animation: animations});
          marqueeTwo.init();
          marqueeTwo.setPositionY(blockData.marquee.height)


          authorInput = p5.select('#author');
          authorInput.input(authorInputEvent)
          let notesInput = p5.select('#textarea');
          notesInput.input(notesInputEvent);
          let synonymInput0 = p5.select('#synonym0');
          let synonymInput1 = p5.select('#synonym1');
          let synonymInput2 = p5.select('#synonym2');
          let synonymInput3 = p5.select('#synonym3');
          synonymInput0.input(synonymInputEvent);
          synonymInput1.input(synonymInputEvent);
          synonymInput2.input(synonymInputEvent);
          synonymInput3.input(synonymInputEvent);

          sel = p5.select('#speech');
          sel.changed(selectChange);
          sel1 = p5.select('#speech1');
          sel1.changed(selectChange1);


          img.loadPixels()
          imgDotList = [];
          messageIndex = 0;
          for (let y = 0; y < img.height; y += 2) {
            for (let x = 0; x < img.width; x += 2) {
              i = ((y * img.width) + x) * 4;
              r = img.pixels[i];
              g = img.pixels[i + 1];
              b = img.pixels[i + 2];
              if (r + g + b > 230 ) {
                // statement
                imgDotList.push({x: x,y: y})
              }
            }
          }


          topFlash = new lightBlink({
            p5: p5,
            w: blockData.top.height, 
            h: blockData.top.width, 
            x:blockData.marquee.width + blockData.top.width, 
            y:blockData.top.y, 
            distance: blockData.top.width, 
            speed:40
          });
          //topGradient = new gradient({startColor:0, startEndGap:30, offset:0, width : blockData.top.width, height:blockData.top.height, x:blockData.marquee.width, y:blockData.top.y, speedAnimate:1});
          mainFlashTop = new lightBlink(
            {
              p5: p5,
              direction: 'down',
              w : blockData.main.blocks[0].width, 
              h:blockData.main.blocks[0].height, 
              distance: blockData.main.blocks[0].height,
              x:blockData.marquee.width, 
              y:blockData.main.blocks[0].y, 
              speed:40
            }
          );
          mainFlashBottom = new lightBlink(
            {
              p5: p5,
              distance: blockData.main.blocks[0].width,
              direction:'right',
              h : blockData.main.blocks[0].width, 
              w:blockData.main.blocks[0].height, 
              x:blockData.marquee.width , 
              y:blockData.main.blocks[1].y, 
              speed:40
            }
          );
          marqueeFlash = new lightBlink(
            {
              p5: p5,
              direction:'down',
              distance: blockData.marquee.height, 
              w : blockData.marquee.width, 
              h:blockData.marquee.height, 
              x:blockData.marquee.x, 
              y:blockData.marquee.y, 
              speed:40
            }
          );
          nameFlash = new lightBlink(
            {
              p5: p5,
              distance: blockData.name.width + authorLong,
              direction:'right',
              h : blockData.name.width + authorLong, 
              w: blockData.name.height, 
              x: blockData.marquee.width , 
              y: blockData.main.blocks[0].y + blockData.main.blocks[0].height - blockData.name.height, 
              speed:50
            }
          );
         
          synonymFlash = new lightBlink(
            {
              p5: p5,
              direction:'up',
              distance: blockData.synonym.blocks[0].height,
              w : bgW * 0.919, 
              h: blockData.synonym.blocks[0].height,
              x: blockData.marquee.width, 
              y: blockData.top.height + blockData.main.blocks[0].height + blockData.synonym.blocks[0].height, 
              speed:10
            }
          );
          setBlinkData();
          setTimeGap();
          resolve({p5:p5js,status:'finish'});
          if(data.status == 2){
            notes = data.context.replace('\n','');
            changeNote(notes);
            if(author != undefined && author != null)
              author = data.definer;
            data.synonyms.forEach(function(word, index){
              synonymArr[index] = word;
            });
            //synonym = synonymArr.join(' ');
            synonym = synonymArr;
            selectContent = selectList(data.speechs[0]);
            selectContent1 = selectList(data.speechs[1]);
            calcAuthorWidth(author);
            fontSizeMini();
          }
        }
        function fontSizeMini(){
          let length = notes.length;
          p5.textSize(mainTextSize);
          currnTextWidth = p5.textWidth(notes);          
          if(currnTextWidth > 750*lines[currentLevel] + 550 - (mainTextSize*(currentLevel+1))*2.6 - currentLevel*20){
            oldLength = notes.length
            currentLevel++;
            mainTextSize = level[currentLevel];
            if(currentLevel>=9) currentLevel = 9;
            fontSizeMini();
          }else if(currnTextWidth < 750*(lines[currentLevel])/2 + 550 - (mainTextSize*(currentLevel+1))*2 && length < oldLength){
            oldLength = notes.length
            currentLevel--;
            if(currentLevel<=0) currentLevel = 0;
            fontSizeMini();
          }
          mainTextSize = level[currentLevel];
        }
        function makeMask(maskImage, inverse, max){
          //maskImage: 要生成的遮罩圖
          //inverse: 反向遮罩，max: 遮罩最大值
          maskImage.loadPixels();
          for (let i = 0; i < maskImage.height; i++) {
            for (let j = 0; j < maskImage.width; j++) {
              if(i < max){
                maskImage.set(j, i, p5.color(255, 255, 255, inverse?0:255));
              }else{
                maskImage.set(j, i, p5.color(255, 255, 255, inverse?255:0));
              }
            }
          }
          maskImage.updatePixels();
        }
        function randomColor(h){
          
          return (h + p5.random(0, 360)) % 360;
        }
        function authorInputEvent() {
          if(this.value().length > 10){
            this.value(this.value().slice(0, -1));
          }
          author = this.value();
          calcAuthorWidth(author);
        }
        function calcAuthorWidth(author){
          p5.textSize(50);
          p5.textFont('Noto Sans TC');
          let long = p5.textWidth(author);
          authorLong = long + 40  < 180 ? 200 : long + 40;
          if(!cardType)
            //blinkArr[14][2] = authorLong;
            nameFlash.setLong(blockData.name.width + authorLong);
        }
        function notesInputEvent() {
          if(this.value().length > 100){
            this.value(this.value().slice(0, -1));
          }
          notes = this.value()
          changeNote(notes);
        }
        function changeNote(notes){
          message = 'Mintverse' + unicode(notes);
          let notesLength = notes.length;
          if(!cardType && notesLength!=0){
            notesLength = p5.map(notesLength, 0, 100, 0, 359);
            backgroundColor.h = notesLength;
            backgroundColor.s = 30;

            let colorNum = randomColor(notesLength)
            for (var i = 0; i < 5; i++) {
              // let colorNum = p5.random(0,200);
              // let offset = p5.random(20,40);
              if(i == 0){
                topFlash.setColor({h:((notesLength + 30) % 360),s:100,b:100});
                blockData.top.color = {h:((notesLength + 45) % 360),s:100,b:100};
              }else if(i == 1){
                nameFlash.setColor({h:((notesLength + 195) % 360),s:100,b:100});
                blockData.name.color = {h:((notesLength + 195 + 10 ) % 360),s:100,b:100};
              }else if(i == 2){
                marqueeFlash.setColor({h:((notesLength - 30) % 360),s:100,b:100});
                blockData.marquee.color = {h:((notesLength - 45) % 360),s:100,b:100}; 
              }else if(i == 3){
                mainFlashTop.setColor({h:notesLength,s:100,b:100});
                mainFlashBottom.setColor({h:notesLength,s:100,b:100});
                blockData.main.color = {h: ((notesLength + 10) % 360),s:100,b:100};
              }else if(i == 4){
                synonymFlash.setColor({h:((notesLength + 165) % 360),s:100,b:100});
                blockData.synonym.color = {h:((notesLength + 165 - 10) % 360),s:100,b:100};
              }

            }

            // topGradient.reset(notesLength);
            // mainGradientTop.reset(notesLength);
            // mainGradientBottom.reset(notesLength);
            // marqueeGradient.reset(notesLength);
            // nameGradient.reset(notesLength);

            // synonymGradient.reset(notesLength);
          } else if(!cardType && notesLength == 0) {
            blockData.top.color = {h:12,s:95,b:96};
            blockData.name.color = {h:12,s:95,b:96};
            blockData.marquee.color = {h:12,s:95,b:96};
            blockData.main.color = {h:12,s:95,b:96};
            blockData.synonym.color = {h:12,s:95,b:96};
          }

          fontSizeMini();
        }
        function synonymInputEvent() {
          let arrIndex = this.elt.id.split('synonym')[1];
          let totalText;
          // 5/6
          if(this.value().length > 4){
            this.value(this.value().slice(0, -1));
          }
          synonymArr[arrIndex] = this.value();
          totalText = synonymArr.join('');
          if(totalText.replace(/\s/g, '').length > 10){
            this.value(this.value().slice(0, -1));
            synonymArr[arrIndex] = this.value();
          }
          //synonym = synonymArr.join(' ');
          synonym = synonymArr;

        }
        function selectChange() {
          let item = this.value();
          if(item != ''){
            item = selectList(item);
            selectContent = item;
          }else{
            selectContent = '';
            selectContent1 = '';
          }
        }
        function selectChange1() {
          let item = this.value();
          if(item != ''){
            item = selectList(item);
            selectContent1 = item;
          }else if( item == ''){
            selectContent1 = '';
          }
        }
        function selectList(val){
          let item = "";
          switch (val) {
              case 1:
              case "1":
                  item = ''
                break;
              case 2:
              case "2":
                item = '名詞'
                break;
              case 3:
              case "3":
                item = '動詞'
                break;
              case 4:
              case "4":
                item = '形容詞'
                break;
              case 5:
              case "5":
                item = '嘆詞'
                break;
              case 6:
              case "6":
                item = '狀聲詞'
                break;
              case 7:
              case "7":
                item = '代詞'
                break;
              case 8:
              case "8":
                item = '連接詞'
                break;
              case 9:
              case "9":
                item = '量詞'
                break;
              case 10:
              case "10":
                item = '助詞'
                break;
              case 11:
              case "11":
                item = '副詞'
                break;
              default:
                item = ''
                break;
            }
          return item
        }

    p5.draw = function() {
      p5.background(0);
      p5.colorMode(p5.HSB);
      p5.drawingContext.shadowBlur = 0;
      p5.smooth();
      p5.background(backgroundColor.h,backgroundColor.s,backgroundColor.b);
      p5.colorMode(p5.RGB, 255, 255, 255, 1);
      drawBoxBackground();
      marqueeOne.draw();
      marqueeTwo.draw();
      marqueeOne.animate();
      marqueeTwo.animate();
      if(cardType)
          drawBackground();
      //textImgAnimation[] 動畫播放進度，總動畫格數就是 maskStep ，透過操作播放進度 0 ~ maskStep 就可以做出上下移動的動畫
      //p5.image(textImgAnimation[ (p5.floor(p5.frameCount/aniSpeed))%maskStep ], 0, 0, 300, imgHeight);
    }
    let w;
    let h;
    let columns;
    let rows;
    let rectList = [];
    function drawRect () {
        for(let i = 0; i < blinkArr.length; i++){
          p5.colorMode(p5.RGB);
          p5.drawingContext.shadowBlur = 50;
          p5.drawingContext.shadowColor = p5.color(255);
          p5.fill(255,blinkArr[i][4]);
          p5.rect(blinkArr[i][0] , blinkArr[i][1], blinkArr[i][2], blinkArr[i][3]);
        }
    } 
    function drawBackground() {
          //drawLineStroke();
          // moveLine((p5.frameCount * 10) % p5.height, 4);
          // moveLine((p5.frameCount + 30) % ( p5.height + 30) , 1);
          // moveLine((p5.frameCount * p5.frameCount / 100) % ( p5.height + 50 ), 10);
          drawRect();
    }
    function moveLine(posY, h){
          if( posY > blockData.main.blocks[0].y && posY < blockData.main.blocks[0].y + blockData.main.blocks[0].height){
            let alpha = p5.random(0,0.5);
            p5.fill(255, alpha);
            p5.noStroke();
            p5.rect(blockData.marquee.width, posY, p5.width, h);
          }
        }
    function drawBoxBackground() {
          p5.stroke(255);
          drawTopBarBg();
          drawMainBg();
          drawNameBg();
          drawSynonymBg();
          drawMarqueeBg();
    }
    function drawMarqueeBg(){
          const marqueeData = blockData.marquee;

          let alpha = 1;
          p5.colorMode(p5.HSB);
          p5.fill(marqueeData.color.h,marqueeData.color.s,marqueeData.color.b, alpha);
          p5.strokeWeight(blockData.stokeWeight);
          p5.stroke(marqueeData.strokeColor);
          p5.rect(marqueeData.x, marqueeData.y, marqueeData.width, marqueeData.height);
          p5.colorMode(p5.RGB);
          if(notes.length!=0 && !cardType)
          {
            if(marqueeFlash.getState() == 0){
              //this.init();
              let wait = p5.random(200,300);
              
              if(marqueeTimer.getState()){
                 marqueeFlash.restart();
                 marqueeTimer.stopTime();
              }else{
                marqueeTimer.timeCount(10000);
              }        
            }
            marqueeFlash.animation();
            alpha = 0;
          }
        }
    let marqueeDataX = blockData.marquee.width + blockData.top.width * 0.414 * -1;
    let marqueeData1X = blockData.marquee.width;
    function drawTopBarBg(){
          blockData.top.x = blockData.marquee.width + blockData.marquee.x;
          const topData = blockData.top;
          const marqueeData = blockData.marquee;

          let blockX = marqueeData.width;

          
          let alpha = 1;
          let labelAlpha = 1;
          p5.colorMode(p5.HSB)
          topData.blocks.forEach( function(block, index) {
            p5.fill(topData.color.h,topData.color.s,topData.color.b, alpha);
            p5.strokeWeight(blockData.stokeWeight);
            p5.stroke(topData.strokeColor);
            p5.rect(blockX, topData.y, topData.width * block.width, topData.height);

            //// 5/5
            if(index == 0){
              p5.image(dictionaryName, marqueeDataX, topData.y, topData.width *  0.414, topData.height);
              p5.image(dictionaryName, marqueeData1X, topData.y, topData.width *  0.414, topData.height);
              marqueeDataX += 2;
              marqueeData1X += 2;
              if(marqueeDataX > marqueeData.width + topData.width * 0.414)marqueeDataX = marqueeData.width + topData.width * 0.414 * -1;
              if(marqueeData1X > marqueeData.width + topData.width * 0.414)marqueeData1X = marqueeData.width + topData.width * 0.414 * -1;
            }

            if(index == 2){
              p5.fill(topData.labelColor)
              p5.rect(blockX, topData.height * 0.7, topData.width * block.width, topData.height * 0.3);
            }
            blockData.top.blocks[index].x = blockX;
            blockX = blockX + topData.width * block.width;
          });
          if(notes.length!=0 && !cardType)
          {
            //topGradient.draw();

            if(topFlash.getState() == 0){
              if(topTimer.getState()){
                 topFlash.restart();
                 topTimer.stopTime();
              }else{
                let wait = p5.random(5000,10000);
                topTimer.timeCount(wait);
              }        
            }

            topFlash.animation();
            //alpha = 0;
            //labelAlpha = 1;
          }
          p5.colorMode(p5.RGB)
          p5.fill(blockData.textColor);
          p5.strokeWeight(0);
          p5.textSize(32);
          p5.textAlign(p5.CENTER, p5.CENTER);
          p5.textFont('GB18030 Bitmap');
          //p5.text('第二宇宙辭典', topData.width * blockData.top.blocks[0].width / 2 + blockData.top.blocks[0].x , topData.height / 2 + 10);
          // p5.image(dictionaryName, marqueeData.width , topData.y, topData.width *  0.314, topData.height);
          p5.image(novelImg, marqueeData.width + topData.width *  0.314, topData.y, topData.width *  0.236, topData.height );
          //p5.text('宇宙飛船', topData.width * blockData.top.blocks[1].width / 2 + blockData.top.blocks[1].x, topData.height / 2 + 10);
          p5.textSize(15);
          p5.image(authorImg, marqueeData.width + topData.width *  0.55 + 8, topData.y + 5, topData.width *  0.136 * 0.85, topData.height * 0.7 * 0.85);
          //p5.text('作者 朱宥勳', topData.width * blockData.top.blocks[2].width / 2 + blockData.top.blocks[2].x , topData.height * 0.7 / 2 + 5);
          p5.textFont('Noto Sans TC');
          p5.fill(blockData.labelTextColor.r,blockData.labelTextColor.g,blockData.labelTextColor.b,alpha);
          p5.textSize(12);
          p5.textStyle(p5.BOLD);
          p5.colorMode(p5.HSB);
          p5.fill(backgroundColor.h, backgroundColor.s, backgroundColor.b);
          //fill(blockData.labelTextColor.r,blockData.labelTextColor.g,blockData.labelTextColor.b,labelAlpha);
          p5.strokeWeight(1);
          p5.text('TOKEN ID', topData.width * blockData.top.blocks[2].width / 2 + blockData.top.blocks[2].x , topData.height * 0.85  );
          p5.colorMode(p5.RGB);
          p5.textFont(Roboto);
          p5.fill(blockData.textColor);
          p5.strokeWeight(0);
          p5.textSize(70)
          p5.textLeading(10);
          p5.textAlign(p5.LEFT, p5.CENTER);
          let font = '0000' + data.id.toString();
          font = font.substr(-4);
          let textW = 0;
          textW = p5.textWidth(font[0]) + p5.textWidth(font[1]) + p5.textWidth(font[2]) + p5.textWidth(font[3]) + 30;
          let totalDisplay = blockData.top.width * blockData.top.blocks[3].width - 20;
          let startX = (totalDisplay - textW) / 2 + 10;
          for (var b = 0; b < font.length; b++) {
            let offset = font[b] == '1' ? 8 : 8;
            let frontOffset = font[b] == '1' ? 1 : 0;
            p5.text(font[b], blockData.top.blocks[3].x + startX + frontOffset, topData.height / 2 - 8); 
            startX += p5.textWidth(font[b]) + offset;
          }
        }
        function drawMainBg(){
          const mainData = blockData.main

          let alpha = 1;
          p5.colorMode(p5.HSB)
          p5.fill(mainData.color.h,mainData.color.s,mainData.color.b,alpha)
          p5.stroke(mainData.strokeColor);
          p5.strokeWeight(blockData.stokeWeight);
          let marqueeX = blockData.marquee.width;
          mainData.blocks.forEach( function(block, index) {
            // statements
            p5.rect( marqueeX + block.x, block.y, block.width, block.height);
          });

          if(notes.length != 0 && !cardType)
          {

            if(mainFlashTop.getState() == 0){
              if(mainTopTimer.getState()){
                 mainFlashTop.restart();
                 mainTopTimer.stopTime();
              }else{
                let wait = p5.random(5000,10000);
                mainTopTimer.timeCount(10000);
              }     
             
            }
            if(mainFlashBottom.getState() == 0){
              if(mainBottomTimer.getState()){
                 mainFlashBottom.restart();
                 mainBottomTimer.stopTime();
              }else{
                let wait1 = p5.random(5000,10000);
                mainBottomTimer.timeCount(wait1);
              }     
             
            }
            mainFlashTop.animation();
            mainFlashBottom.animation();
          }

          p5.colorMode(p5.RGB)
          p5.fill(blockData.textColor);
          p5.strokeWeight(0);
          p5.textSize(18);
          p5.textAlign(p5.CENTER, p5.CENTER);
          p5.textFont('Noto Sans TC');
          p5.textStyle('normal');
          p5.textLeading(200);
          p5.text('註\n釋', marqueeX + mainData.blocks[1].x + mainData.blocks[1].width / 2 , mainData.blocks[1].y + mainData.blocks[1].height / 2);
          p5.textSize(mainTextSize);
          p5.textStyle(p5.BOLD);
          p5.textAlign(p5.LEFT, p5.TOP);
          p5.textWrap(p5.CHAR);
          p5.textLeading(mainTextSize * 1.1);
          p5.textFont('Noto Sans TC');
          p5.textStyle('bold');
          p5.text(notes, marqueeX + mainData.blocks[2].x + 20, mainData.blocks[2].y + 10, marqueeX + mainData.blocks[2].x  +  mainData.blocks[2].width - 150, mainData.blocks[2].y + mainData.blocks[2].height - 100 )
          p5.textSize(70);
          p5.text('。', bgW - 70, bgH - 80);
          drawMainImg();
        }
        function drawMainImg(){
          imgDotList.forEach((item)=>{
            p5.fill(blockData.textColor);
            p5.textFont(pressStart);
            p5.textSize(10);
            p5.strokeWeight(0);
            if(textOpen){
              // if(item.x % 10 == 0 && item.y % 10 == 0 && item.y  < maskPointY){
              //   p5.text(message[messageIndex], item.x * 1.3 + 70 , item.y * 1.3 + 70);  
              // }

              if(item.x % 8 == 0 && item.y % 8 == 0 &&  cheskMsgMask(item.y)){
                p5.text(message[messageIndex], item.x * 1.3 + 60 , item.y * 1.3 + 70);  
              }

              // if(item.x % 8 == 0 && item.y % 8 == 0 ){
              //   p5.text(message[messageIndex], item.x * 1.3 + 60 , item.y * 1.3 + 70);
              // }

              // p5.strokeWeight(2);
              // if( item.y > maskPointY )
              //   p5.point(item.x * 1.3 + 70, item.y * 1.3 + 80 );
              // maskPointY += 0.0005;
            }else{
              // if(item.x % 10 == 0 && item.y % 10 == 0 && item.y  > maskPointY){
              //   p5.text(message[messageIndex], item.x * 1.3 + 70 , item.y * 1.3 + 70);  
              // }

              if(item.x % 8 == 0 && item.y % 8 == 0 && item.y  > maskPointY){
                p5.text(message[messageIndex], item.x * 1.3 + 70 , item.y * 1.3 + 70);  
              }
              p5.strokeWeight(2);
              if( item.y < maskPointY )
                p5.point(item.x * 1.3 + 70, item.y * 1.3 + 80 );
              maskPointY += 0.0005;
            }
            messageIndex += 1;
            messageIndex %= message.length;
            if(maskPointY > imgDotList[imgDotList.length - 1].y + 50 || maskPointY < 0){
              textOpen = !textOpen;
              maskPointY = 0;  
            }
          })
          let firstChar = message[0].shift;
          message = message + firstChar;
          p5.image(textImgAnimation[(  p5.floor( p5.frameCount/aniSpeed) )%(maskStep*2)], 60, 70, 740, imgHeight);  
          
        }

        function cheskMsgMask(posY){
          if(  p5.floor(  (p5.frameCount/aniSpeed) % (maskStep*2) ) < maskStep ){
            return posY > (((p5.floor(p5.frameCount/aniSpeed))%(maskStep))) / ((maskStep) * 0.5) * imgHeight;
          }else{
            return posY < (((p5.floor(p5.frameCount/aniSpeed))%(maskStep))) / ((maskStep) * 0.5) * imgHeight;
          }
        }

        function drawNameBg() {
          let nameBlockData = blockData.name
          let mainBlockOne = blockData.main.blocks[0]
          let positionY,positionX;

          let alpha = 1;
          p5.colorMode(p5.HSB)
          p5.fill(nameBlockData.color.h,nameBlockData.color.s,nameBlockData.color.b, alpha)
          p5.strokeWeight(blockData.stokeWeight);
          nameBlockData.x = blockData.marquee.width;
          positionY = mainBlockOne.y + mainBlockOne.height - nameBlockData.height;
          positionX = nameBlockData.x + nameBlockData.width;
          p5.rect(nameBlockData.x , positionY, nameBlockData.width, nameBlockData.height);
          p5.rect(positionX, positionY, authorLong, nameBlockData.height);

          if(notes.length != 0 && !cardType)
          {
            // colorMode(HSB,360,100,100);
            // strokeWeight(blockData.stokeWeight);
            // fill(backgroundColor.h,backgroundColor.s,backgroundColor.b)
            // nameBlockData.x = blockData.marquee.width;
            // positionY = mainBlockOne.y + mainBlockOne.height - nameBlockData.height;
            // positionX = nameBlockData.x + nameBlockData.width;
            // rect(nameBlockData.x , positionY, nameBlockData.width, nameBlockData.height);
            // rect(positionX, positionY, 200, nameBlockData.height);

            if(nameFlash.getState() == 0){
              if(nameTimer.getState()){
                 nameFlash.restart();
                 nameTimer.stopTime();
              }else{
                let wait = p5.random(5000,10000);
                nameTimer.timeCount(wait);
              }    
              
            }
            nameFlash.animation();

            alpha = 0;
          }
          p5.colorMode(p5.RGB);
          p5.fill(blockData.textColor);
          p5.strokeWeight(0);
          p5.textSize(18);
          p5.textAlign(p5.CENTER, p5.CENTER);
          p5.textFont('Noto Sans TC');
          p5.textLeading(22);
          p5.text('鑄\n造\n者', nameBlockData.width / 2 + nameBlockData.x , nameBlockData.height / 2 + positionY);
          p5.textSize(50);
          p5.textAlign(p5.LEFT, p5.CENTER);
          p5.textStyle(p5.NORMAL);
          p5.textFont(NotoLight);
          p5.text(author, blockData.marquee.width + 66 , nameBlockData.height / 2 + positionY - 10);
          if(cardType)
            p5.image(checkImg, nameBlockData.width + nameBlockData.x + authorLong - 25 , positionY +  5, 20, 20)
        }
        let synonymMarqueeX = blockData.marquee.width + blockData.synonym.blocks[1].width + blockData.synonym.blocks[0].width + blockData.synonym.blocks[3].width ;
        let synonymMarquee1X = blockData.marquee.width + blockData.synonym.blocks[1].width + blockData.synonym.blocks[0].width + blockData.synonym.blocks[3].width + blockData.synonym.blocks[4].width + 360;
        function drawSynonymBg() {
          let synonymData = blockData.synonym
          let positionY = blockData.top.height + blockData.main.blocks[0].height;
          let positionX;
          let alpha = 1;

          p5.colorMode(p5.HSB)
          p5.fill(synonymData.color.h,synonymData.color.s,synonymData.color.b, alpha)
          p5.strokeWeight(blockData.stokeWeight);
          positionX = blockData.marquee.width;
          //// 5/5
          p5.rect(positionX + blockData.synonym.blocks[1].width + blockData.synonym.blocks[0].width + blockData.synonym.blocks[3].width, positionY, synonymData.blocks[4].width, synonymData.blocks[4].height);
          p5.textSize(50);
          p5.textAlign(p5.LEFT, p5.CENTER);

          //// 5/5
          if(synonym != ""){
          p5.fill(blockData.textColor)
          synonymMarqueeX -= 2;
          synonymMarquee1X -= 2;
          let x = 0;
          for (var i = 0; i < 4; i++) {
            p5.text(synonym[i], synonymMarqueeX + x, synonymData.blocks[0].y + synonymData.blocks[0].height / 2 - 10);
            p5.image(emojiArr[ i + 1],synonymMarqueeX + p5.textWidth(synonym[i]) + x + 20, synonymData.blocks[0].y + (synonymData.blocks[0].height - 60)/ 2 , 60, 60)
            p5.text(synonym[i], synonymMarquee1X + x, synonymData.blocks[0].y + synonymData.blocks[0].height / 2 - 10);
            p5.image(emojiArr[ i + 1],synonymMarquee1X + p5.textWidth(synonym[i]) + x + 20, synonymData.blocks[0].y + (synonymData.blocks[0].height - 60)/ 2 , 60, 60)
            x += p5.textWidth(synonym[i]) + 100;
          }
          // p5.text(synonym, synonymMarqueeX , synonymData.blocks[0].y + synonymData.blocks[0].height / 2 - 10);
          // p5.text(synonym, synonymMarquee1X , synonymData.blocks[0].y + synonymData.blocks[0].height / 2 - 10);
          if(synonymMarqueeX + synonymData.blocks[4].width + 360 < synonymData.blocks[0].x + synonymData.blocks[1].width + synonymData.blocks[0].width + synonymData.blocks[3].width)
            synonymMarqueeX = synonymData.blocks[0].x + synonymData.blocks[1].width + synonymData.blocks[0].width + synonymData.blocks[3].width + synonymData.blocks[4].width + 360;
          if(synonymMarquee1X + synonymData.blocks[4].width + 360 < synonymData.blocks[0].x + synonymData.blocks[1].width + synonymData.blocks[0].width + synonymData.blocks[3].width )
            synonymMarquee1X = synonymData.blocks[0].x + synonymData.blocks[1].width + synonymData.blocks[0].width + synonymData.blocks[3].width + synonymData.blocks[4].width + 360;
          }
          //// 5/5
          synonymData.blocks.forEach( function(block, index) {
            if( index==4 )return;
            // statements
            p5.fill(synonymData.color.h,synonymData.color.s,synonymData.color.b, alpha)
            let y = positionY;
            if(index == 2) {y = y + block.height;}
            synonymData.blocks[index].x = positionX;
            synonymData.blocks[index].y = y;
            p5.rect(positionX, y, block.width, block.height);
            if(index != 1) positionX = positionX + block.width
          });

          if(notes.length != 0 && !cardType)
          {
            if(synonymFlash.getState() == 0){

              if(synonymTimer.getState()){
                 synonymFlash.restart();
                 synonymTimer.stopTime();
              }else{
                let wait = p5.random(5000,10000);
                synonymTimer.timeCount(wait);
              }    
              synonymFlash.restart();
              
            }
            synonymFlash.animation();
          }

          p5.colorMode(p5.RGB)
          p5.fill(blockData.textColor)
          p5.strokeWeight(0);
          p5.textSize(18);
          p5.textAlign(p5.CENTER, p5.CENTER);
          p5.textLeading(40);
          p5.textFont('Noto Sans TC');
          p5.text('詞\n性', synonymData.blocks[0].x + synonymData.blocks[0].width / 2 , synonymData.blocks[0].y + synonymData.blocks[0].height / 2);
          p5.textLeading(22);
          p5.text('同\n義\n詞', synonymData.blocks[0].x + synonymData.blocks[1].width + synonymData.blocks[0].width + synonymData.blocks[3].width / 2 , synonymData.blocks[0].y + synonymData.blocks[0].height / 2);
          p5.textSize(50);
          p5.textAlign(p5.LEFT, p5.CENTER);
          p5.textSize(18);
          p5.textAlign(p5.LEFT, p5.CENTER);
          let selecType = selectContent;
          let selecType1 = selectContent1;
          if(selecType != ''){
            for (var b = 0; b< selecType.length; b++) {
              let space = selecType.length < 3 ? 40 : 20;
              p5.text(selecType[b], synonymData.blocks[0].x + synonymData.blocks[0].width + b * space + 26, synonymData.blocks[0].y + synonymData.blocks[2].height / 2); 
            }
          }else{
            p5.strokeWeight(1);
            p5.stroke(blockData.textColor);
            p5.line(synonymData.blocks[0].x + synonymData.blocks[0].width, synonymData.blocks[0].y, synonymData.blocks[0].x + synonymData.blocks[0].width +  synonymData.blocks[1].width, synonymData.blocks[0].y + synonymData.blocks[1].height);
          }
          if(selecType1 != ''){
            for (var b = 0; b< selecType1.length; b++) {
              let space1 = selecType1.length < 3 ? 40 : 20;
              p5.text(selecType1[b], synonymData.blocks[0].x + synonymData.blocks[0].width  + b * space1 + 26 , synonymData.blocks[0].y + synonymData.blocks[2].height * 1.5);
            }
          }else{
            p5.strokeWeight(1);
            p5.stroke(blockData.textColor);
            p5.line(synonymData.blocks[0].x + synonymData.blocks[0].width, synonymData.blocks[0].y + synonymData.blocks[1].height, synonymData.blocks[0].x + synonymData.blocks[0].width +  synonymData.blocks[1].width, synonymData.blocks[0].y + synonymData.blocks[1].height * 2);
          }

        }
    function setTimeGap(){
          let notesLength = notes.length + 1;
          let time = getRandom(0,2000 - p5.sin(notesLength) * 50);
          let num = getRandom(1, Math.floor( notesLength % 9 )); //max11
          setTimeout(function () {
              for(let i = 0; i < num; i++){
                let index = getRandom(0, 10);
                let alpha = Math.random(0,1);
                //alpha = alpha > 0.5 ? 0 : 0.3;
                blinkArr[index][4] = alpha;

                setTimeout(function() {
                  blinkArr[index][4] = 0;
                },getRandom(1500 - p5.sin(notesLength) * 10,2000 - p5.sin(notesLength) * 10))
              }
              setTimeGap();
          },time);
        }
      function getRandom(min,max){
            return Math.floor(Math.random()*(max-min+1))+min;
        };
    function setBlinkData (){
            const topData = blockData.top;
            const marqueeData = blockData.marquee;
            let blockX = marqueeData.width;
            const mainData = blockData.main
            let marqueeX = blockData.marquee.width;
            // main block blink
            
            blinkArr.push([marqueeX + mainData.blocks[1].x,mainData.blocks[1].y,mainData.blocks[1].width,mainData.blocks[1].height, 0])
            
            // top blink
            topData.blocks.forEach( function(block, index) {
              blinkArr.push([blockX,topData.y,topData.width * block.width,topData.height, 0]);
              if(index == 2){
                blinkArr.push([blockX, topData.height * 0.7, topData.width * block.width, topData.height * 0.3, 0]);
              }
              blockData.top.blocks[index].x = blockX;
              blockX = blockX + topData.width * block.width;
            });

            // synonym blink
            let synonymData = blockData.synonym
            let positionY = blockData.top.height + blockData.main.blocks[0].height;
            let positionX;
            positionX = blockData.marquee.width;
            synonymData.blocks.forEach( function(block, index) {
              // statements
              if(index != 4){
                let y = positionY;
                if(index == 2) {y = y + block.height;}
                synonymData.blocks[index].x = positionX;
                synonymData.blocks[index].y = y;
                blinkArr.push([positionX, y, block.width, block.height, 0] );
                
                if(index != 1) positionX = positionX + block.width
              }
            });

            //
            let nameBlockData = blockData.name
            let mainBlockOne = blockData.main.blocks[0]
            let positionY1,positionX1;

            let alpha = 1;

            p5.fill(nameBlockData.color.r,nameBlockData.color.g,nameBlockData.color.b, alpha)
            p5.strokeWeight(blockData.stokeWeight);
            nameBlockData.x = blockData.marquee.width;
            positionY1 = mainBlockOne.y + mainBlockOne.height - nameBlockData.height;
            positionX1 = nameBlockData.x + nameBlockData.width;
            blinkArr.push([ nameBlockData.x, positionY1, nameBlockData.width, nameBlockData.height, 0]);
            // blinkArr.push([ positionX1, positionY1, authorLong, nameBlockData.height, 0])
          

            blinkArr.push([ marqueeData.x, marqueeData.y, marqueeData.width, marqueeData.height, 0 ])
        }

        function measureText(){
          let length = notes.length;
          p5.textSize(mainTextSize);
          currnTextWidth = p5.textWidth(notes);
          if(currnTextWidth > 750*lines[currentLevel] + 550 - (mainTextSize*(currentLevel+1))*2.5 - currentLevel*20 && length > oldLength){
            oldLength = notes.length
            currentLevel++;
            if(currentLevel>=9) currentLevel = 9;
          }else if(currnTextWidth < 750*(lines[currentLevel])/2 + 550 - (mainTextSize*(currentLevel+1))*2 && length < oldLength){
            oldLength = notes.length
            currentLevel--;
            if(currentLevel<=0) currentLevel = 0;
          }
          mainTextSize = level[currentLevel];

          //console.log(`Level: ${level[currentLevel]}  Lines: ${lines[currentLevel]}`);
        }
        function keyPressed() {
          if(p5.keyCode == 8){
            let length = notes.length;
            p5.textSize(mainTextSize);
            currnTextWidth = p5.textWidth(notes);
            if(currnTextWidth < 750*(lines[currentLevel])/2 + 550 - (mainTextSize*(currentLevel+1))*2 && length < oldLength){
              oldLength = notes.length
              currentLevel--;
              if(currentLevel<=0) currentLevel = 0;
            }
            mainTextSize = level[currentLevel];
          }
        }
        function unicode(str){
          var value='';
          for (var i = 0; i < str.length; i++) {
            if(isNum(str[i]))
              value += str[i];
            else
              value += '\\u' + left_zero_4(parseInt(str.charCodeAt(i)).toString(16));
          }
          return value;
        }
        function isNum(val){
          return !isNaN(val)
        }
        function left_zero_4(str) {
          if (str != null && str != '' && str != 'undefined') {
            if (str.length == 2) {
              return '00' + str;
            }
          }
          return str;
        }
  })
})
}