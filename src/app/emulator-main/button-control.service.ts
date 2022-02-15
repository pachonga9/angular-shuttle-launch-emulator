import { Injectable } from '@angular/core';
import { CountdownClockService } from '../countdown-clock/countdown-clock.service';

@Injectable({
  providedIn: 'root',
})
export class ButtonControlService {
  constructor(private readonly ccs: CountdownClockService) {}

  beginCountdown(): void {
    console.log('begin countdown button clicked.');
    /// cause isCounting in countdown-clock service to emit true...
    return this.ccs.isCounting$.next(true);
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
    return this.ccs.isCounting$.next(false);
  }
}
