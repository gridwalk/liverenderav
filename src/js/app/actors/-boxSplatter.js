var boxSplatter = {
  _box:null,
  _style:null,
  boxes:[],

  init:function(){

    this._box = createEl('div','',{
      class:'box-splatter container'
    })

    _main.appendChild(this._box)

    this._style = document.createElement('style')
    document.querySelector('head').appendChild(this._style)

  },
  draw:function(){

    _sbox = createEl('div','',{
      class:'splatter-box'
    })

    _sbox.style.width = r( state.width + 2 )+'vmax'
    _sbox.style.height = r( state.height + 2 )+'vmax'
    
    if( state.accentOn && chance( state.chanceAccent ) ){
      _sbox.classList.add('accent')
    }

    if( state.boxTransparency == 'outline' ){
      _sbox.classList.add('transparent')
    }else if( state.boxTransparency == 'solid' ){
      // leave default 
    }

    // box is scattered
    if( r( state.scatter ) < 3 ){
      x = r(150) - 75
      y = r(100) - 50
      _sbox.style.marginTop  = x+'vh';
      _sbox.style.marginLeft = y+'vw';
    }

    this.boxes.push(_sbox)
    this._box.appendChild(_sbox)
 
    if( this.boxes.length > state.maxAmount ){

      while( this._box.childElementCount > state.maxAmount+1 ){
        this._box.firstElementChild.remove()  
      }
      
    }

    // update fall animation    
    if( valueChanged( this,'fallSpeed' )){
      var fallSpeed = state.fallSpeed * 2
      this._style.innerHTML = "@keyframes fall { from { transform:translate(0,0) } to { transform:translate("+fallSpeed+"px,"+fallSpeed+"px);}}.box-splatter{transform:translate(-"+fallSpeed/2+"px,-"+fallSpeed/2+"px) rotate(-45deg)}"  
    }
    

  }
}