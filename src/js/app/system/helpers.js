var r = function(max){
  return Math.floor(Math.random()*max)
}

Array.prototype.randomElement = function () {
  return this[r(this.length)]
}

var chance = function(percent){
   return ( r(100) < percent )
}

function shuffleArray(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

function createEl(opt){
  var _el = document.createElement(opt.type)
  if( opt.innerHTML ) _el.innerHTML = opt.innerHTML
  if( opt.class )     _el.setAttribute('class', opt.class)
  if( opt.id )        _el.setAttribute('id', opt.id)

  if(opt.attr){
    Object.keys(opt.attr).forEach(function(key){
      _el.setAttribute(key,opt.attr[key])
    })  
  }
  
  if( opt.parent ) document.querySelector(opt.parent).appendChild(_el)

  return _el
}

function Cube(color,size,z){
  var geometry = new THREE.BoxGeometry(size,size,size)
  var material = new THREE.MeshBasicMaterial({color:color})
  var mesh     = new THREE.Mesh(geometry,material)
  mesh.z = z
  return mesh
}

function absolutePositionMesh(mesh,x,y){

  x = (x / window.innerWidth) * 2 - 1
  y = (y / window.innerHeight) * 2 - 1
  var vector = new THREE.Vector3(x, y, 0.5);
  vector.unproject( camera );
  var dir = vector.sub( camera.position ).normalize();
  var distance = - camera.position.z / dir.z;
  var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );

  mesh.position.set(pos.x,pos.y*-1,pos.z)
}