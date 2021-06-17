import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  timer: any;
  timeSpent = [];
  display: any;
  public YT: any;
  public video: any;
  public player: any;
  public reframed: boolean = false;

  constructor() {}

  ngOnInit() {
    console.log('iniciando !');
    this.video = 'zCB8Z_fO2Yo';
    this.init();
  }

  init() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/player_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
    this.startVideo();
  }
  startVideo() {
    console.log('ingresa a startvideo');
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      videoId: this.video,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1
      },
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),
        onError: this.onPlayerError.bind(this),
        onReady: this.onPlayerReady.bind(this)
      }
    });
  }
  onPlayerReady(event) {
    console.log('ingresa al ready');
    event.target.playVideo();
  }
  onPlayerStateChange(event) {
    console.log(event.data);
    if (event.data === 1) {
      // Started playing
      if (!this.timeSpent.length) {
        this.timeSpent = new Array(parseInt(this.player.getDuration()));
      }
      setInterval(() => {
this.timeSpent[parseInt(this.player.getCurrentTime())] = true;
    this.showPercentage();
      }, 100)
       
    } else {
      clearInterval(this.timer);
    }
  }
  record() {
    
  }

  showPercentage() {
    var percent = 0;
    for (var i = 0, l = this.timeSpent.length; i < l; i++) {
      if (this.timeSpent[i]) percent++;
    }
    percent = Math.round((percent / this.timeSpent.length) * 100);
    this.display = percent + '%';
  }
  cleanTime() {
    return Math.round(this.player.getCurrentTime());
  }
  onPlayerError() {}
}
