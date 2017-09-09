import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PlayerService } from './services/player.service';
import { TrackMouseDirective } from './directives/track-mouse.directive';
import { TimelineComponent } from './components/control-bar/timeline/timeline.component';
import { SelectionBoxComponent } from './components/control-bar/timeline/selection-box/selection-box.component';
import { TimeDisplayComponent } from './components/control-bar/time-display/time-display.component';
import { MediaControlsComponent } from './components/control-bar/media-controls/media-controls.component';
import { ControlBarComponent } from './components/control-bar/control-bar.component';
import { SpeedControlComponent } from './components/control-bar/speed-control/speed-control.component';
import { VolumeControlComponent } from './components/control-bar/volume-control/volume-control.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackMouseDirective,
    TimelineComponent,
    SelectionBoxComponent,
    TimeDisplayComponent,
    MediaControlsComponent,
    ControlBarComponent,
    SpeedControlComponent,
    VolumeControlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
