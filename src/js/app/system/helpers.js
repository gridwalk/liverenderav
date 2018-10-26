var r = function(max){
  return Math.floor(Math.random()*max)
}

Array.prototype.randomElement = function () {
  return this[r(this.length)]
}

var chance = function(percent){
   return ( r(100) < percent )
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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

function Plane(color,size){
  var geometry = new THREE.BoxGeometry(size,size,0)
  var material = new THREE.MeshBasicMaterial({color:color})
  var mesh     = new THREE.Mesh(geometry,material)
  return mesh
}

// takes a mouse pixel coordinate
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


// takes x/y where one coord is -1 to 1
function positionMesh(mesh,x,y,z){

  var vector = new THREE.Vector3(x, y, 0.5);
  vector.unproject( camera );
  var dir = vector.sub( camera.position ).normalize();
  var distance = - camera.position.z / dir.z;
  var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );

  mesh.position.set(pos.x,pos.y*-1,z)
}














Color = function(hexOrObject) {
    var obj;
    if (hexOrObject instanceof Object) {
        obj = hexOrObject;
    } else {
        obj = LinearColorInterpolator.convertHexToRgb(hexOrObject);
    }
    this.r = obj.r;
    this.g = obj.g;
    this.b = obj.b;
}

Color.prototype.asRgbCss = function() {
    return "rgb("+this.r+", "+this.g+", "+this.b+")";
}

var LinearColorInterpolator = {
    // convert 6-digit hex to rgb components;
    // accepts with or without hash ("335577" or "#335577")
    convertHexToRgb: function(hex) {
        match = hex.replace(/#/,'').match(/.{1,2}/g);
        return new Color({
            r: parseInt(match[0], 16),
            g: parseInt(match[1], 16),
            b: parseInt(match[2], 16)
        });
    },
    // left and right are colors that you're aiming to find
    // a color between. Percentage (0-100) indicates the ratio
    // of right to left. Higher percentage means more right,
    // lower means more left.
    findColorBetween: function(left, right, percentage) {
        newColor = {};
        components = ["r", "g", "b"];
        for (var i = 0; i < components.length; i++) {
            c = components[i];
            newColor[c] = Math.round(left[c] + (right[c] - left[c]) * percentage / 100);
        }
        return new Color(newColor);
    }
}