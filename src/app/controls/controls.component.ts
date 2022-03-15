import { Component, OnInit } from '@angular/core';
import { ButtonControlService } from './button-control.service';
import { CountdownClockService } from '../countdown-clock/countdown-clock.service';
import { ButtonState } from './button-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent implements OnInit {
  isCounting: boolean = false;
  isHolding: boolean = false;

  public readonly buttonState$: Observable<ButtonState>;

  constructor(
    private readonly bcs: ButtonControlService,
    private readonly ccs: CountdownClockService
  ) {
    this.buttonState$ = bcs.buttonState$;

    this.ccs.isCounting$.subscribe((val) => {
      this.isCounting = val;
    });
  }

  formatLabel(value: number) {
    switch (value) {
      case 0:
        return '1x';
      case 1:
        return '2x';
      case 2:
        return '10x';
      case 3:
        return '1000x';
    }
    return value;
  }

  onChangeRange(changeVal: number) {
    switch (changeVal) {
      case 0:
        this.bcs.speedRateChanger(1);
        break;
      case 1:
        this.bcs.speedRateChanger(2);
        break;
      case 2:
        this.bcs.speedRateChanger(10);
        break;
      case 3:
        this.bcs.speedRateChanger(1000);
        break;
    }
    return changeVal;
  }

  beginCountdown(): void {
    console.log(`before: ${this.isCounting} should say FALSE.`);
    this.bcs.beginCountdown();
    console.log(`after: ${this.isCounting} should say TRUE.`);
  }
  advanceOneHour(): void {
    this.bcs.advanceOneHour();
  }

  hold(): void {
    this.bcs.hold();
  }
  continueCountdown(): void {
    this.bcs.continueCountdown();
  }
  abort(): void {
    this.bcs.abort();
    console.log(this.isCounting);
  }

  ngOnInit(): void {}
}
