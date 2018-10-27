var spinCube = {
  
  mesh:null,

  init:function(){

    // this.mesh = new Cube('#78EBE2',2)

    var geometry = new THREE.BoxGeometry( 1, 1, 1)
    var material = new THREE.MeshBasicMaterial( {
      color: "#000",
      wireframe: true
    })
    this.mesh = new THREE.Mesh ( geometry, material )

    scene.add(this.mesh)

  },
  draw:function(){

  	var scale = state.spinCubeScale * .1
    if( scale == 0 ) scale = 0.001 
    this.mesh.scale.set(scale,scale,scale)

    this.mesh.rotation.x += state.spinCubeSpeedX * .001
    this.mesh.rotation.y += state.spinCubeSpeedY * .001

    var x = state.spinCubePosX * .01 * window.innerWidth
    var y = state.spinCubePosY * .01 * window.innerHeight
    
    absolutePositionMesh(this.mesh,x,y)
    

  }
}