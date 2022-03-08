import { Injectable } from '@angular/core';
import { iif, Observable, ReplaySubject, interval } from 'rxjs';
import { CountdownClockService } from '../countdown-clock/countdown-clock.service';
import { Duration } from 'luxon';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AudienceService {
  private readonly reaction = new ReplaySubject<string>(1);
  private readonly milestones = new Map<number, string>();

  constructor(private readonly ccs: CountdownClockService) {
    this.ccs.millisRemaining$.subscribe(this.evaluateTime);
    this.milestones = this.createMilestoneMap();
    this.varyReaction();
  }

  get reaction$(): Observable<string> {
    return this.reaction.pipe(distinctUntilChanged());
  }

  evaluateTime = (millisRemaining: number): void => {
    for (const [key, value] of this.milestones) {
      if (millisRemaining <= key) {
        this.reaction.next(value);
      }
    }
  };

  private varyReaction(): void {
    this.ccs.isCounting$
      .pipe(
        switchMap((isCounting: boolean) => {
          let defaultValue = `Hey! The countdown started!`;
          if (!isCounting) {
            defaultValue = 'Awwww maaaan! They Scrubbed it!';
          }

          this.reaction.next(defaultValue);
          return iif(() => isCounting, interval(5000));
        })
      )
      .subscribe(() => {
        const index = Math.floor(Math.random() * this.possibleReactions.length);
        const reaction = this.possibleReactions[index];
        this.reaction.next(reaction);
      });
  }

  private createMilestoneMap = (): Map<number, string> => {
    const reactA = Duration.fromObject({
      hours: 42,
      minutes: 59,
      seconds: 59,
    }).toMillis();
    const react10 = 10000;
    const react9 = 9000;
    const react8 = 8000;
    const react7 = 7000;
    const react6 = 6000;
    const react5 = 5000;
    const react4 = 4000;
    const react3 = 3000;
    const react2 = 2000;
    const react1 = 1000;
    const react0 = 0;
    ////
    const map = new Map<number, string>();
    ///
    map.set(react10, `10!`);
    map.set(react9, `9!`);
    map.set(react8, `8!`);
    map.set(react7, `7!`);
    map.set(react6, `6!`);
    map.set(react5, `5!`);
    map.set(react4, `4!`);
    map.set(react3, `3!`);
    map.set(react2, `2!`);
    map.set(react1, `1!`);
    map.set(react0, `LIFTOFF!!! WOO-HOO!!!! GO GO GO!!!`);
    return map;
  };

  possibleReactions: string[] = [
    `*yaaaawn*`,
    `When's it gonna launch, mommy?`,
    `It's taller than I thought!`,
    `I was going to be an astronaught once...but then I took an arrow to the knee.`,
    `*cough*`,
    `This is gonna be awesome!`,
    `I've always wanted to see a launch in person.`,
    `I hope the weather holds.`,
    `Are you excited? I'm excited!`,
    `I met an astronaught once. Well...I met a guy who met an astronaught once.`,
    `*sneeze*`,
    `Quite a crowd!`,
    `Dang, I think I left my ear muffs in the car.`,
    `Probably should've had something to eat before waiting all this time.`,
    `I. CAN'T. WAIT.`,
    `I remember where I was when we heard that the...actually...nevermind.`,
    `This is gonna be so cool!`,
    `Far out, maaaan. Faaaar ooout.`,
    `Have you ever been to a launch? It's gonna blow your mind.`,
    `Take my picture like I'm holding up the rocket, dad!`,
    `Let's hope they don't scrub it. We drove a long way to see this.`,
  ];
}
