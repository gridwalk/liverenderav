var bounceCube = {
  
  mesh:    null,
  x:       null,
  y:       null,
  accel:   0,
  counter: 0,

  color: '#fff',

  rotX:0,
  rotY:0,
  rotZ:0,

  scale:1,

  init:function(){

    this.x = r(window.innerWidth)
    this.y = r(window.innerHeight)

    this.mesh = new Cube(this.color,.8,0)

    // var geometry = new THREE.BoxGeometry( .8, .8, .8)
    // var material = new THREE.MeshBasicMaterial( {
    //   color: "#000",
    //   wireframe: true
    // })
    // this.mesh = new THREE.Mesh ( geometry, material )


    scene.add(this.mesh)

  },
  draw:function(){

    // flicker
    if( state.bounceCubeFlicker ){
      if( this.color == '#fff' ){
        this.color = '#000'
      }else{
        this.color = '#fff'
      }
      this.mesh.material.color.set(this.color)
    }

    // bounce off walls
    if( this.x > window.innerWidth ){
      st.set('bounceCubeVectorX', state.bounceCubeVectorX * -1 )
      this.x = window.innerWidth
    }

    if( this.y > window.innerHeight ){
      st.set('bounceCubeVectorY', state.bounceCubeVectorY * -1 )
      this.y = window.innerHeight
    }

    if( this.x < 0 ){
      st.set('bounceCubeVectorX', state.bounceCubeVectorX * -1 )
      this.x = 0
    }

    if( this.y < 0 ){
      st.set('bounceCubeVectorY', state.bounceCubeVectorY * -1 )
      this.y = 0
    }

    this.x = this.x + state.bounceCubeVectorX
    this.y = this.y + state.bounceCubeVectorY

    this.counter++

    // // go sideways
    // if( chance(10) && chance(1) && state.bounceCubeVectorY !== 0 ){
    //   this.prevY   = state.bounceCubeVectorY
    //   st.set('bounceCubeVectorY', 0 )
    //   this.counter = 0
    // }

    // // stop going sideways
    // if( state.bounceCubeVectorY == 0 && this.counter > 100 ){
    //   st.set('bounceCubeVectorY', this.prevY )
    // }

    this.scale = state.bounceCubeScale / 10
    if( this.scale == 0 ) this.scale = 0.001

    this.mesh.scale.set( this.scale,this.scale,this.scale )

    this.rotX = this.rotX + state.bounceCubeRotX * .01
    this.rotY = this.rotY + state.bounceCubeRotY * .01
    this.rotZ = 0

    this.mesh.rotation.set(this.rotX,this.rotY,this.rotZ)

    absolutePositionMesh(this.mesh,this.x,this.y)

  }
}