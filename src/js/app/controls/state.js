// holds state values
// populated in loadState() and initControls()
var state = {}

function saveState(){
  localStorage.setItem('state',JSON.stringify(state))
}

function loadState(){
  if( !localStorage.getItem('state') ) return
  state = JSON.parse(localStorage.getItem('state'))


  // pasted from bakeState()
  state.boxTransparency = 'solid';
  state.exampleKnob = 1;
  state.autopilotEnabled = true;
  state.paused = false;
  state.spinCubeY = 45;
  state.spinCubeX = 49;
  state.spinCubePosY = 52;
  state.spinCubePosX = 42;
  state.spinCubeSpeedX = 1;
  state.spinCubeSpeedY = 0;
  state.spinCubeScale = 121;
  state.wireCubeSpeedY = 0;
  state.wireCubeSpeedX = 42;
  state.wireCubeScale = 20;
  state.boxMax = 102;
  state.boxMin = 72;
  state.boxSpeed = 121;
  state.bgVisible = false;
  state.cubeSpeed = 77;
  state.accentOn = false;
  state.chanceAccent = 0;
  state.accentBlue = 253;
  state.accentGreen = 222;
  state.accentRed = 0;
  state.videoSrc = 'synth2.mp4';
  state.cubeFormation = 'cluster';
  state.cubeSideDrift = 0;
  state.cubeFrontDrift = 0;
  state.cubeTopDrift = 8;
  state.cubeTransparency = 'full';
  state.flickerSpeed = 118;
  state.fallSpeed = 0;
  state.scatter = 64;
  state.width = 64;
  state.height = 93;
  state.maxAmount = 19;
}

function updateState(param,val){
  state[param] = val
  saveState()
}

function toggleState(param){
  state[param] = !state[param]
  saveState()
}

function bakeState(){
  var declarations = ''
  for (var controlName in state) {
    declarations += "state."+controlName +" = "+state[controlName]+";\n"
  }
  console.log(declarations)
}


// fix this
function valueChanged( module, param ){
  if( module[param] == state[param] ) return false
  module[param] = state[param]
  return true
}