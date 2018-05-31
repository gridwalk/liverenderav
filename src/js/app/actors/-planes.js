var planes = {
  _box:null,
  _style:null,
  planes:[],
  flickerDelay:0,
  planeCounter:0,
  transparent:false,
  transparentCounter:0,

  topDrift:0,
  frontDrift:0,
  sideDrift:0,

  speed:30,

  init:function(){

    this._box = document.querySelector('.planes')
    this.planes = nodelistToArray(this._box.querySelectorAll('.cube>div'))

    this._style = document.createElement('style')
    document.querySelector('head').appendChild(this._style)

  },

  draw:function(){

    // update formation
    if( valueChanged(this,'cubeFormation') ){
      document.querySelector('.cube').setAttribute('formation',state.cubeFormation)
    }

    if( valueChanged(this, 'cubeTransparency') ){
      this._box.setAttribute('transparency',state.cubeTransparency)
      updateState('videoSrc','clear')
    }
      

    // update top drift
    if( valueChanged(this,'cubeTopDrift') ){
      this.planes[4].style.top = state.cubeTopDrift+'vw'
      this.planes[5].style.top = state.cubeTopDrift+'vw'
    }

    // update front drift
    if( valueChanged(this,'cubeFrontDrift') ){
      this.planes[0].style.left = state.cubeFrontDrift+'vw'
      this.planes[1].style.left = state.cubeFrontDrift+'vw'
    }

    // update side drift
    if( valueChanged(this,'cubeSideDrift') ){
      this.planes[2].style.top = '-'+state.cubeSideDrift+'vw'
      this.planes[3].style.top = '-'+state.cubeSideDrift+'vw'
    }

    // update cube speed
    if( valueChanged(this,'cubeSpeed') ){
      this._box.querySelector('.cube').style.animationDuration = state.cubeSpeed/2+'s'
    }

    // flicker
    if( state.flickerSpeed < 127 ){
      this.flickerDelay++  
      if( this.flickerDelay >= state.flickerSpeed ){
        this.flickerDelay = 0
        this.planes[this.planeCounter].classList.remove('flicker')
        this.planeCounter++
        if( this.planeCounter >= this.planes.length ){
          this.planeCounter = 0
        }
        this.planes[this.planeCounter].classList.add('flicker')
      }
    }

    // turn off flicker
    if( valueChanged(this,'flickerSpeed') && state.flickerSpeed == 127 ){
      console.warn('turning off flicker')
      for (var i = this.planes.length - 1; i >= 0; i--) {
        this.planes[i].classList.remove('flicker')
      }
    }

    // update video
    if( valueChanged(this,'videoSrc') ){

      // handle special clear video
      if( state.videoSrc == 'clear' ){
        for (var k = this.planes.length - 1; k >= 0; k--) {
          this.planes[k].innerHTML = ""
        }
        return
      }

      // set videos
      updateState('cubeTransparency','full')
      for (var j = this.planes.length - 1; j >= 0; j--) {
        this.planes[j].innerHTML = "<video autoplay loop src='/img/"+state.videoSrc+"'></video>"
      }
              

    }

  },
}