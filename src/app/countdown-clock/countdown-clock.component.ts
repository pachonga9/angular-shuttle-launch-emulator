import { Component, OnInit } from '@angular/core';
import { CountdownClockService } from './countdown-clock.service';

@Component({
  selector: 'app-countdown-clock',
  templateUrl: './countdown-clock.component.html',
  styleUrls: ['./countdown-clock.component.css'],
})
export class CountdownClockComponent implements OnInit {
  clockMap: string[] = [];
  constructor(private readonly ccs: CountdownClockService) {
    this.ccs.clock$.subscribe((str) => {
      this.clockMap.push(str);
    });
  }

  ngOnInit(): void {}
}
