var clusterCubes = {
  
  cubes:[],
  group:null,
  

  init:function(){

    // this.mesh = new Cube('#78EBE2',2)
    // scene.add(this.mesh)

    this.group = new THREE.Group()

    // make some cubes
    for (var i = 0; i < 200; i++) {

      var color = r(2)-1 ? 0x78EBE2 : 0x50C1f1
      this.cubes[i] = new Cube(color,2)
      this.cubes[i].position.set(r(5)-2.5,r(5)-2.5,r(5)-2.5)
      
      this.group.add(this.cubes[i])
      
    }

    this.group.position.z = 1
    this.group.scale.set(.28,.28,.28)
    scene.add(this.group)

  },
  draw:function(){

    this.group.rotation.x += 0.001;      
    this.group.rotation.y += 0.004;      

  }
}




