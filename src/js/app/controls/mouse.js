var mouse = {

  x:-100,
  y:-100,

  init:function(){

    document.addEventListener('mousedown',function(e){
      // console.log('clicked')
    })

    document.addEventListener('mousemove',function(e){
      
      mouse.x = e.clientX
      mouse.y = e.clientY

      // move slider
      if( keyboard.activeControl ){

        // slider style
        var percent = (((e.clientY / window.innerHeight) - 1) * -1)
        window.slider.style.height = (percent*100)+"%"

        // update control
        var controlY = Math.floor(percent * 127)
        updateState(keyboard.activeControl,controlY)

      }

    })

  }
}