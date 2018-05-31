function init() {
  
  // controls and data
  loadState()
  midi.init()
  initControls()
  keyboard.init()
  autopilot.init()
  mouse.init()
  
  // Three JS Scene
  window.scene    = threeScene.init()
  window.camera   = threeCamera.init()
  window.renderer = threeRenderer.init()

  // actors and elements
  frameRate.init()

  wireCube.init()
  spinCube.init()
  // clusterCubes.init()
  bounceCube.init()
  mouseCube.init()
  
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

  spinCube.draw()
  // clusterCubes.draw()
  wireCube.draw()
  bounceCube.draw()
  mouseCube.draw()

  renderer.render( scene, camera )

  requestAnimationFrame(loop)
}

init()