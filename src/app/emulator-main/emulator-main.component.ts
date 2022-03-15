import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewportSize } from '../viewport/viewport-size';
import { ViewportService } from '../viewport/viewport.service';

@Component({
  selector: 'app-emulator-main',
  templateUrl: './emulator-main.component.html',
  styleUrls: ['./emulator-main.component.scss'],
})
export class EmulatorMainComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe = new Subject<void>();
  viewport$: Observable<ViewportSize>;
  ViewportSize = ViewportSize;
  isOpen = true;

  constructor(private readonly vps: ViewportService) {
    this.viewport$ = vps.viewport$;
  }

  ngOnInit(): void {
    this.vps.viewport$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((val: ViewportSize) => {
        if (val >= ViewportSize.MD) {
          this.isOpen = true;
        } else {
          this.isOpen = false;
        }
      });
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
