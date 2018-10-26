var threeCamera = {
  init: function(){
    
    var fov         = 75
    var aspectRatio = threeScene.width / threeScene.height
    var nearClip    = 0.1
    var farClip     = 1000

    var camera = new THREE.PerspectiveCamera( fov, aspectRatio, nearClip, farClip )
    
    camera.position.z = 5
    
    return camera
  },
  draw:function(){

    // update camera pan state based on mouse position
    // st.set('cameraPanX', 127 * mouse.percentX )
    // st.set('cameraPanY', 127 * mouse.percentY )

    // var panX = (state.cameraPanX - 64) * .001 * -1
    // var panY = (state.cameraPanY - 64) * .001 * -1

    // camera.rotation.set(panY,panX,0)

  }
}