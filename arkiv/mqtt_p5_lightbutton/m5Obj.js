class m5Obj {
    constructor(id, on, time, x, y) {
        this.id = id
        this.on = on
        this.x = x
        this.y = y
        this.time = time
        this.millis = 0
        this.win = false
      }   
      show () {
        noStroke()
        textSize(32)
        fill('black')
        text(this.id + ': ' + this.on, this.x+80,this.y)
        if(this.on) text(this.time, this.x+80, this.y+40)
        let col = this.on ? 'green' : 'red'
        if(this.win) col = 'orange'
        fill(col)
        ellipse(this.x,this.y,80)
      }
    }