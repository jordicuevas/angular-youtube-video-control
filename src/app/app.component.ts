import { Component, VERSION } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
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
  percent = 0;
  constructor() {}

  ngOnInit() {
    this.video = 'zCB8Z_fO2Yo';
    // this.init();
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
    event.target.playVideo();
  }
  onPlayerStateChange(event) {
    if (event.data === 1) {
      // Started playing
      if (!this.timeSpent.length) {
        this.timeSpent = new Array(parseInt(this.player.getDuration()));
      }
      /*   setInterval(() => {
this.timeSpent[parseInt(this.player.getCurrentTime())] = true;
    this.showPercentage();
      }, 100)*/
      interval(1000)
        .pipe(takeWhile(() => this.percent == 100))
        .subscribe(() => {
          this.display = this.percent + '%';
        });
    } else {
      clearInterval(this.timer);
    }
  }
  record() {}

  showPercentage() {
    for (var i = 0, l = this.timeSpent.length; i < l; i++) {
      if (this.timeSpent[i]) this.percent++;
    }
    this.percent = Math.round((this.percent / this.timeSpent.length) * 100);
  }
  cleanTime() {
    return Math.round(this.player.getCurrentTime());
  }
  onPlayerError() {}
}
