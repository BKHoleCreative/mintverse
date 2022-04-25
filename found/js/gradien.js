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