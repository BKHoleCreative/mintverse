class Timer {
	constructor( {p5, delay = 500} = {}){
		this.p5 = p5;
		this.timer = 0;
		this.delay = delay;
		this.tiempoInicio = 0;
		this.state = 0;
	}
	timeCount(time){
		if (this.p5.millis() - this.tiempoInicio > time) {
		 	this.state = 1;
		  	this.tiempoInicio = this.p5.millis();
		}
	}
	stopTime(){
		this.state = 0;
	}
	getState(){
		return this.state;
	}

}