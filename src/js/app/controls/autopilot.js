var autopilot = {
  animating:{},
  sceneTimer:0,
  scene:null,

  init:function(){

    this._box = {
      type:'div',
      parent:'#main',
      attr:{
        class:'autopilot-clue'
      }
    }

  },
  draw:function(){

    if( valueChanged(this,'autopilotEnabled') ){
      if( state.autopilotEnabled ){
        this._box.innerHTML = 'autopilot'
      }else{
        this._box.innerHTML = ''
      }
    }

    if( !state.autopilotEnabled ) return

    // run current animations
    for ( var controlName in autopilot.animating){

      target  = autopilot.animating[controlName]
      if( target == null) continue

      current = state[controlName]

      if( current > target ){
        updateState( controlName, state[controlName]-1 )
      }
      if( current < target ){
        updateState( controlName, state[controlName]+1 )
      }
      if( current == target ){
        autopilot.animating[controlName] = null
      }
    }

    // do explode part 1
    if( autopilot.scene == 'explode' && autopilot.sceneTimer == 250 ){
      updateState('cubeSpeed',127)
      autopilot.animating['flickerSpeed'] = 126
      updateState('cubeTransparency','full')
      autopilot.animating['height'] = 0
      autopilot.animating['width'] = 0
    }

    // do explode part 2
    if( autopilot.scene == 'explode' && autopilot.sceneTimer == 230 ){
      updateState('cubeTransparency','full')
      updateState('cubeTopDrift',1527)
      updateState('cubeSideDrift',1527)
      updateState('cubeFrontDrift',1527)
    }

    // dont run mutations if scene is running
    if( autopilot.sceneTimer > 0 ){
      autopilot.sceneTimer--
      return
    }else{
      autopilot.scene = null

      // clear planes transitions set for explode
      for (var i = planes.planes.length - 1; i >= 0; i--) {
        planes.planes[i].setAttribute('style','')
      }
    }

    // explode scene
    // if( chance(1) && chance(1) ){
    //   console.log('explode scene')
    //   autopilot.scene = 'explode'
    //   updateState('cubeTransparency','wireframe')
    //   updateState('videoSrc','clear')
    //   autopilot.animating['cubeSpeed'] = 1
    //   updateState('cubeTopDrift',0)
    //   updateState('cubeSideDrift',0)
    //   updateState('cubeFrontDrift',0)
    //   autopilot.animating['flickerSpeed'] = 0
    //   autopilot.sceneTimer = 600
    //   for (var j = planes.planes.length - 1; j >= 0; j--) {
    //     planes.planes[j].setAttribute('style','transition-duration:2s;transition-ease:linear')
    //   }
    //   return
    // }

    // starry night scene
    // if( chance(1) && chance(1) ){
    //   console.log('starry night')
    //   autopilot.animating['height']  = 0
    //   autopilot.animating['width']   = 0
    //   autopilot.animating['scatter'] = 0
    //   autopilot.sceneTimer = 2000
    // }

    // long rain night scene
    // if( chance(1) && chance(1) ){
    //   console.log('long rain')
    //   autopilot.animating['height']    = r(100) + 27
    //   autopilot.animating['width']     = 0
    //   autopilot.animating['scatter']   = 0
    //   autopilot.animating['fallSpeed'] = 50
    //   autopilot.sceneTimer = 2000
    // }


    // chance to change cube formation
    if( chance(1) && chance(5) ){

      console.log('updating cube formation')

      var formation = r(5)
      if( formation == 0 ){
        updateState('cubeFormation','normal')
      }
      if( formation == 1 ){
        updateState('cubeFormation','book')
      }
      if( formation == 2 ){
        updateState('cubeFormation','cluster')
      }
      if( formation == 3 ){
        updateState('cubeFormation','star')
      }
      if( formation == 4 ){
        updateState('cubeFormation','cyllinder')
      }

    }



    // update cube transparency
    // if( chance(1) && chance(5) ){

    //   console.log('updating cube transparency')

    //   var transparency = r(3)
    //   if( transparency == 0 ){
    //     updateState('cubeTransparency','none')
    //   }
    //   if( transparency == 1 ){
    //     updateState('cubeTransparency','full')
    //   }
    //   if( transparency == 2 ){
    //     updateState('cubeTransparency','wireframe')
    //   }
    // }

    // upadte box transparency
    if( chance(1) && chance(5) ){

      console.log('updating box transparency')

      var boxTransparency = r(2)
      if( boxTransparency == 0 ){
        updateState('boxTransparency','solid')
      }
      if( boxTransparency == 1 ){
        updateState('boxTransparency','outline')
      }

    }

    // update cube video src
    if( chance(1) && chance(5) ){

      console.log('updating cube video')

      var c = r(6)

      // if( c == 0 || c == 1 || c == 2 ){
      //   updateState('videoSrc','clear')
      // }
      if( c == 0 || c == 1 || c == 2 || c == 3 ){
        updateState('videoSrc','synth2.mp4')
        updateState('accentRed',0)
        updateState('accentGreen',222)
        updateState('accentBlue',253)
      }
      if( c == 4 ){
        updateState('videoSrc','synth3.mp4')
        updateState('accentRed',89)
        updateState('accentGreen',78)
        updateState('accentBlue',248)
      }
      if( c == 5 ){
        updateState('videoSrc','synth6.mp4')
        updateState('accentRed',89)
        updateState('accentGreen',78)
        updateState('accentBlue',248)
      }
      
    }

    // cube spin speed
    if( chance(1) && chance(5) ){
      target = r(127)+50
      autopilot.animating['cubeSpeed'] = target
      console.log('cubeSpeed '+target)
    }    

    // cube top drift
    if( chance(1) && chance(5) ){
      target = r(127)
      autopilot.animating['cubeTopDrift'] = target
      console.log('cubeTopDrift '+target)
    }    

    // cube sides drift
    if( chance(1) && chance(5) ){
      target = r(127)
      autopilot.animating['cubeSideDrift'] = target
      console.log('cubeSideDrift '+target)
    }    

    // cube front drift
    if( chance(1) && chance(5) ){
      target = r(127)
      autopilot.animating['cubeFrontDrift'] = target
      console.log('cubeFrontDrift '+target)
    }

    // cube return to center
    if( chance(1) && chance(10) ){
      autopilot.animating['cubeTopDrift'] = 0
      autopilot.animating['cubeSideDrift'] = 0
      autopilot.animating['cubeFrontDrift'] = 0
      console.log('Reset cube drift')
    }    

    // update scatter height
    if( chance(1) && chance(5) ){
      target = r(127)

      // more likely to be lower
      if( target > 80 ){
        target = r(127)
      }

      autopilot.animating['height'] = target
      console.log('height '+target)
    }

    // update scatter width
    if( chance(1) && chance(5) ){
      target = r(127)

      // more likely to be lower
      if( target > 80 ){
        target = r(127)
      }

      autopilot.animating['width'] = target
      console.log('width '+target)
    }

    // update scatter distance
    if( chance(1) && chance(20)  ){
      target = r(127)
      autopilot.animating['scatter'] = target
      console.log('scatter '+target)
    }

    // update max amount
    if( chance(1) && chance(20)  ){
      target = r(127)

      // more likely to be lower
      if( target > 80 ){
        target = r(127)
      }

      autopilot.animating['maxAmount'] = target
      console.log('maxAmount '+target)
    }

    // update fall speed
    if( chance(1) && chance(5)  ){
      target = r(127)
      if( chance(90) ) target = 0
      autopilot.animating['fallSpeed'] = target
      console.log('fallSpeed '+target)
    }

    // update flicker speed
    if( chance(1) && chance(30)  ){
      target = r(127)
      if( chance(50) ) target = 127
      if( target !== 127 && chance(10) ) target = 0
      autopilot.animating['flickerSpeed'] = target
      console.log('flickerSpeed '+target)
    }

    // update accent On
    if( chance(1) && chance(1)  ){
      toggleState('accentOn')
    }

    // toggle background
    if( chance(1) && chance(1)  ){
      toggleState('bgVisible')
    }

    // background movement speed
    if( chance(1) && chance(3)  ){
      target = r(127)
      autopilot.animating['boxSpeed'] = target
      console.log('boxSpeed '+target) 
    }

    // background max size
    if( chance(1) && chance(3)  ){
      target = r(127)
      autopilot.animating['boxMax'] = target
      console.log('boxMax '+target) 
    }

    // background min size
    if( chance(1) && chance(3)  ){
      target = r(127)
      autopilot.animating['boxMin'] = target
      console.log('boxMin '+target) 
    }

  }
}