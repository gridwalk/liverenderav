var bgPattern = {
  _box:null,
  _mainSmallBox:null,
  boxes:[],
  boxCursor:0,
  boxCounter:0,
  boxDirection:0,
  boxAmount:0,
  visible:false,
  _style:null,

  init:function(){

    this._box = createEl('div','',{
      class:'bg-pattern container'
    })

    _main.appendChild(this._box)

    // append boxes
    var xCount = Math.floor(window.innerWidth/100)
    var yCount = Math.floor(window.innerHeight/100)
    this.boxAmount = (yCount * xCount)

    // append the small boxes
    for (var i = this.boxAmount - 1; i >= 0; i--) {
      _smallBox = createEl('div','',{
        class:'small-box'
      })

      // append inner box
      _innerBox = createEl('div','',{
        class:'inner'
      })

      _smallBox.appendChild(_innerBox)
      this._box.appendChild(_smallBox)
      this.boxes.push(_smallBox)
    }

    this._style = document.createElement('style')
    document.querySelector('head').appendChild(this._style)

  },
  draw:function(){

    if( valueChanged(this,'bgVisible') ){      
      if( state.bgVisible ){
        this._box.classList.remove('hidden')
        return
      }else{
        this._box.classList.add('hidden')
      }
    }

    if( !state.bgVisible ){
      return
    }
    
    this.boxCounter++
    if( this.boxCounter >= state.boxSpeed ){
      this.boxCounter = 0
      this.boxCursor++
      if( this.boxCursor == this.boxes.length ){ 
        this.boxCursor = 0
        this.boxDirection = !this.boxDirection
      }
      if(this.boxDirection){
        this.boxes[this.boxCursor].classList.add('active')  
      }else{
        this.boxes[this.boxCursor].classList.remove('active')
      }
    }

    // update style of bg boxes
    if( valueChanged(this, 'boxSpeed') || valueChanged(this, 'boxMin') || valueChanged(this, 'boxMax')){

      var speed = state.boxSpeed / 10
      var boxMin = state.boxMin / 10
      var boxMax = state.boxMax / 10

      this._style.innerHTML = '.small-box .inner{transition-duration:'+speed+'s; width:'+boxMin+'vw; height:'+boxMin+'vw;}.small-box.active .inner{ width:'+boxMax+'vw; height:'+boxMax+'vw;}}'

    }

  }
}