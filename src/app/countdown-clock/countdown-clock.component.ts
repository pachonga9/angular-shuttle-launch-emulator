import { Component, OnInit } from '@angular/core';
import { CountdownClockService } from './countdown-clock.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-countdown-clock',
  templateUrl: './countdown-clock.component.html',
  styleUrls: ['./countdown-clock.component.css'],
})
export class CountdownClockComponent implements OnInit {
  public readonly timeState$: Observable<string>;

  constructor(private readonly ccs: CountdownClockService) {
    this.timeState$ = this.ccs.readableTime$;
  }

  ngOnInit(): void {}
}
