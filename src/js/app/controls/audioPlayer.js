var audioPlayer = {
  ckf:null,
  init:function(){

    this.ckf = new CodeKeyframes({
      audioPath:     'assets/TAKASHI+KIYOKO.mp3',
      editorOpen:    true,
      waveColor:     '#3AEAD2',
      progressColor: '#0c9fa7',
      bgColor:       '#222',
      autoplay:      false,
      label:         'TAKASHI+KIYOKO - Music: EMINA, Visual: Donald Hanson',
      keyframes:     [{"start":10.700000000000001,"end":10.8,"data":{"code":"wavePlane.flatten()"}},{"start":13.400000000000007,"end":13.500000000000007,"data":{"code":"wavePlane.flatten()"}},{"start":16,"end":16.1,"data":{"code":"wavePlane.flatten()"}},{"start":18.64018140589574,"end":18.74018140589574,"data":{"code":"wavePlane.flatten()"}},{"start":0,"end":0.1,"data":{"code":"updateState('wavePlaneSpeed',20)"}}]
    })
    

  }
}