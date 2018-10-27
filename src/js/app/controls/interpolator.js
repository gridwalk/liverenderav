// var interpolator = {
  
//   threads:[],

//   draw: function(){

//     if( interpolator.threads.length == 0 ) return

//     for (var i = 0; i < interpolator.threads.length; i++) {

//       var controlName = interpolator.threads[i][0]
//       var target      = interpolator.threads[i][1]
//       var increment   = interpolator.threads[i][2]
//       var direction   = interpolator.threads[i][3]

//       console.log(controlName,target,increment,direction)

//       if( direction == 'up' ){
//         st.set(controlName, state[controlName] + increment )
//       }

//       if( direction == 'down' ){
//         st.set(controlName, state[controlName] - increment )
//         console.log(state[controlName])
//       }

//       if( direction == 'up' && state[controlName] >= target ){
//         interpolator.threads.splice( i, 1 )
//       }

//       if( direction == 'down' && state[controlName] <= target ){
//         console.warn('killed thread for '+controlName)
//         interpolator.threads.splice( i, 1 )
//       }

//     }

//   },

//   start: function(controlName,target,increment){


//     var direction = 'down'
//     if( target > state[controlName] ) direction = 'up'

//     console.log(direction)

//     // remove duplicate threads
//     for (var i = interpolator.threads.length - 1; i >= 0; i--) {
//       if( interpolator.threads[i][0] == controlName ){
//         interpolator.threads.splice(i,1)
//       }
//     } 

//     interpolator.threads.push([controlName,target,increment,direction])

//   },

//   reset: function(){
//     for (var i = this.threads.length - 1; i >= 0; i--) {
//       interpolator.threads.splice( i, 1 )
//     }
//   }

// }