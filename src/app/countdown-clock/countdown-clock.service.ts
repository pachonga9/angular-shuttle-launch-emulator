import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownClockService {
  constructor() {}

  message: string = 'Hey, this is the clock.';
  launchMessage: string = 'Liftoff';

  private readonly isCounting = new BehaviorSubject<boolean>(false);
  private readonly isHolding = new BehaviorSubject<boolean>(false);
  private readonly messages = new BehaviorSubject<string>(this.message);
  private readonly hoursRemaining = new BehaviorSubject<number>(9999); ///I had to assign this a number other than zero to avoid the launch sequence at startup.

  get messages$(): Observable<string> {
    return this.messages.asObservable();
  }

  get isCounting$(): Observable<boolean> {
    return this.isCounting.asObservable();
  }

  get remaining$(): Observable<number> {
    return this.hoursRemaining.asObservable();
  }

  get isHolding$(): Observable<boolean> {
    return this.isHolding.asObservable();
  }

  beginCountdown(): void {
    this.isCounting.next(true);
    this.isHolding.next(false);
    this.hoursRemaining.next(48);
  }

  advanceOneHour(): void {
    this.hoursRemaining.next(this.hoursRemaining.value - 1);
  }

  abort(): void {
    this.isCounting.next(false);
  }

  hold(): void {
    this.isHolding.next(true);
  }

  continue(): void {
    this.isHolding.next(false);
  }

  launch(): void {
    this.isCounting.next(false);
    console.log('LIFTOFF!');
    this.messages.next(this.launchMessage);
  }
}
