var freeCube = {

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


  	var distanceFromCenter = ( Math.floor(Math.sqrt(Math.pow( mouse.x - (window.innerWidth/2), 2) + Math.pow(mouse.y - (window.innerHeight/2), 2))) )
  	distanceFromCenter = Math.floor( distanceFromCenter / ( window.innerWidth / 2 ) * 100 )
  	if( distanceFromCenter > 100 ) distanceFromCenter = 100


  	var purple = new Color('#622758');
  	var red    = new Color('#C21A3F');
  	// var orange = new Color('#F1853D');

  	// var l = new Color({ r:100, g:100, b:100 });
		// var r = new Color("#ffaa33");
		// var backgroundColor = LinearColorInterpolator.findColorBetween(l, r, 50).asRgbCss();

		// if( distanceFromCenter < 40 ){
			// this.color = LinearColorInterpolator.findColorBetween(orange,red,distanceFromCenter).asRgbCss()
		// }else{
			this.color = LinearColorInterpolator.findColorBetween(red,purple,distanceFromCenter).asRgbCss()
		// }


  	// var baseColor = 
  	



  

    this.mesh.material.color.set(this.color);

    this.mesh.scale.set(this.scale, this.scale, this.scale)



    absolutePositionMesh(this.mesh, mouse.x, mouse.y)
  }
}