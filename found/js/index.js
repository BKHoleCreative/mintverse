let cardType = true;
const SearchURL = new URL(window.location.href);
let params = SearchURL.searchParams;
if(params.has('normal')) cardType = false;

let bgW = 800, bgH = 800;
let backgroundColor = cardType ? {h:0,s:0,b:0} : {h:12,s:95,b:96};
let imgMint, imgR, imgDisctionary, marqueeOne, marqueeTwo , HelveticaBlack, TaipeiSanc, VT323;
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
let message = "0x7cEaD04E4D41eDcd765154add180CD73951D2275";
let messageIndex = 0;
let maskPointY = 0;
let textOpen = true;

// gradiant animation

let topGradient,mainGradientTop,mainGradientBottom,marqueeGradient,nameGradient, synonymGradient;
let topFlash, nameFlash, marqueeFlash, mainFlashTop, mainFlashBottom, synonymFlash;
let marqueeTimer, nameTimer, topTimer, mainTopTimer, mainBottomTimer, synonymTimer;

// blink
let blinkArr = [];

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
  VT323 = loadFont('../font/VT323-Regular.ttf')
}
function setup() {
  //canvas setting
  frameRate(24);
  pixelDensity(2.0);
  createCanvas(bgW,bgH);
  HelveticaBlack = loadFont('../font/Monotype  - Helvetica Now Display Black.otf');
  
  marqueeTimer = new Timer();
  nameTimer = new Timer(); 
  topTimer = new Timer(); 
  mainTopTimer = new Timer(); 
  mainBottomTimer = new Timer();
  synonymTimer = new Timer();

  marqueeOne = new marquee({height:blockData.marquee.height, width:blockData.marquee.width, speed: marqueeSpeed});
  marqueeTwo = new marquee({height:blockData.marquee.height, width:blockData.marquee.width, speed: marqueeSpeed});
  marqueeTwo.setPositionY(blockData.marquee.height)
  let notesInput = createInput('').attribute('placeholder', '請輸入註釋');
  notesInput.input(notesInputEvent);
  let synonymInput = createInput('').attribute('placeholder', '請輸入同義詞');
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
  topFlash = new lightBlink({
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
      distance: blockData.name.width + 200,
      direction:'right',
      h : blockData.name.width + 200, 
      w: blockData.name.height, 
      x: blockData.marquee.width , 
      y: blockData.main.blocks[0].y + blockData.main.blocks[0].height - blockData.name.height, 
      speed:50
    }
  );
 
  synonymFlash = new lightBlink(
    {
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
}
function randomColor(h){
  
  return (h + random(0, 360)) % 360;
}
function notesInputEvent() {
  notes = this.value()
  let notesLength = notes.length;
  if(!cardType && notesLength!=0){
    notesLength = sin(notesLength % 360) * 360;
    backgroundColor.h = notesLength;
    backgroundColor.s = 30;

    let colorNum = randomColor(notesLength)
    for (var i = 0; i < 5; i++) {
      let colorNum = random(0,200);
      let offset = random(20,40);
      if(i == 0){
        topFlash.setColor({h:colorNum,s:100,b:100});
        blockData.top.color = HSVtoRGB(colorNum + offset,100,100);
      }else if(i == 1){
        nameFlash.setColor({h:colorNum,s:100,b:100});
        blockData.name.color = HSVtoRGB(colorNum + offset,100,100);
      }else if(i == 2){
        marqueeFlash.setColor({h:colorNum,s:100,b:100});
        blockData.marquee.color = HSVtoRGB(colorNum + offset,100,100); 
      }else if(i == 3){
        mainFlashTop.setColor({h:colorNum,s:100,b:100});
        mainFlashBottom.setColor({h:colorNum,s:100,b:100});
        blockData.main.color = HSVtoRGB(colorNum + offset,100,100);
      }else if(i == 4){
        synonymFlash.setColor({h:colorNum,s:100,b:100});
        blockData.synonym.color = HSVtoRGB(colorNum + offset,100,100);
      }

    }

    // topGradient.reset(notesLength);
    // mainGradientTop.reset(notesLength);
    // mainGradientBottom.reset(notesLength);
    // marqueeGradient.reset(notesLength);
    // nameGradient.reset(notesLength);

    // synonymGradient.reset(notesLength);
  } else {
    blockData.top.color = {r:247,g:61,b:11};
    blockData.name.color = {r:247,g:61,b:11};
    blockData.marquee.color = {r:247,g:61,b:11};
    blockData.main.color = {r:247,g:61,b:11};
    blockData.synonym.color = {r:247,g:61,b:11};
  }

  measureText();
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
    colorMode(HSB);

    drawingContext.shadowBlur = 0;
    smooth();
    background(backgroundColor.h,backgroundColor.s,backgroundColor.b);

    colorMode(RGB, 255, 255, 255, 1);
    drawBoxBackground();
    marqueeOne.draw();
    marqueeTwo.draw();
    marqueeOne.animate();
    marqueeTwo.animate();
    if(cardType)
      drawBackground();

  
}

function drawBackground() {
  //drawLineStroke();
  moveLine((frameCount*10)%height, 3);
  moveLine((frameCount+50)%(height+50) , 1);
  moveLine((frameCount*frameCount/10)%(height+50), 10);
  drawRect();
}
function drawMarqueeBg(){
  const marqueeData = blockData.marquee;

  let alpha = 1;
  
  fill(marqueeData.color.r,marqueeData.color.g,marqueeData.color.b, alpha);
  strokeWeight(blockData.stokeWeight);
  stroke(marqueeData.strokeColor);
  rect(marqueeData.x, marqueeData.y, marqueeData.width, marqueeData.height);

  if(notes.length!=0 && !cardType)
  {
    if(marqueeFlash.getState() == 0){
      //this.init();
      let wait = random(200,300);
      
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

  
  let alpha = 0;
  let labelAlpha = 1;
  
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
  if(notes.length!=0 && !cardType)
  {
    //topGradient.draw();

    if(topFlash.getState() == 0){
      if(topTimer.getState()){
         topFlash.restart();
         topTimer.stopTime();
      }else{
        let wait = random(5000,10000);
        topTimer.timeCount(wait);
      }        
    }
    topFlash.animation();
    //alpha = 0;
    //labelAlpha = 1;
  }

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
  colorMode(HSB);
  fill(backgroundColor.h, backgroundColor.s, backgroundColor.b);
  //fill(blockData.labelTextColor.r,blockData.labelTextColor.g,blockData.labelTextColor.b,labelAlpha);
  strokeWeight(1);
  text('TOKEN ID', topData.width * blockData.top.blocks[2].width / 2 + blockData.top.blocks[2].x , topData.height * 0.85  );
  colorMode(RGB);
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



  fill(mainData.color.r,mainData.color.g,mainData.color.b,alpha)
  stroke(mainData.strokeColor);
  strokeWeight(blockData.stokeWeight);
  let marqueeX = blockData.marquee.width;
  mainData.blocks.forEach( function(block, index) {
    // statements
    rect( marqueeX + block.x, block.y, block.width, block.height);
  });

  if(notes.length != 0 && !cardType)
  {

    if(mainFlashTop.getState() == 0){
      if(mainTopTimer.getState()){
         mainFlashTop.restart();
         mainTopTimer.stopTime();
      }else{
        let wait = random(5000,10000);
        mainTopTimer.timeCount(10000);
      }     
     
    }
    if(mainFlashBottom.getState() == 0){
      if(mainBottomTimer.getState()){
         mainFlashBottom.restart();
         mainBottomTimer.stopTime();
      }else{
        let wait1 = random(5000,10000);
        mainBottomTimer.timeCount(wait1);
      }     
     
    }
    mainFlashTop.animation();
    mainFlashBottom.animation();
  }


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
  
  text(notes, marqueeX + mainData.blocks[2].x + 20, mainData.blocks[2].y + 20, marqueeX + mainData.blocks[2].x  +  mainData.blocks[2].width - 150, mainData.blocks[2].y + mainData.blocks[2].height - 100 )
  textSize(70);
  text('。', bgW - 70, bgH - 70);
  drawMainImg();
}
function drawMainImg(){
  imgDotList.forEach((item)=>{
    fill(blockData.textColor);
    textFont(VT323);
    textSize(20);
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
  let length = notes.length;
  textSize(mainTextSize);
  currnTextWidth = textWidth(notes);
  if(currnTextWidth > 750*lines[currentLevel] + 200 && length > oldLength){
    oldLength = notes.length
    currentLevel++;
    if(currentLevel>=9) currentLevel = 9;
  }else if(currnTextWidth < 750*(lines[currentLevel])/2 + 200 && length < oldLength){
    oldLength = notes.length
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

  fill(nameBlockData.color.r,nameBlockData.color.g,nameBlockData.color.b, alpha)
  strokeWeight(blockData.stokeWeight);
  nameBlockData.x = blockData.marquee.width;
  positionY = mainBlockOne.y + mainBlockOne.height - nameBlockData.height;
  positionX = nameBlockData.x + nameBlockData.width;
  rect(nameBlockData.x , positionY, nameBlockData.width, nameBlockData.height);
  rect(positionX, positionY, 200, nameBlockData.height);

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
        let wait = random(5000,10000);
        nameTimer.timeCount(wait);
      }    
      
    }
    nameFlash.animation();

    alpha = 0;
  }

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

  if(notes.length != 0 && !cardType)
  {
    if(synonymFlash.getState() == 0){

      if(synonymTimer.getState()){
         synonymFlash.restart();
         synonymTimer.stopTime();
      }else{
        let wait = random(5000,10000);
        synonymTimer.timeCount(wait);
      }    
      synonymFlash.restart();
      
    }
    synonymFlash.animation();
  }


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
  textAlign(LEFT, CENTER);
  text(synonym, synonymData.blocks[0].x + synonymData.blocks[1].width + synonymData.blocks[0].width + synonymData.blocks[3].width + 20 , synonymData.blocks[0].y + synonymData.blocks[0].height / 2);
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





let w;
let h;
let columns;
let rows;
let rectList = [];
function drawRect () {

    for(let i = 0; i < blinkArr.length; i++){
      colorMode(RGB);
      drawingContext.shadowBlur = 50;
      drawingContext.shadowColor = color(255);
      fill(255,blinkArr[i][4]);
      rect(blinkArr[i][0] , blinkArr[i][1], blinkArr[i][2], blinkArr[i][3]);
    }
} 
function setTimeGap(){
  let time = getRandom(500,600);
  let num = getRandom(1, 4);
  setTimeout(function () {
      for(let i = 0; i < num; i++){
        let index = getRandom(0, 14);
        let alpha = Math.random(0,1);
        alpha = alpha > 0.5 ? 0 : 0.3;
        blinkArr[index][4] = alpha;

        setTimeout(function() {
          blinkArr[index][4] = 0;
        },getRandom(500,1000))
      }
      setTimeGap();
  },time);
}

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};
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
  let random_time = Math.floor(Math.random() * 5) * 1500;
  setTimeout(function () {
    fill(255);
    rect(random_i * w, random_j * h, w - 1, h - 1);
  },random_time);
}
function randomFun() {
  let random_i = Math.floor(Math.random() * columns);
  let random_j = Math.floor(Math.random() * rows);
  let random_time = random(50, 200);
  setTimeout(function () {
    fill(255);
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = color(255);
    rect(random_i * w, random_j * h, w - 1, h - 1);
  }, random_time);
}
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
function drawBlink() {
  if (millis() - tiempoInicio > tiempoEspera ) {
    const topData = blockData.top;
    const marqueeData = blockData.marquee;
    let blockX = marqueeData.width;
    const mainData = blockData.main
    let marqueeX = blockData.marquee.width;
    // main block blink
    mainData.blocks.forEach( function(block, index) {
      // statements
      generateBlinkLine(
        block.width, 
        block.height, 
        marqueeX + block.x,
        block.y, 
        0,
        0.2, 
        50
      );
    });


    // top blink
    topData.blocks.forEach( function(block, index) {
      generateBlinkLine(topData.width * block.width, topData.height, blockX, topData.y,0 ,0.2, 50 );
      if(index == 2){
        generateBlinkLine(topData.width * block.width, topData.height * 0.3, blockX, topData.height * 0.7,0 ,0.2, 50 );
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
      let y = positionY;
      if(index == 2) {y = y + block.height;}
      synonymData.blocks[index].x = positionX;
      synonymData.blocks[index].y = y;
      generateBlinkLine(block.width, block.height, positionX, y, 0 ,0.2, 50)
      if(index != 1) positionX = positionX + block.width
    });

    //generateBlinkLine(5, 10, 0, 0.2, 50);
    // generateBlinkLine(50, 100, 50, 100, 50);
    // generateBlinkLine(200, 300, 20, 50, 100);
    // generateBlinkLine(200, 300, 80, 100, 100);
    tiempoInicio = millis();
    tiempoEspera = random(200, 1500);
  }
}


function generateBlinkLine(width, height, x, y, a1, a2, blur){
  randomAlpha = random(a1, a2);
  randomY = blockData.main.blocks[0].y;
  drawingContext.shadowColor = color(255);
  drawingContext.shadowBlur = blur;
  fill(255, randomAlpha);
  noStroke();
  rect(x, y, width, height);
}

function moveLine(posY, h){
  let alpha = random(0,0.5);
  fill(255, alpha);
  noStroke();
  rect(blockData.marquee.width, posY, width, h);
}

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function setBlinkData (){
    const topData = blockData.top;
    const marqueeData = blockData.marquee;
    let blockX = marqueeData.width;
    const mainData = blockData.main
    let marqueeX = blockData.marquee.width;
    // main block blink
    mainData.blocks.forEach( function(block, index) {
      blinkArr.push([marqueeX + block.x,block.y,block.width,block.height, 0])
    });


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
      let y = positionY;
      if(index == 2) {y = y + block.height;}
      synonymData.blocks[index].x = positionX;
      synonymData.blocks[index].y = y;
      blinkArr.push([positionX, y, block.width, block.height, 0] );
      
      if(index != 1) positionX = positionX + block.width
    });

    //
    let nameBlockData = blockData.name
    let mainBlockOne = blockData.main.blocks[0]
    let positionY1,positionX1;

    let alpha = 1;

    fill(nameBlockData.color.r,nameBlockData.color.g,nameBlockData.color.b, alpha)
    strokeWeight(blockData.stokeWeight);
    nameBlockData.x = blockData.marquee.width;
    positionY1 = mainBlockOne.y + mainBlockOne.height - nameBlockData.height;
    positionX1 = nameBlockData.x + nameBlockData.width;
    blinkArr.push([ nameBlockData.x, positionY1, nameBlockData.width, nameBlockData.height, 0]);
    blinkArr.push([ positionX1, positionY1, 200, nameBlockData.height, 0])
  

    blinkArr.push([ marqueeData.x, marqueeData.y, marqueeData.width, marqueeData.height, 0 ])
}

