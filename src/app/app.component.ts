import { Component, ViewChild } from '@angular/core';
import { OverlayService } from './overlay.service';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(CdkOverlayOrigin)
  origin: CdkOverlayOrigin;

  title = 'app';

  constructor(private overlayService: OverlayService) {}

  buttonClicked() {
    console.log('button was clicked');
    this.overlayService.open(this.origin);
  }
}
