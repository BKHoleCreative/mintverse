let w;
let h;
let columns;
let rows;
let bgW = 800, bgH = 800;
let rectList = [];
let imgMint, imgR, imgDisctionary, marqueeOne, marqueeTwo , HelveticaBlack, TaipeiSanc;
let blockData = {
  stokeWeight:1,
  marquee:{
    width: bgW * 0.08,
    height: bgH,
    x: 0,
    y: 0,
    color: 0,
    stokeColor: 255
  },
  top:{
    color: 0,
    stokeColor: 255,
    x: 0,
    y: 0,
    height: bgH * 0.088,
    width: bgW * 0.92,
    labelColor:255,
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
    color: 0,
    strokeColor: 255,
    blocks:[
      {
        width: bgW * 0.92,
        height: bgH * 0.494,
        y: bgH * 0.088,
        x: 0
      },
      {
        width: bgW * 0.054,
        height: bgH * 0.307,
        y: bgH * 0.106 + bgH * 0.088 + bgH * 0.494,
        x: 0
      },
      {
        width: bgW * 0.866,
        height: bgH * 0.307,
        y: bgH * 0.106 + bgH * 0.088 + bgH * 0.494,
        x: bgW * 0.054
      }
    ]
  },
  synonym: {
    color:0,
    strokeColor: 255,
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
        width:bgW * 0.67,
        height: bgH * 0.106,
      }
    ],
    textColor:255
  },
  name:{
    color:0,
    stokeColor: 255,
    height: bgH * 0.106,
    width: bgW * 0.054,
    x: 0,
    y: 0,
    inputData:'蛋餅人' 
  }
}
let notes = '';

function setup() {
  pixelDensity(3.0);
  createCanvas(bgW,bgH);
  HelveticaBlack = loadFont('../font/Monotype  - Helvetica Now Display Black.otf');
  imgMint = createImg('https://hobeselect.com/mintverse/mint.png');
  imgR = createImg('https://hobeselect.com/mintverse/r.png');
  imgDisctionary = createImg('https://hobeselect.com/mintverse/disctionary.png');
  background(100);
  marqueeOne = new marquee();
  marqueeTwo = new marquee();
 
  let notesInput = createInput('');
  notesInput.input(notesInputEvent);
  
}
function notesInputEvent() {
  notes = this.value()
  console.log('you are typing: ', notes);
}
function draw(){
  background(100);
  fill(0);
  rect(0, 0, bgW, bgH);
  drawBoxBackground();
  marqueeOne.draw();
  // marquee.height = marquee.height > 0 ? marquee.height -= 1 : bgH;
  
  //drawBackground();
}

function drawBackground() {
  drawLineStroke();
  drawRect();
}
function drawMarqueeBg(){
  const marqueeData = blockData.marquee
  fill(marqueeData.color);
  strokeWeight(blockData.stokeWeight);
  stroke(marqueeData.stokeColor);
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
  topData.blocks.forEach( function(block, index) {
    fill(topData.color);
    strokeWeight(blockData.stokeWeight);
    rect(blockX, topData.y, topData.width * block.width, topData.height);
    if(index == 2){
      fill(topData.labelColor)
      rect(blockX, topData.height * 0.7, topData.width * block.width, topData.height * 0.3);
    }
    blockData.top.blocks[index].x = blockX;
    blockX = blockX + topData.width * block.width;
  });


  fill(255);
  strokeWeight(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  textFont('GB18030 Bitmap');
  text('第二宇宙辭典', topData.width * blockData.top.blocks[0].width / 2 + blockData.top.blocks[0].x , topData.height / 2 + 10);
  text('宇宙飛船', topData.width * blockData.top.blocks[1].width / 2 + blockData.top.blocks[1].x, topData.height / 2 + 10);
  textSize(15);
  text('作者 朱宥勳', topData.width * blockData.top.blocks[2].width / 2 + blockData.top.blocks[2].x , topData.height * 0.7 / 2 + 5);
  textFont(HelveticaBlack);
  textSize(70)
  textLeading(10);
  textAlign(LEFT, CENTER);
  let font = '0023';
  for (var b = 0; b< font.length; b++) {
   text(font[b], blockData.top.blocks[3].x + b * 50 + 10, topData.height / 2 - 15); 
  }
}
function drawMainBg(){
  const mainData = blockData.main
  fill(mainData.color)
  strokeWeight(blockData.stokeWeight);
  let marqueeX = blockData.marquee.width;
  mainData.blocks.forEach( function(block, index) {
    // statements
    rect( marqueeX + block.x, block.y, block.width, block.height);
  });


  fill(255);
  strokeWeight(0);
  textSize(18);
  textAlign(CENTER, CENTER);
  textFont('Taipei Sans TC');
  textLeading(200);
  text('註\n釋', marqueeX + mainData.blocks[1].x + mainData.blocks[1].width / 2 , mainData.blocks[1].y + mainData.blocks[1].height / 2);
  textSize(90);
  textAlign(LEFT, TOP);
  textWrap(CHAR);
  textLeading(100);
  let t = text(notes, marqueeX + mainData.blocks[2].x + 20, mainData.blocks[2].y + 20, marqueeX + mainData.blocks[2].x  +  mainData.blocks[2].width - 150, mainData.blocks[2].y + mainData.blocks[2].height - 100 )
  console.log(t);
}
function drawNameBg() {
  let nameBlockData = blockData.name
  let mainBlockOne = blockData.main.blocks[0]
  let positionY,positionX;
  fill(nameBlockData.color)
  strokeWeight(blockData.stokeWeight);
  nameBlockData.x = blockData.marquee.width;
  positionY = mainBlockOne.y + mainBlockOne.height - nameBlockData.height;
  positionX = nameBlockData.x + nameBlockData.width;
  rect(nameBlockData.x , positionY, nameBlockData.width, nameBlockData.height);
  rect(positionX, positionY, 200, nameBlockData.height);

  fill(255);
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
  fill(synonymData.color)
  strokeWeight(blockData.stokeWeight);
  positionX = blockData.marquee.width;
  synonymData.blocks.forEach( function(block, index) {
    // statements
    let y = positionY;
    if(index == 2) y = y + block.height;
    synonymData.blocks[index].x = positionX;
    synonymData.blocks[index].y = y;
    rect(positionX, y, block.width, block.height);
    if(index != 2) positionX = positionX + block.width
  });

  fill(synonymData.textColor)
  strokeWeight(0);
  textSize(18);
  textAlign(CENTER, CENTER);
  textFont('Taipei Sans TC');
  textLeading(40);
  text('詞\n性', synonymData.blocks[0].x + synonymData.blocks[0].width / 2 , synonymData.blocks[0].y + synonymData.blocks[0].height / 2);
  textLeading(22);
  text('同\n義\n詞', synonymData.blocks[0].x + synonymData.blocks[1].width + synonymData.blocks[0].width + synonymData.blocks[3].width / 2 , synonymData.blocks[0].y + synonymData.blocks[0].height / 2);
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

class marquee {
  constructor({ height = 500} = {}){
    this.width = 40;
    this.height = height;
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