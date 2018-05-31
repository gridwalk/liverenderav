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
    default:false,
    midiCC:4,
    key:'U'
  },
  {
    name:'spinCubeSpeedX',
    type:'knob',
    default:50,
    midiCC:16 ,
    key:'Q'
  },
  {
    name:'spinCubeSpeedY',
    type:'knob',
    default:50,
    midiCC:17 ,
    key:'W'
  },
  {
    name:'spinCubePosX',
    type:'knob',
    default:50,
    midiCC:1,
    key:'E'
  },
  {
    name:'spinCubePosY',
    type:'knob',
    default:50,
    midiCC:0,
    key:'R'
  },
  {
    name:'spinCubeScale',
    type:'knob',
    default:2,
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
    default:'outline',
    midiCC:16,
    key:'T'
  },
]