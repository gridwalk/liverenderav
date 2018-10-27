var mouseCube = {

  scale: 1,
  color:'#6025d4',

  init:function(){

    this.mesh = new Cube(this.color,.5,-.5)
   
    // var geometry = new THREE.BoxGeometry( .5, .5, .5)
    // var material = new THREE.MeshBasicMaterial( {
    //   color: "#000",
    //   wireframe: true
    // })
    // this.mesh = new THREE.Mesh ( geometry, material )

    scene.add(this.mesh)

  },
  draw:function(){

    this.mesh.material.color.set(this.color);

    this.mesh.scale.set(this.scale, this.scale, this.scale)

    absolutePositionMesh(this.mesh, mouse.x, mouse.y)
  }
}