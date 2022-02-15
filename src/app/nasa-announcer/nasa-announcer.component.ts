import { Component, OnInit } from '@angular/core';
import { NasaAnnouncerService } from './nasa-announcer.service';

@Component({
  selector: 'app-nasa-announcer',
  templateUrl: './nasa-announcer.component.html',
  styleUrls: ['./nasa-announcer.component.css'],
})
export class NasaAnnouncerComponent implements OnInit {
  announcerMap: string[] = [];
  constructor(private readonly nas: NasaAnnouncerService) {
    this.nas.nasaAnnouncer$.subscribe((str) => {
      this.announcerMap.push(str);
    });
  }

  ngOnInit(): void {}
}
