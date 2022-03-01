import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmulatorMainComponent } from './emulator-main/emulator-main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CountdownClockComponent } from './countdown-clock/countdown-clock.component';
import { NasaAnnouncerComponent } from './nasa-announcer/nasa-announcer.component';
import { AudienceComponent } from './audience/audience.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    EmulatorMainComponent,
    CountdownClockComponent,
    NasaAnnouncerComponent,
    AudienceComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
