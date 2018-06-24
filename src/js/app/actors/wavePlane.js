var wavePlane = {
  
  mesh: null,

  init:function(){

    var geometry = new THREE.PlaneGeometry(200, 200, 10, 10)
    var material = new THREE.MeshBasicMaterial( {
      color: "#FC0", 
      wireframe: true
    })

    this.mesh = new THREE.Mesh ( geometry, material )
    this.mesh.rotation.x = -.4 * Math.PI
    this.mesh.position.set(0,50,40)
    scene.add(this.mesh)

  },
  draw:function(ts){

    var speed     = state.wavePlaneSpeed * 500
    var size      = state.wavePlaneWaveSize
    var magnitude = state.wavePlaneMagnitude

    if( this.doFlatten ){
      updateState('wavePlaneWaveSize', state.wavePlaneWaveSize+.3 )
      if( state.wavePlaneWaveSize >= 255 ){
        this.doFlatten = false
      }
    }

    var center = new THREE.Vector2(0,0);
    var vLength = this.mesh.geometry.vertices.length;
    for (var i = 0; i < vLength; i++) {
      var v = this.mesh.geometry.vertices[i];
      var dist = new THREE.Vector2(v.x, v.y).sub(center);
      
      
      v.z = Math.sin(dist.length()/-size + (ts/speed)) * magnitude;
    }
    this.mesh.geometry.verticesNeedUpdate = true;

  },

  flatten:function(){

    // rapidly move satte.wavePlaneWaveSize from 1 - 255
    this.doFlatten = true
    updateState('wavePlaneWaveSize',1)

  }
}