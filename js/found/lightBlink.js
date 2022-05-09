class lightBlink {
  constructor({ p5, direction = 'left', color = { h:300,s:100,b:100}, w = 50, h = 100, x = 200, y = 230, distance = 100, speed = 1, loop = 0, alpha = 1, solid = 1 } = {})   {
    this.p5 = p5;
    this.direction =  direction;
    this.startColor = color;
    this.endColor = color + 20;
    this.width = w;
    this.height = h;
    this.startX = direction == 'right' ? x - h : x;
    this.startY = direction == 'down' ? y - h : y;
    this.x = x;
    this.y = y;
    this.distance = distance;
    this.speed = speed;
    this.loop = loop;
    this.playState = 0;
    this.alpha = alpha;
    this.solid = solid;
  }
  init(direction,x,y,w,h,distance,speed,solid,alpha,){
    this.direction = direction;
    this.x = x;
    this.y = y;
    this.distance = distance;
    this.h = h;
    this.w = w;
    this.speed = speed;
    this.solid = solid;
    this.alpha = alpha;
  }
  setColor(color){
    this.startColor = color;
    this.endColor = color + 20;
  }
  draw(){
    this.p5.colorMode(this.p5.HSB,360,100,100);
    this.p5.strokeWeight(0);
    let alpha
    let alphaStart = this.alpha, alphaEnd = 0;
    let endposition
    let solidSize = 2 * this.solid ;
    for (let i = 0; i < this.height ; i += 1) {
      
      if(this.direction == 'right' || this.direction == 'left'){
        if(this.direction == 'right'){
          
          if(i <= this.height / solidSize){
             alpha = this.p5.map(this.x + i, this.x , this.x + this.height / solidSize , alphaEnd, alphaStart); 
          }
          else if (i >= this.height - this.height / solidSize ){
            alpha = this.p5.map(this.x + i, this.x + this.height - this.height / solidSize , this.x + this.height , alphaStart, alphaEnd); 
          
          }else if( i > this.height / solidSize && i < this.height -this.height / solidSize){
              alpha = this.p5.map(this.x + i, this.x + this.height / solidSize , this.x + this.height - this.height / solidSize , this.alpha, this.alpha); 
          }
          
          // 單色
          // alpha = map(this.x + i, this.x , this.x + this.height / solidSize , alphaEnd, alphaStart);
          
          endposition = this.startX + this.distance * 2;
          if(this.x + i > endposition || this.x + i  < this.startX + this.height )
            alpha = 0;
        }
        else{
          
          if(i <= this.height / solidSize){
             alpha = this.p5.map(this.x + i, this.x , this.x + this.height / solidSize , alphaEnd, alphaStart); 
          }
          else if (i >= this.height - this.height / solidSize ){
            alpha = this.p5.map(this.x + i, this.x + this.height - this.height / solidSize , this.x + this.height , alphaStart, alphaEnd); 
          
          }else if( i > this.height / solidSize && i < this.height -this.height / solidSize){
              alpha = this.p5.map(this.x + i, this.x + this.height / solidSize , this.x + this.height - this.height / solidSize , this.alpha, this.alpha); 
          }
          
          // 單色
          // alpha = map(this.x + i, this.x, this.x + this.height , alphaStart, alphaEnd);
          
          endposition = this.startX - this.distance;
          
          if(this.x + i  < endposition || this.x + i  > this.startX )
            alpha = 0;
        }
        this.p5.fill(this.startColor.h,this.startColor.s,this.startColor.b,alpha);
        this.p5.rect(this.x + i , this.y , 1, this.width);
      } else {
        if(this.direction == 'up'){
          
          if(i <= this.height / solidSize){
             alpha = this.p5.map(this.y + i, this.y , this.y + this.height / solidSize , alphaEnd, alphaStart); 
          }
          else if (i >= this.height - this.height / solidSize ){
            alpha = this.p5.map(this.y + i, this.y + this.height - this.height / solidSize , this.y + this.height , alphaStart, alphaEnd); 
          
          }else if( i > this.height / solidSize && i < this.height -this.height / solidSize){
              alpha = this.p5.map(this.y + i, this.y + this.height / solidSize , this.y + this.height - this.height / solidSize , this.alpha, this.alpha); 
          }
          
          
          endposition = this.startY - this.distance ;
          //單色
          // alpha = map(this.y + i, this.y, this.y + this.height , alphaStart, alphaEnd);
          if(this.y + i < endposition ||  this.y + i  > this.startY)
            alpha = 0;
        }
        else{
          
          if(i <= this.height / solidSize){
             alpha = this.p5.map(this.y + i, this.y , this.y + this.height / solidSize , alphaEnd, alphaStart); 
          }
          else if (i >= this.height - this.height / solidSize ){
            alpha = this.p5.map(this.y + i, this.y + this.height - this.height / solidSize , this.y + this.height , alphaStart, alphaEnd); 
          
          }else if( i > this.height / solidSize && i < this.height -this.height / solidSize){
              alpha = this.p5.map(this.y + i, this.y + this.height / solidSize , this.y + this.height - this.height / solidSize , this.alpha, this.alpha); 
          }
          
          // alpha = map(this.y + i, this.y, this.y + this.height , alphaEnd, alphaStart);
          endposition = this.startY + this.distance * 2;
          if(this.y + i > endposition || this.y + i  < this.startY + this.height)
            alpha = 0;
        }
        this.p5.fill(this.startColor.h,this.startColor.s,this.startColor.b,alpha);
        this.p5.rect(this.x , this.y + i, this.width, 1 );
      }
    }
    
  }
  animation(){
    if(this.playState != 1 && this.loop == 0)return;
    this.playState = 1;
    this.draw();
    let endposition;
    switch(this.direction) {
      case 'up':
        endposition = this.startY - this.distance;
        if(this.y + this.height > endposition)
          this.y -= this.speed;
        else
          this.stop();
        break;
      case 'left':
        endposition = this.startX - this.distance;
        if(this.x + this.height > endposition)
          this.x -= this.speed
        else
          this.stop();
        break;
      case 'right':
        endposition = this.startX + this.distance * 2;
        if(this.x < endposition)
          this.x += this.speed;
        else
          this.stop();
        break;
      case 'down':
        endposition = this.startY + this.distance * 2;
        if(this.y < endposition)
          this.y += this.speed;
        else
          this.stop();
        break;
      default:
    }
    this.p5.colorMode(this.p5.RGB);
  }
  resetPosition(){
    this.x = this.startX;
    this.y = this.startY;
  }
  setLong(value){
    this.height = value;
  }
  stop(){
    this.playState = 0;
  }
  restart(){
    this.playState = 1;
    this.resetPosition();
  }
  getState(){
    return this.playState;
  }
}