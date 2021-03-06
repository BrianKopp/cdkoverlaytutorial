import { OverlayService } from './overlay.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { OverlayComponent } from './overlay/overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    OverlayModule
  ],
  providers: [OverlayService],
  bootstrap: [AppComponent],
  entryComponents: [
    OverlayComponent
  ]
})
export class AppModule { }
