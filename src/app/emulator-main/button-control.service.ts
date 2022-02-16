import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CountdownClockService } from '../countdown-clock/countdown-clock.service';
import { ButtonState } from './button-state';

@Injectable({
  providedIn: 'root',
})
export class ButtonControlService {
  private readonly currentButtonState = new ButtonState();
  private readonly buttonState = new BehaviorSubject<ButtonState>(
    this.currentButtonState
  );
  constructor(private readonly ccs: CountdownClockService) {
    this.ccs.isCounting$.subscribe((isCounting: boolean) => {
      if (isCounting) {
        this.currentButtonState.abortButtonIsDisabled = false;
        this.currentButtonState.holdButtonIsDisabled = false;
        this.currentButtonState.countdownButtonIsDisabled = true;
        this.currentButtonState.advanceButtonIsDisabled = false;
      } else {
        this.currentButtonState.abortButtonIsDisabled = true;
        this.currentButtonState.holdButtonIsDisabled = true;
        this.currentButtonState.countdownButtonIsDisabled = false;
        this.currentButtonState.advanceButtonIsDisabled = true;
      }
      this.buttonState.next(this.currentButtonState);
    });
    this.ccs.isHolding$.subscribe((isHolding: boolean) => {
      this.currentButtonState.holdButtonIsDisabled = isHolding;
      this.currentButtonState.continueButtonIsDisabled = !isHolding;
      console.log(`is Holding: ${isHolding}`);
      this.buttonState.next(this.currentButtonState);
    });
  }

  get buttonState$(): Observable<ButtonState> {
    return this.buttonState.asObservable();
  }

  beginCountdown(): void {
    console.log('begin countdown button clicked.');
    /// cause isCounting in countdown-clock service to emit true...
    this.ccs.beginCountdown();
  }
  advanceOneHour(): void {
    console.log('Advance button clicked.');
  }
  hold(): void {
    console.log('hold button clicked.');
  }
  continueCountdown(): void {
    console.log('continue button clicked.');
  }
  abort(): void {
    console.log('Abort button clicked.');
    // cause isCounting to emit false.
    this.ccs.stopCountdown();
  }
}
