import { Component, OnInit } from '@angular/core';
import { NasaAnnouncerService } from './nasa-announcer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nasa-announcer',
  templateUrl: './nasa-announcer.component.html',
  styleUrls: ['./nasa-announcer.component.css'],
})
export class NasaAnnouncerComponent implements OnInit {
  public readonly announcementMap$: Observable<string>;

  constructor(private readonly nas: NasaAnnouncerService) {
    this.announcementMap$ = this.nas.announcement$;
  }

  ngOnInit(): void {}
}
