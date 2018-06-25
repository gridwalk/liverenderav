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

  // exampleActor.init()
  wavePlane.init()
  popCube.init()
  
  // start
  loop()
}

function loop(ts){

  if( state.paused ){ 
    requestAnimationFrame(loop)
    return
  }

  frameRate.draw()
  autopilot.draw()

  wavePlane.draw(ts)
  popCube.draw()

  renderer.render( scene, camera )

  requestAnimationFrame(loop)
}

init()