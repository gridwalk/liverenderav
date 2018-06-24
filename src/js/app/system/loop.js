function init() {
  
  // controls and data
  loadState()
  midi.init()
  initControls()
  keyboard.init()
  autopilot.init()
  mouse.init()
  audioPlayer.init()
  
  // Three JS Scene
  window.scene    = threeScene.init()
  window.camera   = threeCamera.init()
  window.renderer = threeRenderer.init()

  // actors and elements
  frameRate.init()

  exampleActor.init()
  
  // start
  loop()
}

function loop(){

  if( state.paused ){ 
    requestAnimationFrame(loop)
    return
  }

  frameRate.draw()
  autopilot.draw()

  exampleActor.draw()

  renderer.render( scene, camera )

  requestAnimationFrame(loop)
}

init()