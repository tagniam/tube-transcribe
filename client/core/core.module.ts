import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreComponent } from './core.component';
import { AppModule, appRoutes } from '../app/app.module';


@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    BrowserModule,
    AppModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [CoreComponent]
})
export class CoreModule { }
