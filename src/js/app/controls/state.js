// holds state values
// populated in loadState() and initControls()
var state = {}

function saveState(){
  localStorage.setItem('state',JSON.stringify(state))
}

function loadState(){
  if( !localStorage.getItem('state') ) return
  state = JSON.parse(localStorage.getItem('state'))


  // paste in state from bakeState() here
  
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