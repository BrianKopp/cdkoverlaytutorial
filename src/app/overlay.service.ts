import { GlobalPositionStrategy, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { OverlayComponent } from './overlay/overlay.component';


@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(private overlay: Overlay) { }

  open() {
    console.log('overlay service trying to do open()');
    const posStrat = new GlobalPositionStrategy();
    posStrat.centerHorizontally();
    posStrat.centerVertically();

    const config = new OverlayConfig();
    config.hasBackdrop = true;
    config.positionStrategy = posStrat;
    config.disposeOnNavigation = true;

    const overlayReference = this.overlay.create(config);
    overlayReference.backdropClick().subscribe(() => {
      overlayReference.dispose();
    });

    const filePreviewPortal = new ComponentPortal(OverlayComponent);
    overlayReference.attach(filePreviewPortal);
    setTimeout(() => overlayReference.dispose(), 5000);
  }
}
