import { Injectable } from '@angular/core';
import { Duration } from 'luxon';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
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
    return this.announcement.pipe(distinctUntilChanged());
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
    ////
    const bHold = Duration.fromObject({ hours: 27 }).toMillis();
    const b = Duration.fromObject({ hours: 27 }).toMillis() - 1;
    ////
    const cHold = Duration.fromObject({ hours: 19 }).toMillis();
    const c = Duration.fromObject({ hours: 19 }).toMillis() - 1;
    ////
    const dHold = Duration.fromObject({ hours: 11 }).toMillis();
    const d = Duration.fromObject({ hours: 11 }).toMillis() - 1;
    ////
    const eHold = Duration.fromObject({ hours: 6 }).toMillis();
    const e = Duration.fromObject({ hours: 6 }).toMillis() - 1;
    ////
    const fHold = Duration.fromObject({ hours: 3 }).toMillis();
    const f = Duration.fromObject({ hours: 3 }).toMillis() - 1;
    ////
    const g = Duration.fromObject({ minutes: 20 }).toMillis();
    ////
    const h = Duration.fromObject({ minutes: 9 }).toMillis();
    ////
    const i = Duration.fromObject({ minutes: 7, seconds: 30 }).toMillis();
    /////
    const j = Duration.fromObject({ minutes: 5 }).toMillis();
    ////
    const k = Duration.fromObject({ minutes: 3, seconds: 55 }).toMillis();
    ////
    const l = Duration.fromObject({ minutes: 2, seconds: 55 }).toMillis();
    ////
    const m = Duration.fromObject({ minutes: 2 }).toMillis();
    ////
    const n = Duration.fromObject({ minutes: 1 }).toMillis();
    ////
    const o = Duration.fromObject({ seconds: 50 }).toMillis();
    ////
    const p = Duration.fromObject({ seconds: 30 }).toMillis();
    ///
    const q = Duration.fromObject({ seconds: 16 }).toMillis();
    ////
    const r = Duration.fromObject({ seconds: 10 }).toMillis();
    ////
    const s = Duration.fromObject({ seconds: 6.6 }).toMillis();
    ///
    const t = 0;

    const map = new Map<number, string>();
    map.set(
      a,
      `Countdown Clock activated! Shuttle Test Director performs the traditional call to stations. Begin final vehicle and facility close-outs for launch. Next event at 27 hours.`
    );
    ///
    map.set(
      bHold,
      `T-27 hours and holding. This will be the first built-in hold and typically will last for four hours. Press continue when ready to proceed.`
    );
    map.set(
      b,
      `T-27 hours and counting. Begin operations to load cryogenic reactants into the orbiter's fuel cell storage tanks. Next event at 19 hours.`
    );
    ///
    map.set(
      cHold,
      `T-19 hours and holding. This built-in hold will typically last four hours. Press continue when ready to proceed.`
    );
    map.set(
      c,
      `T-19 hours and counting. Begin final preparations of the orbiter's three main engines for main propellant tanking and flight. Next event at 11 hours.`
    );
    ///
    map.set(
      dHold,
      `T-11 hours and holding. This built-in hold will typically last 13 hours. Press continue when ready to proceed.`
    );
    map.set(
      d,
      `T-11 hours and counting. Activate the orbiter's fuel cells. Clear the blast danger area of all nonessential personnel. Next event at 6 hours.`
    );
    ///
    map.set(
      eHold,
      `T-6 hours and holding. This built-in hold lasts 2 about hours. Press continue when ready to proceed.`
    );
    map.set(
      e,
      `T-6 hours and counting. Finish filling the external tank with its flight load of liquid hydrogen and liquid oxygen propellants. Next event at 3 hours.`
    );
    ///
    map.set(
      fHold,
      `T-3 hours and holding. This built-in hold lasts 2.5 hours. Final Inspection Team proceeds to the launch pad to conduct a detailed analysis of the vehicle. Astronauts enter the crew module. Press continue when ready to proceed.`
    );
    map.set(
      f,
      `T-3 hours and counting. Check cockpit switch configurations.
      Astronauts perform air-to-ground voice checks with Launch Control (Kennedy Space Center) and Mission Control (Johnson Space Center).
      Close the orbiter's crew hatch and check for leaks.
      Close-out crew retreats to fallback area. Next event at 20 minutes.`
    );
    ///
    map.set(
      g,
      `T-20 minutes and counting. Transition the orbiter's onboard computers to launch configuration. Start fuel cell thermal conditioning. Next Event at 9 minutes.`
    );
    ///
    map.set(
      h,
      `T-9 minutes and counting. Start automatic ground launch sequencer. Next event at 7.5 minutes.`
    );
    ///
    map.set(
      i,
      `T-7 minutes 30 seconds and counting. Retract orbiter access arm. Next event at 5 minutes.`
    );
    ///
    map.set(
      j,
      `T-5 minutes and counting. Start auxiliary power units. Next event at T-3 minutes, 55 seconds.`
    );
    ///
    map.set(
      k,
      `T-3 minutes, 55 seconds. Start orbiter aerosurface profile test, followed by main engine gimbal profile test. Next event at T-2 minutes, 55 seconds.`
    );
    ///
    map.set(
      l,
      `T-2 minutes, 55 seconds. Retract gaseous oxygen vent arm. Next event at T-2 minutes.`
    );
    ///
    map.set(
      m,
      `T-2 minutes. Crew members close and lock their visors. Next event at T-1 one minute.`
    );
    ///
    map.set(n, `T-1 minute to launch... next event at 50 Seconds`);
    ///
    map.set(
      o,
      `T-50 Seconds. Orbiter transfers from ground to internal power. Next event at 30 seconds.`
    );
    ///
    map.set(
      p,
      `T-30 Seconds. Ground launch sequencer is go for auto sequence start. Next event at 16 seconds.`
    );
    ///
    map.set(q, ` T-16 Seconds. Activate launch pad sound suppression system`);
    ///
    map.set(
      r,
      `T-10 Seconds. Activate main engine hydrogen burnoff system. Enjoy the ride, boys...`
    );
    ///
    map.set(s, `T-6.6 seconds. Main Engine Start...`);
    ///
    map.set(t, `Solid rocket booster ignition and liftoff!`);
    return map;
  };
}
