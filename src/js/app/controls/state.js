// holds state values
// populated in st.load() and initControls()
var state = {}

var st = {
  save:function(){
    localStorage.setItem('state',JSON.stringify(state))
  },
  load:function(){
    if( !localStorage.getItem('state') ) return
    state = JSON.parse(localStorage.getItem('state'))
  },
  set:function(controlName,val,increment){

    if( increment ){
      // do interpolation
      st.interpolator.start(controlName,val,increment)
    }else{
      // set immediately
      state[controlName] = val
      st.save()
    }
  },
  reset:function(){
    for (var i = controls.length - 1; i >= 0; i--) {
      var controlName    = controls[i].name
      var controlDefault = controls[i].default
      if( controlDefault == undefined ) continue
      st.set(controlName,controlDefault)
    }
    st.interpolator.reset()
  },
  bake:function(){
    var declarations = ''
    for (var controlName in state) {
      declarations += "state."+controlName +" = "+state[controlName]+";\n"
    }
    console.log(declarations)
  },
  
  cache:{},
  hasChanged: function(controlName){
  	if( st.cache[controlName] == state[controlName] ) return false
		st.cache[controlName] = state[controlName]
		return true
  },
  
  interpolator:{
    threads:[],
    draw: function(){

      var inter = st.interpolator

      if( inter.threads.length == 0 ) return

      for (var i = 0; i < inter.threads.length; i++) {

        var controlName = inter.threads[i][0]
        var target      = inter.threads[i][1]
        var increment   = inter.threads[i][2]
        var direction   = inter.threads[i][3]

        // console.log(controlName,target,increment,direction)

        if( direction == 'up' ){
          st.set(controlName, state[controlName] + increment )
        }

        if( direction == 'down' ){
          st.set(controlName, state[controlName] - increment )
          // console.log(state[controlName])
        }

        if( direction == 'up' && state[controlName] >= target ){
          inter.threads.splice( i, 1 )
        }

        if( direction == 'down' && state[controlName] <= target ){
          // console.warn('killed thread for '+controlName)
          inter.threads.splice( i, 1 )
        }
      }
    },

    start: function(controlName,target,increment){

      

      var inter = st.interpolator

      var direction = 'down'
      if( target > state[controlName] ) direction = 'up'


        // console.log(controlName,target,state[controlName],direction)

      // remove duplicate threads
      for (var i = inter.threads.length - 1; i >= 0; i--) {
        if( inter.threads[i][0] == controlName ){
          inter.threads.splice(i,1)
        }
      }

      inter.threads.push([controlName,target,increment,direction])
    },

    reset: function(){
      var inter = st.interpolator
      for (var i = inter.threads.length - 1; i >= 0; i--) {
        inter.threads.splice( i, 1 )
      }
    }
  }
}