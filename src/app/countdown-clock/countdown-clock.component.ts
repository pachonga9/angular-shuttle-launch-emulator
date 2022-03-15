import { Component, OnInit } from '@angular/core';
import { CountdownClockService } from './countdown-clock.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-countdown-clock',
  templateUrl: './countdown-clock.component.html',
  styleUrls: ['./countdown-clock.component.css'],
})
export class CountdownClockComponent implements OnInit {
  isCounting: boolean = false;
  isHolding: boolean = false;
  public readonly timeState$: Observable<string>;

  constructor(private readonly ccs: CountdownClockService) {
    this.timeState$ = this.ccs.readableTime$;
    this.ccs.isCounting$.subscribe((val) => {
      this.isCounting = val;
    });
    this.ccs.isHolding$.subscribe((val) => {
      this.isHolding = val;
    });
  }

  ngOnInit(): void {}
}
