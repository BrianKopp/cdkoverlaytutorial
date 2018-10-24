import { OverlayRef } from '@angular/cdk/overlay';
import { OverlayComponent } from './overlay/overlay.component';

export class AppOverlayRef {
  componentInstance: OverlayComponent;

  constructor(private overlayRef: OverlayRef) {}

  close(): void {
    this.overlayRef.dispose();
  }
}
