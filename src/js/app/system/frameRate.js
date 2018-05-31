var frameRate = {
  _box:null,
  now:null,
  then:null,
  values:[],

  init:function(){

    this._box = createEl({
      type:   'div',
      parent: '#main',
      class:  'fps'
    })

  },

  draw:function(){
    this.now = new Date()
    var fps = Math.floor(1000 / (this.now - this.then))
    
    this.values.push(fps)
    if( this.values > 10 ){
      this.values.shift()
    }

    this.then = this.now

    var sum = this.values.reduce(function(a, b) { return a + b; })
    var avg = Math.floor(sum / this.values.length)

    this._box.innerHTML = avg
  }
}