var keyboard = {

  // guiTimer:

  // references which control is actice
  activeControl:null,
  
  // map is generated in controls.js
  inputMap:{},

  init:function(){

    document.onkeydown = this.onPress
    document.onkeyup   = this.onRelease

    // add slider to the screen
    createEl({
      type:   'div',
      id:     'slider',
      parent: '#main'
    })

    createEl({
      type:   'div',
      id:     'slider-title',
      parent: '#slider'
    })

    createEl({
      type:   'div',
      class:  'slider-bar',
      parent: '#slider'
    })

    // <div id="slider">
    //   <div id="slider-title">Scatter</div>
    //   <div class="slider-bar"></div>
    // </div>

  },

  onPress:function(e){
    
    keyString = String.fromCharCode( e.which )
    control = keyboard.inputMap[keyString]

    if( control ){

      console.log(control.name)

      // do the control (knob)    
      if( control.type == 'knob' ){
        keyboard.activeControl = control.name
      }

      // do the control (toggle)
      if( control.type == 'toggle' ){
      	st.set( control.name, !state[control.name] )
      }

      // do the control (set)
      if( control.type == 'set' ){
      	st.set(control.name, control.default)
      }

      // output the control name to the screen
      window['slider-title'].innerHTML = control.name  

    }
    
  },

  onRelease:function(){
    keyboard.activeControl = null
  }

}