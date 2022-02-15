import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownClockService {
  constructor() {}

  message: string = 'Hey, this is the clock.';

  private readonly messages = new BehaviorSubject<string>(this.message);

  get clock$(): Observable<string> {
    return this.messages.asObservable();
  }

  isCounting$ = new BehaviorSubject<boolean>(false);

  // get count$(): Observable<boolean> {
  //   return this.isCounting$.asObservable();
  // }
}

// Go into your countdown service and create an observable that emits true or false
// (starting with false). Call it isCounting.
