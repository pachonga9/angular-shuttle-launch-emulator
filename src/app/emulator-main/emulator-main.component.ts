import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CountdownClockService } from '../countdown-clock/countdown-clock.service';
import { ButtonControlService } from './button-control.service';
import { ButtonState } from './button-state';

@Component({
  selector: 'app-emulator-main',
  templateUrl: './emulator-main.component.html',
  styleUrls: ['./emulator-main.component.scss'],
})
export class EmulatorMainComponent implements OnInit {
  isCounting: boolean = false;
  isHolding: boolean = false;

  public readonly buttonState$: Observable<ButtonState>;

  constructor(
    private readonly bcs: ButtonControlService,
    private readonly ccs: CountdownClockService
  ) {
    this.ccs.isCounting$.subscribe((val) => {
      this.isCounting = val;
    });
    this.buttonState$ = bcs.buttonState$;

    this.ccs.isHolding$.subscribe((val) => {
      this.isHolding = val;
    });
  }

  // countdownButtonIsDisabled: boolean = false;
  // advanceButtonIsDisabled: boolean = true;
  // holdButtonIsDisabled: boolean = true;
  // continueButtonIsDisabled: boolean = true;
  // abortButtonIsDisabled: boolean = true;

  beginCountdown(): void {
    console.log(`before: ${this.isCounting} should say FALSE.`);
    this.bcs.beginCountdown();
    console.log(`after: ${this.isCounting} should say TRUE.`);
    // this.checkButtons();
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
    // this.checkButtons();
  }

  // checkButtons(): void {
  //   if (this.isCounting) {
  //     this.countdownButtonIsDisabled = true;
  //     this.abortButtonIsDisabled = false;
  //   } else if (this.isCounting === false) {
  //     this.countdownButtonIsDisabled = false;
  //     this.abortButtonIsDisabled = true;
  //   }
  // }

  ngOnInit(): void {}
}
