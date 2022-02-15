import { Component, OnInit } from '@angular/core';
import { AudienceService } from './audience.service';

@Component({
  selector: 'app-audience',
  templateUrl: './audience.component.html',
  styleUrls: ['./audience.component.css'],
})
export class AudienceComponent implements OnInit {
  audienceMap: string[] = [];
  constructor(private readonly as: AudienceService) {
    this.as.audience$.subscribe((str) => {
      this.audienceMap.push(str);
    });
  }

  ngOnInit(): void {}
}
