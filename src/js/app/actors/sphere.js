var sphere = {
  
  mesh:null,
  visible: false,
  color: '#000',

  init:function(){

    // this.mesh = new Cube('#78EBE2',2)
    // wireframe cube

    var radius = 1.5;
		var segments = 1;
		var rings = 150;

    var geometry = new THREE.SphereGeometry(radius, segments, rings);
		var material = new THREE.MeshBasicMaterial({
		  color: '#fff',
		  wireframe: true
		});

    this.mesh = new THREE.Mesh ( geometry, material )
    scene.add(this.mesh)

  },
  draw:function(){

  	this.mesh.visible = this.visible
  	if( !this.visible ) return

  	// flicker
    if( state.sphereFlicker ){
      if( this.color == '#fff' ){
        this.color = '#000'
      }else{
        this.color = '#fff'
      }
      this.mesh.material.color.set(this.color)
    }

    var rotX = state.sphereRotX * .001 || 0
    var rotY = state.sphereRotY * .001 || 0

    var scale = state.sphereScale * .1
    if( scale == 0 ) scale = 0.001    
    this.mesh.scale.set(scale,scale,scale)

    this.mesh.rotation.x += rotX
    this.mesh.rotation.y += rotY


  }
}