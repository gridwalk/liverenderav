var wireCube = {
  
  mesh:null,

  clones:[],
  cloneCursor:0,

  init:function(){

  	if( this.mesh ) scene.remove(this.mesh)

    // this.mesh = new Cube('#78EBE2',2)
    // wireframe cube
    var geometry = new THREE.BoxGeometry( 6, 6, 6)
    var material = new THREE.MeshBasicMaterial( {
      color: "#fff", 
      wireframe: true
    })
    this.mesh = new THREE.Mesh ( geometry, material )
    scene.add(this.mesh)

    this.addRemoveClones()

  },

  // add or remove clones
  addRemoveClones:function(){

  	// first delete all clones
  	for (var i = this.clones.length - 1; i >= 0; i--) {
  		scene.remove(this.clones[i])
  	}

  	this.clones = []

  	// then add clones
  	for (var i = 0; i < state.numWireClones; i++) {
  		this.clones[i] = this.mesh.clone()

  		this.clones[i].material = this.mesh.material.clone()

  		scene.add(this.clones[i])
  	}

  },

  draw:function(){

  	if( st.hasChanged('numWireClones')  ) this.addRemoveClones()

    var rotX = state.wireCubeRotX * .001 || 0
    var rotY = state.wireCubeRotY * .001 || 0

    var scale = state.wireCubeScale * .1
    if( scale == 0 ) scale = 0.001    
    this.mesh.scale.set(scale,scale,scale)

    this.mesh.rotation.x += rotX
    this.mesh.rotation.y += rotY
    this.mesh.rotation.z += rotY


    // animate the clones
    for (var i = this.clones.length - 1; i >= 0; i--) {

    	var cloneScale = scale * ( 1 + ( i * (state.wireCubeCloneScale * .001)) )

    	this.clones[i].scale.set(cloneScale, cloneScale, cloneScale)
    	
    	this.clones[i].rotation.x = this.mesh.rotation.x - i * (state.wireCubeCloneRotOff * .001)
    	this.clones[i].rotation.y = this.mesh.rotation.y - i * (state.wireCubeCloneRotOff * .001)
    	this.clones[i].rotation.z = this.mesh.rotation.z - i * (state.wireCubeCloneRotOff * .001)
    }

    // do cascading
    // cloneCursor++


  }
}