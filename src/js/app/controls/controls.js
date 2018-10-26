
// the main point of control variables is that 
// they are automatically saved in the state object variable when changed

// Once controls are registered here, there are 4 ways to update them:
// 1. st.set('controlName','newvalue')
// 2. use MIDI knob or button with the midiCC you assigned to it below
// 3. Press the key on your keyboard you assigned to it
// 4. If control is a knob, hold the key and move the mouse up/down

// Four types of controls:
// toggle - toggles a state variable true/false
// knob   - allows a state variable to be controlled by a MIDI knob values 0 - 127
// set    - sets a state variable to the given "default" value
// run    - runs arbitrary code. Does not save anything to state!!

var controls = [

  // systems
  {
    name:'autopilotEnabled',
    type:'toggle',
    default:false,
    midiCC:4,
    // key:'U'
  },
  {
    name:'pasteState',
    type:'run',
    run:function(){
      audioPlayer._pasteState.click()
    },
    midiCC:null,
    // key:null,
  },

  // general vis

  {
    name:'trails',
    type:'toggle',
    default:false,
    midiCC:46,
    key:'T'
  },

  {
    name:'cameraPanX',
    type:'knob',
    default:64,
    // midiCC:46,
    // key:'C'
  },
  {
    name:'cameraPanY',
    type:'knob',
    default:64,
    // midiCC:46,
    // key:'C'
  },

  // spin cube

  {
    name:'spinCubeSpeedX',
    type:'knob',
    default:1,
    midiCC:16 ,
    // key:'Q'
  },
  {
    name:'spinCubeSpeedY',
    type:'knob',
    default:1,
    midiCC:17 ,
    // key:'W'
  },
  {
    name:'spinCubePosX',
    type:'knob',
    default:50,
    midiCC:1,
    // key:'E'
  },
  {
    name:'spinCubePosY',
    type:'knob',
    default:50,
    midiCC:0,
    // key:'R'
  },
  {
    name:'spinCubeScale',
    type:'knob',
    default:30,
    midiCC:18,
    // key:'T'
  },

  // wire cube

  {
    name:'wireCubeScale',
    type:'knob',
    default:5,
    midiCC:2,
    // key:'Y'
  },
  {
    name:'wireCubeRotX',
    type:'knob',
    default:1,
    // midiCC:2,
    // key:'Y'
  },
  {
    name:'wireCubeRotY',
    type:'knob',
    default:1,
    // midiCC:2,
    // key:'Y'
  },

  // wire clones 
  {
    name:'numWireClones',
    type:'knob',
    default:30,
    // midiCC:2,
    key:'N'
  },

  {
    name:'wireCubeCloneScale',
    type:'knob',
    default:10,
    // midiCC:2,
    key:'C'
  },

  {
    name:'wireCubeCloneRotOff',
    type:'knob',
    default:0,
    // midiCC:2,
    key:'R'
  },


  // sphere

  {
    name:'sphereRotX',
    type:'knob',
    default:8,
    // midiCC:2,
    // key:'Y'
  },
  {
    name:'sphereRotY',
    type:'knob',
    default:0,
    // midiCC:2,
    // key:'Y'
  },
  {
    name:'sphereScale',
    type:'knob',
    default:5,
    midiCC:2,
    // key:'Y'
  },
  {
    name:'sphereFlicker',
    type:'toggle',
    default:true,
    midiCC:32,
    // key:''
  },
  
  // bounce cube

  {
    name:'bounceCubeVectorX',
    type:'knob',
    default:0,
    midiCC:23,
    // key:''
  },
  {
    name:'bounceCubeVectorY',
    type:'knob',
    default:0,
    midiCC:7,
    // key:''
  },
  {
    name:'bounceCubeScale',
    type:'knob',
    default:0,
    midiCC:22,
    // key:''
  },
  {
    name:'bounceCubeFlicker',
    type:'toggle',
    default:false,
    midiCC:32,
    // key:''
  },
  {
    name:'bounceCubeRotX',
    type:'knob',
    default:0,
    midiCC:null,
    // key:''
  },
  {
    name:'bounceCubeRotY',
    type:'knob',
    default:0,
    midiCC:null,
    // key:''
  },


  // free cube
  {
    name:'freeCubePosX',
    type:'knob',
    default:50,
    // midiCC:23,
    // key:''
  },
  {
    name:'freeCubePosY',
    type:'knob',
    default:50,
    // midiCC:23,
    // key:''
  },

  // planes
  {
    name:'planesShowRandom',
    type:'run',
    run:function(){
      planes.hideAll()
      planes.showRandom()
    },
    // key:'P'
  },
  {
    name:'planesRotXY',
    type:'knob',
    default:0,
    midiCC:6,
    // key:''
  },
  {
    name:'planesDepth',
    type:'knob',
    default:10,
    midiCC:5,
    // key:''
  },
  {
    name:'planesZ',
    type:'knob',
    default:63,
    midiCC:3,
    // key:''
  }

]


var initControls = function(){

  // step through all controls,
  // map them to MIDI and computer keyboard

  for (var i = controls.length - 1; i >= 0; i--) {
    
    var control = controls[i]

    // set defaults for controls that dont have state yet
    if( state[ control.name ] == undefined && control.default !== undefined ){

      state[ control.name ] = control.default
    }
    
    cc   = control.midiCC
    key  = control.key
    type = control.type

    // generate MIDI and Keyboard maps
    
    // button map (toggle, set, run)
    if( type == 'toggle' || type == 'set' || type == 'run' ){
      midi.buttonMap[cc]     = control
      keyboard.inputMap[key] = control
    }

    // knob map
    if( type == 'knob' ){
      midi.knobMap[cc]       = control
      keyboard.inputMap[key] = control
    }

  }

  st.save()

}

// list of midi mapping on livid cntrl r

// x  x  x  x   x  x  x  x   x  x  x  x
// x  x  x  x   x  x  x  x   x  x  x  x
// x  x  x  x   x  x  x  x   x  x  x  x
// |  |  |  |   0  4  8  12  |  |  |  |
// |  |  |  |   1  5  9  13  |  |  |  |
// |  |  |  |   2  6  10 14  |  |  |  |
// |  |  |  |   3  7  11 15  |  |  |  |
// 16 17 18 19  20 21 22 23  24 25 26 27
// 28 29 30 31  32 33 34 35  36 37 38 39