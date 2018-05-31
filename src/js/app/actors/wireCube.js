var wireCube = {
  
  mesh:null,

  init:function(){

    // this.mesh = new Cube('#78EBE2',2)
    // wireframe cube
    var geometry = new THREE.BoxGeometry( 6, 6, 6)
    var material = new THREE.MeshBasicMaterial( {
      color: "#FFF", 
      wireframe: true
    })
    this.mesh = new THREE.Mesh ( geometry, material )
    scene.add(this.mesh)

  },
  draw:function(){

    var s = state.wireCubeScale * .1
    this.mesh.scale.set(s,s,s)

    // this.mesh.rotation.x += state.wireCubeSpeedX * .0001
    // this.mesh.rotation.y += state.wireCubeSpeedY * .001

    this.mesh.rotation.x += 0.004


  }
}