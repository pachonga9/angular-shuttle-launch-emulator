import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownClockService {
  constructor() {}

  message: string = 'Hey, this is the clock.';
  private readonly isCounting = new BehaviorSubject<boolean>(false);
  private readonly isHolding = new BehaviorSubject<boolean>(false);
  private readonly messages = new BehaviorSubject<string>(this.message);

  get clock$(): Observable<string> {
    return this.messages.asObservable();
  }

  get isCounting$(): Observable<boolean> {
    return this.isCounting.asObservable();
  }

  beginCountdown(): void {
    this.isCounting.next(true);
    this.isHolding.next(false);
  }

  stopCountdown(): void {
    this.isCounting.next(false);
  }

  hold(): void {
    this.isHolding.next(true);
  }

  continue(): void {
    this.isHolding.next(false);
  }

  get isHolding$(): Observable<boolean> {
    return this.isHolding.asObservable();
  }
}

// Go into your countdown service and create an observable that emits true or false
// (starting with false). Call it isCounting.
