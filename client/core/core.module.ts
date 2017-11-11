import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreComponent } from './core.component';
import { HomeComponent } from '../home/home.component';
import { AppModule, appRoutes } from '../app/app.module';

const coreRoutes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    CoreComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppModule,
    RouterModule.forRoot(appRoutes.concat(coreRoutes))
  ],
  providers: [],
  bootstrap: [CoreComponent]
})
export class CoreModule { }
