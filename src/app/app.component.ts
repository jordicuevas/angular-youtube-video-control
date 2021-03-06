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
    this.init();
  }

  init() {
    if (window['YT']) {
      this.startVideo();
      return;
    } else {
      let tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/player_api';
      let firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window['onYouTubeIframeAPIReady'] = () => this.startVideo();
    }
  }
  startVideo() {
    console.log('ingresa a startvideo');
    this.player = new window['YT'].Player('player', {
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),
        onError: this.onPlayerError.bind(this),
        onReady: this.onPlayerReady.bind(this)
      }
    });
  }
  onPlayerReady(event) {
    event.target.playVideo();
  }
  onPlayerStateChange(event) {
    console.log(event.data);
    if (event.data === 1) {
      // Started playing

      if (!this.timeSpent.length) {
        this.timeSpent = new Array(parseInt(this.player.getDuration()));
      }

      this.timer = setInterval(() => {
        this.timeSpent[parseInt(this.player.getCurrentTime())] = true;
        this.showPercentage();
      }, 100);
    } else if (event.data === 0) {
           clearInterval(this.timer);
           this.player.destroy()    
  } 
  }

  showPercentage() {
    //console.log(this.percent,' el porcentaje')
    let percent = 0;
    if (percent == 100) {
      console.log('se acabó');
      console.log('____________________________________________');

      clearInterval(this.timer);
      return false;
    } else {
      for (let i = 0, l = this.timeSpent.length; i < l; i++) {
        if (this.timeSpent[i]) percent++;
      }
      percent = Math.round((percent / this.timeSpent.length) * 100);

      this.display = percent + '%';

     }
  }
  cleanTime() {
    return Math.round(this.player.getCurrentTime());
  }
  onPlayerError() {}
}
