var initControls = function(){

  // step through all controls,
  // map them to MIDI and computer keyboard

  for (var i = controls.length - 1; i >= 0; i--) {
    
    var control = controls[i]

    // set defaults for controls that dont have state yet
    if( state[ control.name ] == undefined ){
      state[ control.name ] = control.default
    }
    
    cc   = control.midiCC
    key  = control.key
    type = control.type

    // generate MIDI and Keyboard maps
    
    // button map (toggle)
    if( type == 'toggle' ){
      midi.buttonMap[cc]     = control
      keyboard.inputMap[key] = control
    }

    // button map (set value)
    if( type == 'set' ){
      midi.buttonMap[cc]     = control
      keyboard.inputMap[key] = control
    }

    // knob map
    if( type == 'knob' ){
      midi.knobMap[cc]       = control
      keyboard.inputMap[key] = control
    }

  }

  saveState()

}

// x  x  x  x   x  x  x  x   x  x  x  x
// x  x  x  x   x  x  x  x   x  x  x  x
// x  x  x  x   x  x  x  x   x  x  x  x
// |  |  |  |   0  4  8  12  |  |  |  |
// |  |  |  |   1  5  9  13  |  |  |  |
// |  |  |  |   2  6  10 14  |  |  |  |
// |  |  |  |   3  7  11 15  |  |  |  |
// 16 17 18 19  20 21 22 23  24 25 26 27
// 28 29 30 31  32 33 34 35  36 37 38 39

// list of all possible controls

var controls = [
  {
    name:'paused',
    type:'toggle',
    default:false,
    midiCC:0,
    key:' '
  },
  {
    name:'autopilotEnabled',
    type:'toggle',
    default:true,
    midiCC:4,
    key:'U'
  },
  {
    name:'spinCubeSpeedX',
    type:'knob',
    default:1,
    midiCC:16 ,
    key:'Q'
  },
  {
    name:'spinCubeSpeedY',
    type:'knob',
    default:1,
    midiCC:17 ,
    key:'W'
  },
  {
    name:'spinCubePosX',
    type:'knob',
    default:42,
    midiCC:1,
    key:'E'
  },
  {
    name:'spinCubePosY',
    type:'knob',
    default:52,
    midiCC:0,
    key:'R'
  },
  {
    name:'spinCubeScale',
    type:'knob',
    default:121,
    midiCC:18,
    key:'T'
  },
  {
    name:'wireCubeScale',
    type:'knob',
    default:6,
    midiCC:2,
    key:'Y'
  },
  {
    name:'boxTransparency',
    type:'set',
    default:'solid',
    midiCC:16,
    key:'T'
  },
  {
    name:'bounceVectorX',
    type:'knob',
    default:'3',
    midiCC:19,
    // key:'T'
  },
  {
    name:'bounceVectorY',
    type:'knob',
    default:'3',
    midiCC:20,
    // key:'T'
  },
]












// "wireCubeSpeedY":0
// "wireCubeSpeedX":42
// "wireCubeScale":20
// "boxMax":102
// "boxMin":72
// "boxSpeed":121
// "bgVisible":false
// "cubeSpeed":77
// "accentOn":false
// "chanceAccent":0
// "accentBlue":253
// "accentGreen":222
// "accentRed":0
// "videoSrc":"synth2.mp4"
// "cubeFormation":"cluster"
// "cubeSideDrift":0
// "cubeFrontDrift":0
// "cubeTopDrift":8
// "cubeTransparency":"full"
// "flickerSpeed":118
// "fallSpeed":0
// "scatter":64
// "width":64
// "height":93
// "maxAmount":19