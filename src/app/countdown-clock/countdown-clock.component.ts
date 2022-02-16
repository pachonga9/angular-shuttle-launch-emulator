import { Component, OnInit } from '@angular/core';
import { CountdownClockService } from './countdown-clock.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-countdown-clock',
  templateUrl: './countdown-clock.component.html',
  styleUrls: ['./countdown-clock.component.css'],
})
export class CountdownClockComponent implements OnInit {
  // clockMap: string[] = [];
  public readonly messageMap$: Observable<string>;
  public readonly timeState$: Observable<number>;

  constructor(private readonly ccs: CountdownClockService) {
    // this.ccs.clock$.subscribe((str) => {
    //   this.clockMap.push(str);
    // });
    this.messageMap$ = this.ccs.messages$;

    this.timeState$ = this.ccs.remaining$;
  }

  ngOnInit(): void {}
}
