import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, interval, race } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Duration } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class CountdownClockService {
  constructor() {}

  durationMillis = Duration.fromObject({ hours: 43 }).toMillis();
  advanceHour = Duration.fromObject({ hours: 1 }).toMillis();
  advanceSecond = Duration.fromObject({ seconds: 1 }).toMillis();
  launchMessage: string = 'Liftoff';

  private readonly speedRate = new BehaviorSubject<number>(1);
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

  changeSpeed(val: number): void {
    this.speedRate.next(val);
  }

  beginCountdown(): void {
    this.isCounting.next(true);
    this.isHolding.next(false);
    this.millisRemaining.next(this.durationMillis);
    this.advanceOneSecond();

    this.millisRemaining$.subscribe(this.evaluateTime);
  }

  advanceOneHour(): void {
    this.millisRemaining.next(this.millisRemaining.value - this.advanceHour);
  }

  get speedRate$(): Observable<number> {
    return this.speedRate.asObservable();
  }

  advanceOneSecond(): void {
    const pause$ = race(this.isHolding$, this.isCounting$);
    this.speedRate
      .pipe(
        map((speedRate: number) => 1000 / speedRate),
        switchMap((ms: number) => interval(ms)),
        takeUntil(pause$)
      )
      .subscribe(() => {
        const currentMillis = this.millisRemaining.getValue();
        this.millisRemaining.next(currentMillis - 1000);
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

  //// hold logic; subscribe to the time remaining, pass it to a function that will evaluate time...
  //// when the evaluator sees the time hits a threshold. Activate the hold as if the hold button was clicked...

  evaluateTime = (millisRemaining: number): void => {
    if (millisRemaining === Duration.fromObject({ hours: 27 }).toMillis()) {
      this.hold();
    } else if (
      millisRemaining === Duration.fromObject({ hours: 19 }).toMillis()
    ) {
      this.hold();
    } else if (
      millisRemaining === Duration.fromObject({ hours: 11 }).toMillis()
    ) {
      this.hold();
    } else if (
      millisRemaining === Duration.fromObject({ hours: 6 }).toMillis()
    ) {
      this.hold();
    } else if (
      millisRemaining === Duration.fromObject({ hours: 3 }).toMillis()
    ) {
      this.hold();
    }
  };
}
