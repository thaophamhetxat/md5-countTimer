import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {
  message = '';
  remainingTime: number | undefined;
  @Input() seconds = 11;
  @Output() finish = new EventEmitter<boolean>();
  private intervalId = 0;

  ngOnchanges(changes: SimpleChanges) {
    if ('seconds' in changes) {
      let v = changes.seconds.currentValue;
      v = typeof v === 'undefined' ? 11 : v;
      const vFixed = Number(v);
      this.seconds = Number.isNaN(vFixed) ? 11 : vFixed;
    }
  }


  constructor() {
  }

  ngOnInit(): void {
  }


  clearTimer(){
    clearInterval(this.intervalId);
  }

  ngOnDestroy(){
    this.clearTimer();
  }

  private countDown(){
    this.clearTimer();
    this.intervalId = window.setInterval(()=>{
      // @ts-ignore
      this.remainingTime -=1;
      if(this.remainingTime===0){
        this.message = 'blast off!';
        this.clearTimer();
        this.finish.emit(true);
      }else {
        this.message = `T-${this.remainingTime} second and counting`
      }
    },1000);
  }


  reset(){
    this.clearTimer();
    this.remainingTime = this.seconds;
    this.message = `click start button to start the countdown`;
  }

  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.remainingTime} seconds`;
  }

  start() {
    this.countDown();
    // @ts-ignore
    if (this.remainingTime <= 0) {
      this.remainingTime = this.seconds;
    }
  }
}
