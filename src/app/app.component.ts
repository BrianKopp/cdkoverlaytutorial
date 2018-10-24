import { Component } from '@angular/core';
import { OverlayService } from './overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private overlayService: OverlayService) {}

  buttonClicked() {
    console.log('button was clicked');
    this.overlayService.open();
  }
}
