var threeCamera = {
  init: function(){
    
    var fov         = 75
    var aspectRatio = threeScene.width / threeScene.height
    var nearClip    = 0.1
    var farClip     = 1000

    var camera = new THREE.PerspectiveCamera( fov, aspectRatio, nearClip, farClip )
    
    // camera.position.z = 5
    camera.position.set(0,50,100)
    
    return camera
  }
}