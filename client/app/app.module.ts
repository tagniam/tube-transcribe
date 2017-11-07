import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PlayerService } from './services/player.service';
import { UserService } from './services/user.service';
import { TrackMouseDirective } from './directives/track-mouse.directive';
import { TimelineComponent } from './components/control-bar/timeline/timeline.component';
import { SelectionBoxComponent } from './components/control-bar/timeline/selection-box/selection-box.component';
import { TimeDisplayComponent } from './components/control-bar/time-display/time-display.component';
import { MediaControlsComponent } from './components/control-bar/media-controls/media-controls.component';
import { ControlBarComponent } from './components/control-bar/control-bar.component';
import { PlaybackRateControlComponent } from './components/control-bar/playback-rate-control/playback-rate-control.component';
import { VolumeControlComponent } from './components/control-bar/volume-control/volume-control.component';
import { ZoomControlComponent } from './components/control-bar/zoom-control/zoom-control.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


@NgModule({
  declarations: [
    AppComponent,
    TrackMouseDirective,
    TimelineComponent,
    SelectionBoxComponent,
    TimeDisplayComponent,
    MediaControlsComponent,
    ControlBarComponent,
    PlaybackRateControlComponent,
    VolumeControlComponent,
    ZoomControlComponent
  ],
  exports: [
    AppComponent,
    TrackMouseDirective,
    TimelineComponent,
    SelectionBoxComponent,
    TimeDisplayComponent,
    MediaControlsComponent,
    ControlBarComponent,
    PlaybackRateControlComponent,
    VolumeControlComponent,
    ZoomControlComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PerfectScrollbarModule.forRoot()
  ],
  providers: [PlayerService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export const appRoutes: Routes = [
  { path: 'watch', component: AppComponent }
];