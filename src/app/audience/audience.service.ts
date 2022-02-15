import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudienceService {
  constructor() {}

  message: string = 'Hi, this is the audience';

  private readonly messages = new BehaviorSubject<string>(this.message);

  get audience$(): Observable<string> {
    return this.messages.asObservable();
  }
}
