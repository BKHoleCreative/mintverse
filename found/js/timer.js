class Timer {
	constructor( {delay = 500} = {}){
		this.timer = 0;
		this.delay = delay;
		this.tiempoInicio = 0;
		this.state = 0;
	}
	timeCount(time){
		if (millis() - this.tiempoInicio > time) {
		 	this.state = 1;
		  	this.tiempoInicio = millis();
		}
	}
	stopTime(){
		this.state = 0;
	}
	getState(){
		return this.state;
	}

}