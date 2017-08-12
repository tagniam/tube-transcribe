import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PlayerService } from './services/player.service';
import { TrackMouseDirective } from './directives/track-mouse.directive';
import { TimelineComponent } from './components/timeline/timeline.component';
import { SelectionBoxComponent } from './components/selection-box/selection-box.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackMouseDirective,
    TimelineComponent,
    SelectionBoxComponent
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
