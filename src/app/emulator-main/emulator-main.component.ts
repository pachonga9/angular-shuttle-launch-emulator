import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewportSize } from '../viewport/viewport-size';
import { ViewportService } from '../viewport/viewport.service';

@Component({
  selector: 'app-emulator-main',
  templateUrl: './emulator-main.component.html',
  styleUrls: ['./emulator-main.component.scss'],
})
export class EmulatorMainComponent implements OnInit {
  viewport$: Observable<ViewportSize>;
  ViewportSize = ViewportSize;

  constructor(private readonly vps: ViewportService) {
    this.viewport$ = vps.viewport$;
  }

  ngOnInit(): void {}
}
