class timer {
    constructor(time, x, y){
      this.time=time
      this.x = x
      this.y = y
    }
    show(){
      textSize(100)
      fill('gray')
      text(this.time, this.x, this.y)
    }
  }  
  