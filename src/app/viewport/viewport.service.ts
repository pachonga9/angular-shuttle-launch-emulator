import {Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {BehaviorSubject, Observable} from "rxjs";
import {ViewportSize} from "./viewport-size";

@Injectable()
export class ViewportService {
  private readonly viewportMap: Map<string, ViewportSize>;
  private readonly sizeSubject = new BehaviorSubject<ViewportSize>(ViewportSize.XS);

  constructor(breakpointObserver: BreakpointObserver) {
    this.viewportMap = ViewportService.initializeMap();
    const breakpoints: string[] = Array.from(this.viewportMap.keys());
    breakpointObserver.observe(breakpoints).subscribe(this.onBreakpointChange);
  }

  get viewport$(): Observable<ViewportSize> {
    return this.sizeSubject.asObservable();
  }

  private static initializeMap(): Map<string, ViewportSize> {
    const map = new Map<string, ViewportSize>();
    map.set(Breakpoints.XSmall, ViewportSize.XS);
    map.set(Breakpoints.Small, ViewportSize.SM);
    map.set(Breakpoints.Medium, ViewportSize.MD);
    map.set(Breakpoints.Large, ViewportSize.LG);
    map.set(Breakpoints.XLarge, ViewportSize.XL);

    return map;
  }

  private onBreakpointChange = (result: BreakpointState): void => {
    if (!result.matches) {
      return;
    }

    const breakpoints = result.breakpoints;
    const viewport = this.getViewport(breakpoints);
    this.sizeSubject.next(viewport);
  };

  private getViewport(breakpoints: { [p: string]: boolean }): ViewportSize {
    const keys = Object.keys(breakpoints);
    const breakpointKey: string = keys.find(key => breakpoints[key]) ?? Breakpoints.XSmall;
    return this.viewportMap.get(breakpointKey) ?? ViewportSize.XS;
  }
}
