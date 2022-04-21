
let cardType = true;
const SearchURL = new URL(window.location.href);
let params = SearchURL.searchParams;
if(params.has('normal'))cardType = false;
let w;
let h;
let columns;
let rows;
let bgW = 800, bgH = 800;
let rectList = [];
let imgMint, imgR, imgDisctionary, marqueeOne, marqueeTwo , HelveticaBlack, TaipeiSanc;
let blockData = {
  stokeWeight:1,
  textColor: cardType ? 255 : 0,
  labelTextColor : cardType ? {r:0,g:0,b:0} : {r:247,g:61,b:11},
  marquee:{
    width: bgW * 0.08,
    height: bgH,
    x: 0,
    y: 0,
    color: cardType ? {r:0,g:0,b:0} : {r:247,g:61,b:11},
    strokeColor: cardType ? 255 : 0
  },
  top:{
    color: cardType ? {r:0,g:0,b:0} : {r:247,g:61,b:11},
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
    color: cardType ? {r:0,g:0,b:0} : {r:247,g:61,b:11},
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
    color:cardType ? {r:0,g:0,b:0} : {r:247,g:61,b:11},
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
    color:cardType ? {r:0,g:0,b:0} : {r:247,g:61,b:11},
    strokeColor: cardType ? 255 : 0,
    height: bgH * 0.106,
    width: bgW * 0.054,
    x: 0,
    y: 0,
    inputData:'蛋餅人' 
  }
}
let notes = '', selectContent = '', selectContent1 = '', synonym =  '';
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
let message = "0x7cEaD04E4D41eDcd765154add180CD73951D2275";
let messageIndex = 0;
let maskPointY = 0;
let textOpen = true;
// gradiant animation

let topGradient,mainGradientTop,mainGradientBottom,marqueeGradient,nameGradient, synonymGradient;
 

function preload() {
  const path = '../image/'
  const imageName = cardType ? 'fish' : 'fish';
  const imageMintName = cardType ? 'mint' : 'mint_black';
  const imageRName = cardType ? 'r' : 'r_black';
  const imgDisctionaryName = cardType ? 'disctionary' : 'disctionary_black';
  img = loadImage(`${path}${imageName}.png`);
  imgMint = loadImage(`${path}${imageMintName}.png`);
  imgR = loadImage(`${path}${imageRName}.png`);
  imgDisctionary = loadImage(`${path}${imgDisctionaryName}.png`);
}
function setup() {
  frameRate(24);
  pixelDensity(2.0);
  createCanvas(bgW,bgH);
  HelveticaBlack = loadFont('../font/Monotype  - Helvetica Now Display Black.otf');
  
  background(100);
  marqueeOne = new marquee({height:blockData.marquee.height, width:blockData.marquee.width, speed: marqueeSpeed});
  marqueeTwo = new marquee({height:blockData.marquee.height, width:blockData.marquee.width, speed: marqueeSpeed});
  marqueeTwo.setPositionY(blockData.marquee.height)
  let notesInput = createInput('');
  notesInput.input(notesInputEvent);
  let synonymInput = createInput('');
  synonymInput.input(synonymInputEvent);


  sel = createSelect();
  sel.option('請選擇詞性');
  sel.option('動詞');
  sel.option('名詞');
  sel.selected('請選擇詞性');
  sel.changed(selectChange);

  sel1 = createSelect();
  sel1.option('請選擇詞性');
  sel1.option('形容詞');
  sel1.option('副詞');
  sel1.selected('請選擇詞性');
  sel1.changed(selectChange1);

  img.loadPixels()
  imgDotList = [];
  messageIndex = 0;
  for (let y = 0; y < img.height; y += 3) {
    for (let x = 0; x < img.width; x += 3) {
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
  topGradient = new gradient({startColor:0, startEndGap:30, offset:0, width : blockData.top.width, height:blockData.top.height, x:blockData.marquee.width, y:blockData.top.y, speedAnimate:1});
  mainGradientTop = new gradient({startColor:0, startEndGap:30, offset:150, width : blockData.main.blocks[0].width, height:blockData.main.blocks[0].height, x:blockData.marquee.width, y:blockData.main.blocks[0].y, speedAnimate:1});
  mainGradientBottom = new gradient({startColor:0, startEndGap:30, offset:150, width : blockData.main.blocks[0].width, height:blockData.main.blocks[0].height, x:blockData.marquee.width, y:blockData.main.blocks[1].y, speedAnimate:1});
  
  marqueeGradient = new gradient(
    {
      startColor:0, 
      startEndGap:30, 
      offset:90,
      width : blockData.marquee.width, 
      height:blockData.marquee.height, 
      x:blockData.marquee.x, 
      y:blockData.marquee.y, 
      speedAnimate:1
    }
  );
  nameGradient = new gradient(
    {
      startColor:0, 
      startEndGap:30, 
      offset:50, 
      width : blockData.name.width + 78, 
      height: blockData.name.height, 
      x: blockData.marquee.width , 
      y:blockData.main.blocks[0].y + blockData.main.blocks[0].height - blockData.name.height, 
      speedAnimate:1
    }
  );
  synonymGradient = new gradient(
    {
      startColor:0, 
      startEndGap:30, 
      offset:20, 
      width : bgW * 0.919, 
      height: blockData.synonym.blocks[0].height, 
      x: blockData.marquee.width, 
      y: blockData.top.height + blockData.main.blocks[0].height, 
      speedAnimate:1
    }
  );
}
function notesInputEvent() {
  notes = this.value()
  let notesLength = notes.length;
  if(!cardType){
    notesLength = sin(notesLength % 360) * 360;
    topGradient.reset(notesLength);
    mainGradientTop.reset(notesLength);
    mainGradientBottom.reset(notesLength);
    marqueeGradient.reset(notesLength);
    nameGradient.reset(notesLength);
    synonymGradient.reset(notesLength);
  }
}
function synonymInputEvent() {
  synonym = this.value()
}
function selectChange() {
  let item = this.value();
  if(item != '請選擇詞性'){
    selectContent = item;
  }else{
    selectContent = '';
  }
}
function selectChange1() {
  let item = this.value();
  if(item != '請選擇詞性'){
    selectContent1 = item;
  }else{
    selectContent1 = '';
  }
}
function draw(){
  clear();
  colorMode(RGB, 255, 255, 255, 1);

  drawingContext.shadowBlur = 0;
  smooth();
  background(100);

  drawBoxBackground();
  marqueeOne.draw();
  marqueeTwo.draw();
  marqueeOne.animate();
  marqueeTwo.animate();
  if(cardType)
    drawBlink();
  //drawBackground();
}

function drawBackground() {
  drawLineStroke();
  drawRect();
}
function drawMarqueeBg(){
  const marqueeData = blockData.marquee;

  let alpha = 1;
  if(notes.length!=0 && !cardType)
  {
    marqueeGradient.draw();
    alpha = 0;
  }
  fill(marqueeData.color.r,marqueeData.color.g,marqueeData.color.b, alpha);
  strokeWeight(blockData.stokeWeight);
  stroke(marqueeData.strokeColor);
  rect(marqueeData.x, marqueeData.y, marqueeData.width, marqueeData.height);
}
function drawBoxBackground() {
  stroke(255);
  drawMarqueeBg();
  drawTopBarBg();
  drawMainBg();
  drawNameBg();
  drawSynonymBg();
}
function drawTopBarBg(){
  blockData.top.x = blockData.marquee.width + blockData.marquee.x;
  const topData = blockData.top;
  const marqueeData = blockData.marquee;

  let blockX = marqueeData.width;

  
  let alpha = 1;
  let labelAlpha = 0;
  if(notes.length!=0 && !cardType)
  {
    topGradient.draw();
    alpha = 0;
    labelAlpha = 1;
  }

  topData.blocks.forEach( function(block, index) {
    fill(topData.color.r,topData.color.g,topData.color.b, alpha);
    strokeWeight(blockData.stokeWeight);
    rect(blockX, topData.y, topData.width * block.width, topData.height);
    if(index == 2){
      fill(topData.labelColor)
      rect(blockX, topData.height * 0.7, topData.width * block.width, topData.height * 0.3);
    }
    blockData.top.blocks[index].x = blockX;
    blockX = blockX + topData.width * block.width;
  });


  fill(blockData.textColor);
  strokeWeight(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  textFont('GB18030 Bitmap');
  text('第二宇宙辭典', topData.width * blockData.top.blocks[0].width / 2 + blockData.top.blocks[0].x , topData.height / 2 + 10);
  text('宇宙飛船', topData.width * blockData.top.blocks[1].width / 2 + blockData.top.blocks[1].x, topData.height / 2 + 10);
  textSize(15);
  text('作者 朱宥勳', topData.width * blockData.top.blocks[2].width / 2 + blockData.top.blocks[2].x , topData.height * 0.7 / 2 + 5);
  textFont('Taipei Sans TC');
  fill(blockData.labelTextColor.r,blockData.labelTextColor.g,blockData.labelTextColor.b,alpha);
  textSize(12);
  textStyle(BOLD);
  stroke(blockData.labelTextColor.r,blockData.labelTextColor.g,blockData.labelTextColor.b,labelAlpha);
  strokeWeight(1);
  text('TOKEN ID', topData.width * blockData.top.blocks[2].width / 2 + blockData.top.blocks[2].x , topData.height * 0.85  );
  textFont(HelveticaBlack);
  fill(blockData.textColor);
  strokeWeight(0);
  textSize(70)
  textLeading(10);
  textAlign(LEFT, CENTER);
  let font = '0023';
  for (var b = 0; b< font.length; b++) {
   text(font[b], blockData.top.blocks[3].x + b * 55 + 10, topData.height / 2 - 15); 
  }
}
function drawMainBg(){
  const mainData = blockData.main

  let alpha = 1;
  if(notes.length != 0 && !cardType)
  {
    mainGradientTop.draw();
    mainGradientBottom.draw();
    alpha = 0;
  }


  fill(mainData.color.r,mainData.color.g,mainData.color.b,alpha)
  stroke(mainData.strokeColor);
  strokeWeight(blockData.stokeWeight);
  let marqueeX = blockData.marquee.width;
  mainData.blocks.forEach( function(block, index) {
    // statements
    rect( marqueeX + block.x, block.y, block.width, block.height);
  });


  fill(blockData.textColor);
  strokeWeight(0);
  textSize(18);
  textAlign(CENTER, CENTER);
  textFont('Taipei Sans TC');
  textLeading(200);
  text('註\n釋', marqueeX + mainData.blocks[1].x + mainData.blocks[1].width / 2 , mainData.blocks[1].y + mainData.blocks[1].height / 2);
  textSize(mainTextSize);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  textWrap(CHAR);
  textLeading(mainTextSize * 1.1);
  measureText();
  text(notes, marqueeX + mainData.blocks[2].x + 20, mainData.blocks[2].y + 20, marqueeX + mainData.blocks[2].x  +  mainData.blocks[2].width - 150, mainData.blocks[2].y + mainData.blocks[2].height - 100 )
  textSize(70);
  text('。', bgW - 70, bgH - 70);
  drawMainImg();
}
function drawMainImg(){
  imgDotList.forEach((item)=>{
    fill(blockData.textColor);
    textSize(14);
    strokeWeight(0);
    if(textOpen){
      if(item.x % 4 == 0 && item.y % 4 == 0 && item.y  < maskPointY){
        text(message[messageIndex], item.x * 1.3 + 130 , item.y * 1.3 + 100);  
      }
      strokeWeight(5);
      if( item.y > maskPointY )
        point(item.x * 1.3 + 130, item.y * 1.3 + 100 );
      maskPointY += 0.0005;
    }else{
      if(item.x % 4 == 0 && item.y % 4 == 0 && item.y  > maskPointY){
        text(message[messageIndex], item.x * 1.3 + 130 , item.y * 1.3 + 100);  
      }
      strokeWeight(5);
      if( item.y < maskPointY )
        point(item.x * 1.3 + 130, item.y * 1.3 + 100 );
      maskPointY -= 0.0005;
    }
    messageIndex++;
    messageIndex %= message.length;

    if(maskPointY > imgDotList[imgDotList.length - 1].y || maskPointY < 0)
      textOpen = !textOpen;
  })
  let firstChar = message[0].shift;
  message = message + firstChar;

}
let mainTextSize = 90;
let level = [100, 70, 60, 50, 40, 30, 20, 20, 20, 20];
let lines = [1, 1, 2, 2, 3, 4, 5, 5, 5, 5];
let currentLevel = 0;
let currnTextWidth = 0;

function measureText(){
  currnTextWidth = textWidth(notes);
  if(currnTextWidth > 750*lines[currentLevel] + 400){
    currentLevel++;
    if(currentLevel>=9) currentLevel = 9;
  }else if(currnTextWidth < 750*(lines[currentLevel])/2 + 1200){
    currentLevel--;
    if(currentLevel<=0) currentLevel = 0;
  }
  mainTextSize = level[currentLevel];

  //console.log(`Level: ${level[currentLevel]}  Lines: ${lines[currentLevel]}`);
}

function drawNameBg() {
  let nameBlockData = blockData.name
  let mainBlockOne = blockData.main.blocks[0]
  let positionY,positionX;

  let alpha = 1;
  if(notes.length != 0 && !cardType)
  {
    nameGradient.draw();
    alpha = 0;
  }

  fill(nameBlockData.color.r,nameBlockData.color.g,nameBlockData.color.b, alpha)
  strokeWeight(blockData.stokeWeight);
  nameBlockData.x = blockData.marquee.width;
  positionY = mainBlockOne.y + mainBlockOne.height - nameBlockData.height;
  positionX = nameBlockData.x + nameBlockData.width;
  rect(nameBlockData.x , positionY, nameBlockData.width, nameBlockData.height);
  rect(positionX, positionY, 200, nameBlockData.height);

  fill(blockData.textColor);
  strokeWeight(0);
  textSize(18);
  textAlign(CENTER, CENTER);
  textFont('Taipei Sans TC');
  textLeading(22);
  text('鑄\n造\n者', nameBlockData.width / 2 + nameBlockData.x , nameBlockData.height / 2 + positionY);
  textSize(50);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  text('蛋餅人', nameBlockData.width + nameBlockData.x + 100 , nameBlockData.height / 2 + positionY);
}
function drawSynonymBg() {
  let synonymData = blockData.synonym
  let positionY = blockData.top.height + blockData.main.blocks[0].height;
  let positionX;
  let alpha = 1;
  if(notes.length != 0 && !cardType)
  {
    synonymGradient.draw();
    alpha = 0;
  }

  fill(synonymData.color.r,synonymData.color.g,synonymData.color.b, alpha)
  strokeWeight(blockData.stokeWeight);
  positionX = blockData.marquee.width;
  synonymData.blocks.forEach( function(block, index) {
    // statements
    let y = positionY;
    if(index == 2) {y = y + block.height;}
    synonymData.blocks[index].x = positionX;
    synonymData.blocks[index].y = y;
    rect(positionX, y, block.width, block.height);
    if(index != 1) positionX = positionX + block.width
  });

  fill(blockData.textColor)
  strokeWeight(0);
  textSize(18);
  textAlign(CENTER, CENTER);
  textFont('Taipei Sans TC');
  textLeading(40);
  text('詞\n性', synonymData.blocks[0].x + synonymData.blocks[0].width / 2 , synonymData.blocks[0].y + synonymData.blocks[0].height / 2);
  textLeading(22);
  text('同\n義\n詞', synonymData.blocks[0].x + synonymData.blocks[1].width + synonymData.blocks[0].width + synonymData.blocks[3].width / 2 , synonymData.blocks[0].y + synonymData.blocks[0].height / 2);
  textSize(50);
  text(synonym, synonymData.blocks[0].x + synonymData.blocks[1].width + synonymData.blocks[0].width + synonymData.blocks[3].width + synonymData.blocks[4].width / 2 , synonymData.blocks[0].y + synonymData.blocks[0].height / 2);
  textSize(18);
  textAlign(LEFT, CENTER);
  let selecType = selectContent;
  let selecType1 = selectContent1;
  if(selecType != ''){
    for (var b = 0; b< selecType.length; b++) {
      let space = selecType.length < 3 ? 40 : 20;
      text(selecType[b], synonymData.blocks[0].x + synonymData.blocks[0].width + b * space + 26, synonymData.blocks[0].y + synonymData.blocks[2].height / 2); 
    }
  }else{
    strokeWeight(1);
    stroke(blockData.textColor);
    line(synonymData.blocks[0].x + synonymData.blocks[0].width, synonymData.blocks[0].y, synonymData.blocks[0].x + synonymData.blocks[0].width +  synonymData.blocks[1].width, synonymData.blocks[0].y + synonymData.blocks[1].height);
  }
  if(selecType1 != ''){
    for (var b = 0; b< selecType1.length; b++) {
      let space1 = selecType1.length < 3 ? 40 : 20;
      text(selecType1[b], synonymData.blocks[0].x + synonymData.blocks[0].width  + b * space1 + 26 , synonymData.blocks[0].y + synonymData.blocks[2].height * 1.5);
    }
  }else{
    strokeWeight(1);
    stroke(blockData.textColor);
    line(synonymData.blocks[0].x + synonymData.blocks[0].width, synonymData.blocks[0].y + synonymData.blocks[1].height, synonymData.blocks[0].x + synonymData.blocks[0].width +  synonymData.blocks[1].width, synonymData.blocks[0].y + synonymData.blocks[1].height * 2);
  }

}
function textHeight(text, maxWidth) {
   var words = text.split(' ');
   var line = '';
   var h = this._textLeading;

   for (var i = 0; i < words.length; i++) {
       var testLine = line + words[i] + ' ';
       var testWidth = drawingContext.measureText(testLine).width;

       if (testWidth > maxWidth && i > 0) {
           line = words[i] + ' ';
           h += this._textLeading;
       } else {
           line = testLine;
       }
   }

   return h;
}
function drawRect () {
  let random_i = Math.floor(Math.random() * columns);
  let random_j = Math.floor(Math.random() * rows);
  let random_time = Math.floor(Math.random() * 5) * 150;
  let newArray = [random_i,random_j]
  rectList.push(newArray);
  for(let i = 0; i < rectList.length; i++){
    fill(255);
    rect(rectList[i][0] * w, rectList[i][1] * h, w - 1, h - 1);
  }
  setTimeout(function () {
    rectList.shift();
  },random_time);
}
function drawLineStroke (){
  w = 20;
  h = 60;
  // Calculate columns and rows
  columns = floor(bgW / w);
  rows = floor(bgH / h);

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      fill(0);
      stroke(255);
      rect(i * w, j * h, w - 1, h - 1);
    }
  }
}
function randomRect () {
  let random_i = Math.floor(Math.random() * columns);
  let random_j = Math.floor(Math.random() * rows);
  let random_time = Math.floor(Math.random() * 5) * 150;
  setTimeout(function () {
    fill(255);
    rect(random_i * w, random_j * h, w - 1, h - 1);
  },random_time);
}
function randomFun() {
  let random_i = Math.floor(Math.random() * columns);
  let random_j = Math.floor(Math.random() * rows);
  let random_time = Math.floor(Math.random() * 5) * 150;
  fill(255);
  rect(random_i * w, random_j * h, w - 1, h - 1);
  setTimeout(function () {
    fill(0);
    rect(random_i * w, random_j * h, w - 1, h - 1);
  }, random_time);
}
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
function drawBlink() {
  if (millis() - tiempoInicio > tiempoEspera ) {
    generateBlinkLine(5, 10, 0, 0.2, 50);
    // generateBlinkLine(50, 100, 50, 100, 50);
    // generateBlinkLine(200, 300, 20, 50, 100);
    // generateBlinkLine(200, 300, 80, 100, 100);
    tiempoInicio = millis();
    tiempoEspera = random(200, 2000);
  }

  moveLine((frameCount*10)%height, 3);
  moveLine((frameCount+50)%(height+50), 1);
  moveLine((frameCount*frameCount/10)%(height+50), 10);
}


function generateBlinkLine(h1, h2, a1, a2, blur){
  randomAlpha = random(a1, a2);
  randomHight = blockData.main.blocks[0].height;
  randomY = blockData.main.blocks[0].y;
  drawingContext.shadowColor = color(255);
  drawingContext.shadowBlur = blur;
  fill(255, randomAlpha);
  noStroke();
  rect(blockData.marquee.width, randomY, width - blockData.marquee.width, randomHight);
}

function moveLine(posY, h){
  let alpha = random(0,0.5);
  fill(255, alpha);
  noStroke();
  rect(blockData.marquee.width, posY, width, h);
}



class marquee {
  constructor({ height = 500, width = 40, speed = 1} = {}){
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.x = 0; 
    this.y = 10;
    this.padding_top = 0;
    this.mint = {
      width:0,
      height:0,
      x:0,
      y:0
    };
    this.r = {
      width:0,
      height:0,
      x:0,
      y:0
    };
    this.disctionary = {
      width:0,
      height:0,
      x:0,
      y:0
    };
  }
  draw(){
    this.mint.width = this.width * 0.7;
    this.mint.height = this.height * 0.3;
    this.mint.x = (this.width -  this.mint.width)/2;
    this.mint.y = (this.width -  this.mint.width)/2 + this.padding_top + this.y;
    this.r.width = this.width * 0.6;
    this.r.height = this.height * 0.05;
    this.r.x = (this.width - this.r.width)/2;
    this.r.y = this.mint.height + this.mint.y;
    this.disctionary.width = this.width * 0.7;
    this.disctionary.height = this.height * 0.6;
    this.disctionary.x = (this.width - this.disctionary.width)/2;
    this.disctionary.y = this.r.height + this.r.y;
    image(imgMint, this.mint.x , this.mint.y, this.mint.width, this.mint.height);
    image(imgR,this.r.x, this.r.y, this.r.width , this.r.height);
    image(imgDisctionary, this.disctionary.x, this.disctionary.y, this.disctionary.width, this.disctionary.height);
  }
  animate(){
    let currentY = this.getPositionY();
    currentY = currentY -= this.speed;
    this.setPositionY();
    if(currentY < blockData.marquee.height * -1){
      this.setPositionY(blockData.marquee.height);
    }else{
      this.setPositionY(currentY);
    }
  }
  getPositionY(){
    return this.y;
  }
  setPositionY(num){
    this.y = num;
  }
  setHeight(num){
    this.height = num;
  }
  getHeight(){
    return this.height;
  }
}

class gradient {
  constructor({startColor = 0,startEndGap = 30,offset = 0, width, height, x, y, speedAnimate } = {}){
    this.startEndGap = startEndGap;
    this.startColor = startColor + offset;
    this.endColor = startColor + startEndGap;
    this.offset = offset;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedAnimate = speedAnimate;
  }
  draw(){
    if(this.startColor > this.startEndGap || this.startColor < 0) {
      this.speedAnimate *= -1;
    } 
    this.startColor += this.speedAnimate ;
    let gap = 0;
    let numRectangles = this.width;
    let rectWidth = this.width / numRectangles;
    colorMode(HSB, 360, 100, 100);
    strokeWeight(0);
    for (let x = 0; x < this.width; x += gap + rectWidth) {
      let color = map(x, this.x, this.x + this.width , this.startColor, this.endColor);
      fill(color,100,100);
      rect(this.x + x, this.y, this.width, this.height);
    }
    colorMode(RGB, 255, 255, 255, 1);

  }
  reset(startColor){
    this.startColor = (startColor + random(0, 360)) % 360;
    this.endColor = this.startColor + this.startEndGap;
  }
}