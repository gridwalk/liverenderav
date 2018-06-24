var bounceCube = {
  
  mesh:    null,
  x:       null,
  y:       null,
  accel:   0,
  vectorX: 3,
  vectorY: 3,
  counter: 0,

  init:function(){

    this.x = r(window.innerWidth)
    this.y = r(window.innerHeight)

    this.mesh = new Cube('#000',.8,0)

    // var geometry = new THREE.BoxGeometry( .8, .8, .8)
    // var material = new THREE.MeshBasicMaterial( {
    //   color: "#000",
    //   wireframe: true
    // })
    // this.mesh = new THREE.Mesh ( geometry, material )


    scene.add(this.mesh)

  },
  draw:function(){



    // bounce off walls
    if( this.x > window.innerWidth ){
      state.bounceVectorX = state.bounceVectorX * -1
      this.x = window.innerWidth
    }

    if( this.y > window.innerHeight ){
      state.bounceVectorY = state.bounceVectorY * -1
      this.y = window.innerHeight
    }

    if( this.x < 0 ){
      state.bounceVectorX = state.bounceVectorX * -1
      this.x = 0
    }

    if( this.y < 0 ){
      state.bounceVectorY = state.bounceVectorY * -1
      this.y = 0
    }

    this.x = this.x + state.bounceVectorX
    this.y = this.y + state.bounceVectorY

    this.counter++

    // go sideways
    if( chance(10) && chance(1) && state.bounceVectorY !== 0 ){
      this.prevY   = state.bounceVectorY
      state.bounceVectorY = 0
      this.counter = 0
    }

    // stop going sideways
    if( state.bounceVectorY == 0 && this.counter > 100 ){
      state.bounceVectorY = this.prevY
    }

    absolutePositionMesh(this.mesh,this.x,this.y)

  }
}