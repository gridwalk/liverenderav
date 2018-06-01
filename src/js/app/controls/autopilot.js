var autopilot = {
  animating:{},
  sceneTimer:0,
  scene:null,

  init:function(){

    this._box = {
      type:'div',
      parent:'#main',
      attr:{
        class:'autopilot-clue'
      }
    }

  },
  draw:function(){

    if( valueChanged(this,'autopilotEnabled') ){
      if( state.autopilotEnabled ){
        this._box.innerHTML = 'autopilot'
      }else{
        this._box.innerHTML = ''
      }
    }

    if( !state.autopilotEnabled ) return


  }
}