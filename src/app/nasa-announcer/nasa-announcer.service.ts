import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CountdownClockService } from '../countdown-clock/countdown-clock.service';

@Injectable({
  providedIn: 'root',
})
export class NasaAnnouncerService {
  time: Observable<string>;
  constructor(private readonly ccs: CountdownClockService) {
    this.time = this.ccs.readableTime$;
  }

  eventList: string[] = [
    'this is the announcer speaking...testing...testing...one, two, three',
    'Well...This kinda works',
    'I guess...',
    'But this is not a good way of doing things.',
    'did you hear the developer heavily sigh?',
    'This is the last message... I am about to disapear for some unknown reason.',
    'ready?',
    'aaaaaaand',
  ];

  announcement = new BehaviorSubject<string>(this.eventList[0]);

  // private readonly messages = new BehaviorSubject<string[]>(this.message);

  get announcement$(): Observable<string> {
    return this.announcement.asObservable();
  }

  ///if time is this push a message to an array.
  timeWatcher(): void {
    this.time.subscribe((val) => {
      if (val === '47:59:58') {
        this.announcement.next(this.eventList[1]);
      } else if (val === '47:59:55') {
        this.announcement.next(this.eventList[2]);
      } else if (val === '47:59:52') {
        this.announcement.next(this.eventList[3]);
      } else if (val === '47:59:48') {
        this.announcement.next(this.eventList[4]);
      } else if (val === '47:59:43') {
        this.announcement.next(this.eventList[5]);
      } else if (val === '47:59:40') {
        this.announcement.next(this.eventList[6]);
      } else if (val === '47:59:37') {
        this.announcement.next(this.eventList[7]);
      } else if (val === '47:59:35') {
        this.announcement.next(this.eventList[8]);
      }
    });
  }
}
