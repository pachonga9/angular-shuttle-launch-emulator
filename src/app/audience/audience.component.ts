import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AudienceService } from './audience.service';

@Component({
  selector: 'app-audience',
  templateUrl: './audience.component.html',
  styleUrls: ['./audience.component.css'],
})
export class AudienceComponent implements OnInit {
  public readonly audienceState$: Observable<string>;
  constructor(private readonly as: AudienceService) {
    this.audienceState$ = this.as.reaction$.pipe(
      startWith('Click begin countdown to see audience reaction!')
    );
  }

  ngOnInit(): void {}
}
