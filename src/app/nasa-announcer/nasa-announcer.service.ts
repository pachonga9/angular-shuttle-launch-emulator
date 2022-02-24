import { Injectable } from '@angular/core';
import { Duration } from 'luxon';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinct } from 'rxjs/operators';
import { CountdownClockService } from '../countdown-clock/countdown-clock.service';

@Injectable({
  providedIn: 'root',
})
export class NasaAnnouncerService {
  private readonly announcement = new ReplaySubject<string>(1);
  private readonly milestones = new Map<number, string>();

  constructor(private readonly ccs: CountdownClockService) {
    this.ccs.millisRemaining$.subscribe(this.evaluateTime);
    this.milestones = this.createMilestoneMap();
  }

  get announcement$(): Observable<string> {
    return this.announcement.pipe(distinct());
  }

  evaluateTime = (millisRemaining: number): void => {
    for (const [key, value] of this.milestones) {
      if (millisRemaining <= key) {
        this.announcement.next(value);
      }
    }
  };

  private createMilestoneMap = (): Map<number, string> => {
    const a = Duration.fromObject({ hours: 43 }).toMillis();
    const b = Duration.fromObject({ hours: 27 }).toMillis();
    const c = Duration.fromObject({ hours: 27 }).toMillis() - 1;
    const d = Duration.fromObject({ hours: 19 }).toMillis();
    const e = Duration.fromObject({ hours: 19 }).toMillis() - 1;
    const f = Duration.fromObject({ hours: 11 }).toMillis();
    const g = Duration.fromObject({ minutes: 20 }).toMillis();
    const h = Duration.fromObject({ minutes: 9 }).toMillis();
    const i = Duration.fromObject({ seconds: 6.6 }).toMillis();
    const l = 0;
    const map = new Map<number, string>();
    map.set(
      a,
      `Countdown Clock activated! Shuttle Test Director performs the traditional call to stations. Next event at 27 hours.`
    );
    map.set(
      b,
      `T-27 hours and holding. This will be the first built-in hold and will last for four hours.`
    );
    map.set(
      c,
      `T-27 hours and counting. Begin operations to load cryogenic reactants into the orbiter's fuel cell storage tanks. Next event at 19 hours.`
    );
    map.set(d, `T-19 hours and holding. This built-in hold lasts four hours`);
    map.set(
      e,
      `T-19 hours and counting. Begin final preparations of the orbiter's three main engines for main propellant tanking and flight. Next event at 11 hours.`
    );
    map.set(
      f,
      `T-11 hours and counting. Activate the orbiter's fuel cells. Clear the blast danger area of all nonessential personnel. Next event at 20 minutes.`
    );
    map.set(
      g,
      `T-20 minutes and counting. Transition the orbiter's onboard computers to launch configuration. Next Event at 9 minutes.`
    );
    map.set(
      h,
      `T-9 minutes and counting. Start automatic ground launch sequencer. Next event at 6.6 seconds.`
    );
    map.set(i, `T-6.6 seconds. Main Engine Start...`);
    map.set(l, `Solid rocket booster ignition and liftoff!`);
    return map;
  };
}
