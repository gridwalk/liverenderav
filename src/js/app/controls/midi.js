var midi = {
  input:null,
  output:null,
  connected:false,

  _activity: null,
  activityTimer:null,

  _inputs:null,

  // maps are generated in controls.js
  knobMap:   [],
  buttonMap: [],

  init:function(){

    // add MIDI activity light

    this._activity = createEl({
      type:'div',
      class:'midi-activity',
      parent:'#main'
    })

    this._inputs = createEl({
      type:   'div',
      class:  'midi-inputs',
      parent: '#main'
    })

    WebMidi.enable(function(err){
      
      if(err){
        console.warn("WebMidi error:",err)
        return
      }

      // initialize controller when it is plugged in
      // also fires if the controller is plugged in later
      WebMidi.addListener('connected',midi.initController)

      // reset midi when controller disconnected
      WebMidi.addListener('disconnected',function(){
        midi.connected = false
        midi.input     = null
        midi.output    = null
      })

    })
  },

  showActivity:function(cc,val){

    console.log('MIDI:',cc,val)

    this._activity.classList.add('active')
    this._activity.innerHTML = cc+' '+val

    clearTimeout(midi.activityTimer)
    midi.activityTimer = setTimeout(function(){
      midi._activity.classList.remove('active')  
    },10000)

  },

  initController:function(){

    console.log('controller connected')

    // only connect once
    if( midi.connected ) return
    midi.connected = true

    console.log( WebMidi.inputs )
    // console.log( WebMidi.outputs )

    // if there is only one input, activate it
    if( WebMidi.inputs.length == 1 ){

      midi.activateInput(WebMidi.inputs[0].name)

    }else{

      // list all inputs at the top left
      midi._inputs.innerHTML = ''
      for (var i = 0; i < WebMidi.inputs.length; i++) {
        var _input = createEl({
          type:      'div',
          innerHTML: WebMidi.inputs[i].name,
          class:     'midi-input',
          parent:    '.midi-inputs'
        })
        
        // activate this input onclick
        _input.onclick = function(){
          midi.activateInput(this.innerHTML)
        }
      }
    }


    // // midi.input = WebMidi.getInputById('514991230') // cntrl:r
    
    // midi.output = WebMidi.getOutputById('-253120176')
    // if( !midi.output ) console.log('preferred midi output not found')

    // if( midi.output ){
    //   midi.initLights()  
    // }    

  },

  activateInput: function(inputName){
    midi._inputs.innerHTML = ''
    midi.input = WebMidi.getInputByName(inputName)
    midi.input.addListener('controlchange', 'all', midi.knobChange)
    midi.input.addListener('noteon', 'all', midi.buttonPress)
  },

  initLights:function(){

    // just for the CNTRL:R

    var white  = 1
    var red    = 20
    var cyan   = 4
    var green  = 127
    var pink   = 8
    var blue   = 32
    var yellow = 64

    // x  x  x  x   x  x  x  x   x  x  x  x
    // x  x  x  x   x  x  x  x   x  x  x  x
    // x  x  x  x   x  x  x  x   x  x  x  x
    // |  |  |  |   0  4  8  12  |  |  |  |
    // |  |  |  |   1  5  9  13  |  |  |  |
    // |  |  |  |   2  6  10 14  |  |  |  |
    // |  |  |  |   3  7  11 15  |  |  |  |
    // 16 17 18 19  20 21 22 23  24 25 26 27
    // 28 29 30 31  32 33 34 35  36 37 38 39

    midi.output.send(0x90,[0,red]) // play
    midi.output.send(0x90,[4,red]) // auto

    midi.output.send(0x90,[1,cyan])
    midi.output.send(0x90,[5,cyan])
    midi.output.send(0x90,[8,cyan])
    midi.output.send(0x90,[9,cyan])
    midi.output.send(0x90,[12,cyan])
    midi.output.send(0x90,[13,cyan])

    midi.output.send(0x90,[17,green]) // box transparency 
    midi.output.send(0x90,[16,green]) // box transparency
    
    midi.output.send(0x90,[32,blue]) // planes transparency
    midi.output.send(0x90,[33,blue]) // planes transparency
    midi.output.send(0x90,[34,blue]) // planes transparency

    midi.output.send(0x90,[47,20])
    midi.output.send(0x90,[29,20])
    midi.output.send(0x90,[30,20])
    midi.output.send(0x90,[31,20])
  },

  knobChange:function(e){

    var cc  = e.data[1]
    var val = e.data[2]

    midi.showActivity(cc,val)

    var control = midi.knobMap[cc]
    if(!control) return

    updateState(control.name,val)

  },

  buttonPress:function(e){

    var cc  = e.data[1]
    var val = e.data[2]

    midi.showActivity(cc,val)

    var control = midi.buttonMap[cc]
    if(!control) return

    // toggle button value
    if( control.type == 'toggle' ){
      toggleState(control.name)
    }

    // set value on button press
    if( control.type == 'set' ){
      updateState(control.name, control.default)
    }

  }
}