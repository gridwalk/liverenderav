var mouseCube = {

  init:function(){

    this.mesh = new Cube('#6025d4',.5,-.5)

    // var geometry = new THREE.BoxGeometry( .5, .5, .5)
    // var material = new THREE.MeshBasicMaterial( {
    //   color: "#000",
    //   wireframe: true
    // })
    // this.mesh = new THREE.Mesh ( geometry, material )

    scene.add(this.mesh)

  },
  draw:function(){
    absolutePositionMesh(this.mesh, mouse.x, mouse.y)
  }
}