var threeRenderer = {
  init: function(){
    var renderer = new THREE.WebGLRenderer({
      // precision: 'highp' 'mediump' 'lowp'
      alpha: true,
      // premultipliedAlpha: true
      // antialias: true,
      // stencil: true
      preserveDrawingBuffer: true
      // depth: true
      // logarithmicDepthBuffer: false
    })
    renderer.autoClearColor = false

    renderer.setSize( threeScene.width, threeScene.height)
    // sets renderer background color
    // renderer.setClearColor("#FFFFFF",0)
    document.body.appendChild( renderer.domElement )

    return renderer
  }
}