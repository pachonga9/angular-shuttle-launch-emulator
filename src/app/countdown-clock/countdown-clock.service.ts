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
  // speedRate: number = 1;

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
    // this.speedRate.next(val);
    this.speedRate.next(1000 / val);
    // this.advanceOneSecond(); this starts too many countdowns at once...
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
        const currentSpeedRate = this.speedRate.getValue();
        const millisToRemove = 1000 / currentSpeedRate;
        const currentMillis = this.millisRemaining.getValue();
        this.millisRemaining.next(currentMillis - millisToRemove);
      });

    // const rate$ = this.speedRate$
    // const timer$ = interval(1000 / rate$);
    // const pause$ = race(this.isHolding$, this.isCounting$);

    // timer$.pipe(takeUntil(pause$)).subscribe(() => {
    //   this.millisRemaining.next(
    //     this.millisRemaining.value - this.advanceSecond
    //   );
    // });
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
