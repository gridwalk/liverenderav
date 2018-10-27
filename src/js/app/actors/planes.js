var planes = {

  meshes: [],
  indexes:[],
  currentMeshCursor:  0,
  previousMeshCursor: 0,
  wireframe: false,  

  meshCursor:0,

  init:function(){

    

    for (var i = 0; i < 9; i++) {
      
      var mesh     = new Plane('#fff',3)
      // var mesh     = new Plane('#af4',3)
      mesh.visible = false
      this.meshes.push(mesh)
      scene.add(mesh)

    }

    // this.meshes = 

    this.indexes = shuffle([0,1,2,3,4,5,6,7,8])
    

    // var geometry = new THREE.BoxGeometry( .5, .5, .5)
    // var material = new THREE.MeshBasicMaterial( {
    //   color: "#000",
    //   wireframe: true
    // })
    // this.mesh = new THREE.Mesh ( geometry, material )

    

  },
  draw:function(){



    // this.mesh.material.color.set(this.color);

    // this.mesh.scale.set(this.scale, this.scale, this.scale)
    x = -.5
    y = -.5
    for (var i = 0; i < this.meshes.length; i++) {

      mesh = this.meshes[ this.indexes[i] ]

      mesh.scale.z = state.planesDepth * .1

      var z = state.planesZ - 63.5

      positionMesh(mesh, x, y, z)

      mesh.rotation.x += state.planesRotXY * .001
      mesh.rotation.y += state.planesRotXY * .001

      x+=.5
      if(x==1){
        x = -.5
        y += .5
      }

      // x = x + 33
      
      // console.log(x)
    }
    
  },
  showRandom:function(){
    
      // get shuffle working

    this.meshCursor++
    if(this.meshCursor >= this.meshes.length) this.meshCursor = 0
    
    this.meshes[this.meshCursor].visible = true



    // this.currentMeshCursor = 0
    // while( this.currentMeshCursor == this.previousMeshCursor ){
    //   this.currentMeshCursor = r(this.meshes.length)
    // }
    // this.previousMeshCursor = this.currentMeshCursor

    // this.meshes[this.currentMeshCursor].visible = true

  },
  hideRandom:function(){

    // this.meshCursor++
    // if(this.meshCursor > this.meshes.length) this.meshCursor = 0


    
    // this.meshes[this.meshCursor].visible = false

    visibleMeshes = []    
    for (var i = this.meshes.length - 1; i >= 0; i--) {
      if( this.meshes[i].visible == true ) visibleMeshes.push(this.meshes[i])
    }
    if( visibleMeshes.length == 1 ){
      visibleMeshes[0].visible = false
    }else if( visibleMeshes.length > 0 ){
      visibleMeshes[r(visibleMeshes.length)].visible = false
    }

  },
  hideAll:function(){
    for (var i = this.meshes.length - 1; i >= 0; i--) {
      this.meshes[i].visible = false
    }
  },
  showAll:function(){
    for (var i = this.meshes.length - 1; i >= 0; i--) {
      this.meshes[i].visible = true
    }
  },
  toggleWire: function(override){

    if( override !== undefined ){
      this.wireframe = override
    }else{
      this.wireframe = !this.wireframe  
    }    

    for (var i = this.meshes.length - 1; i >= 0; i--) {

      var material = new THREE.MeshBasicMaterial({color:'#fff'})

      if( this.wireframe ){
        material = new THREE.MeshBasicMaterial({color:'#fff', wireframe:true})
      }

      this.meshes[i].material = material

    }
  },
  setColor:function(color){
    for (var i = this.meshes.length - 1; i >= 0; i--) {
      planes.meshes[i].material.color.set(color)
    }
  }
}