var mouse = {

  x:-9999999,
  y:-9999999,
  percentY:-50,
  percentX:-50,

  init:function(){

    document.addEventListener('mousedown',function(e){
      // console.log('clicked')
    })

    document.addEventListener('mousemove',function(e){
      
      // renderer.clear()

      mouse.x = e.clientX
      mouse.y = e.clientY

      mouse.percentX = (((e.clientX / window.innerWidth) - 1) * -1)
      mouse.percentY = (((e.clientY / window.innerHeight) - 1) * -1)

      // move slider
      if( keyboard.activeControl ){

        // slider style
        window.slider.style.height = (mouse.percentY*100)+"%"

        // update control
        var controlY = Math.floor( mouse.percentY * 127)
        st.set(keyboard.activeControl,controlY,.05)

      }

    })

  }
}