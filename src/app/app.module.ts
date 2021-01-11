import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { PlayComponent } from './components/play.component';
import {GameService} from "./game.service";
import {Globals} from "./utils/globals";

const ROUTES: Routes = [
  { path: '', component: MainComponent },
  { path: 'play', component: PlayComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(ROUTES)
  ],
  providers: [ GameService ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    Globals.injector = injector
  }

}
