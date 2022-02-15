import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NasaAnnouncerService {
  constructor() {}
  message: string =
    'this is the announcer speaking...testing...testing...one, two, three';
  private readonly messages = new BehaviorSubject<string>(this.message);

  get nasaAnnouncer$(): Observable<string> {
    return this.messages.asObservable();
  }
}
