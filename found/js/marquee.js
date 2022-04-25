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