class Sprite {
	constructor(p5, animation, x, y, width, height, speed){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.animation = animation;
		this.len = this.animation.length;
		this.speed = speed;
		this.index = 0;
		this.p5 = p5; 
	}
	show(){
		this.p5.image(this.animation[this.index % this.len], this.x, this.y, this.width, this.height);
	}
	animate(y) {
		this.y = y;
		this.index += this.speed;
	}
}