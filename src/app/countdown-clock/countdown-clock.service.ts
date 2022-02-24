import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  Observable,
  pipe,
  interval,
  race,
} from 'rxjs';
import { map, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { Duration, DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class CountdownClockService {
  constructor() {}

  durationMillis = Duration.fromObject({ hours: 43 }).toMillis();
  advanceHour = Duration.fromObject({ hours: 1 }).toMillis();
  advanceSecond = Duration.fromObject({ seconds: 1 }).toMillis();
  launchMessage: string = 'Liftoff';

  private readonly isCounting = new Subject<boolean>();
  private readonly isHolding = new Subject<boolean>();
  private readonly millisRemaining = new BehaviorSubject<number>(
    this.durationMillis
  );

  get readableTime$(): Observable<string> {
    return this.millisRemaining$.pipe(
      map((val) => {
        const x = Duration.fromMillis(val);
        const convertedTime = x.toFormat('T-hh:mm:ss');
        return convertedTime;
      })
    );
  }

  get isCounting$(): Observable<boolean> {
    return this.isCounting.asObservable();
  }

  get isHolding$(): Observable<boolean> {
    return this.isHolding.asObservable();
  }

  get millisRemaining$(): Observable<number> {
    return this.millisRemaining.asObservable();
  }

  beginCountdown(): void {
    this.isCounting.next(true);
    this.isHolding.next(false);
    this.millisRemaining.next(this.durationMillis);
    this.advanceOneSecond();
  }

  advanceOneHour(): void {
    this.millisRemaining.next(this.millisRemaining.value - this.advanceHour);
  }

  advanceOneSecond(): void {
    const timer$ = interval(1000);
    const pause$ = race(this.isHolding$, this.isCounting$);

    timer$.pipe(takeUntil(pause$)).subscribe(() => {
      this.millisRemaining.next(
        this.millisRemaining.value - this.advanceSecond
      );
    });
  }

  abort(): void {
    this.isCounting.next(false);
    this.isHolding.next(false);
  }

  hold(): void {
    this.isHolding.next(true);
  }

  continue(): void {
    this.isHolding.next(false);
    this.advanceOneSecond();
  }

  launch(): void {
    this.isCounting.next(false);
    console.log('LIFTOFF!');
  }
}
