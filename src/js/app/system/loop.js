function initLoop() {
  
  // controls and data
  st.load()
  midi.init()
  initControls()
  // autopilot.init()
  mouse.init()
  keyboard.init()
  // audioPlayer.init()
  frameRate.init()

  // Three JS Scene
  window.scene    = threeScene.init()
  window.camera   = threeCamera.init()
  window.renderer = threeRenderer.init()

  // actors

  wireCube.init()
  // spinCube.init()
  // clusterCubes.init()
  // bounceCube.init()
  // mouseCube.init()
  // freeCube.init()
  // planes.init()
  // sphere.init()
  
  // start
  loop()
}

function loop(){

  if( state.paused ){ 
    requestAnimationFrame(loop)
    return
  }

  frameRate.draw()
  // autopilot.draw()

  threeCamera.draw()

  // spinCube.draw()
  // clusterCubes.draw()
  wireCube.draw()
  // bounceCube.draw()
  // mouseCube.draw()
  // freeCube.draw()
  // planes.draw()
  // sphere.draw()

  st.interpolator.draw()

  if( !state.trails ){
    renderer.clear()
  }

  renderer.render( scene, camera )

  requestAnimationFrame(loop)
}

initLoop()