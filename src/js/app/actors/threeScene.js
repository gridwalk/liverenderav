var threeScene = {

  width:  window.innerWidth / 1,
  height: window.innerHeight / 1,

  init:function(){

    window.onresize = threeScene.resize

    var scene = new THREE.Scene()
    return scene

  },
  resize:function(){
    threeScene.width = window.innerWidth / 1
    threeScene.height = window.innerHeight / 1
    renderer.setSize( threeScene.width, threeScene.height )
    camera.aspect = threeScene.width / threeScene.height
    camera.updateProjectionMatrix()   
  }
}