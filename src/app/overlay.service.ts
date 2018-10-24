import {
  GlobalPositionStrategy,
  Overlay,
  OverlayConfig
} from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, ComponentRef, Injector } from '@angular/core';
import { OverlayComponent } from './overlay/overlay.component';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { PositionStrategy } from '@angular/cdk/overlay';
import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { OverlayRef } from '@angular/cdk/overlay';
import { AppOverlayRef } from './overlay.ref';

interface AppOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  height?: number;
  width?: number;
  minHeight?: number;
  maxHeight?: number;
  positionStrategy?: PositionStrategy;
}

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open(position: CdkOverlayOrigin) {
    const overlayConfig: AppOverlayConfig = {
      hasBackdrop: false,
      backdropClass: 'dark-backdrop',
      panelClass: 'apps-panel',
      height: 100,
      width: 440,
      minHeight: 100,
      maxHeight: 500
    };
    console.log('overlay service trying to do open()');
    const positions = [
      new ConnectionPositionPair(
        { originX: 'start', originY: 'top' },
        { overlayX: 'start', overlayY: 'top' }
      )
    ];
    overlayConfig.positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(position.elementRef)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);

    const overlayRef = this.createOverlay(overlayConfig);
    const appOverlayRef = new AppOverlayRef(overlayRef);
    const overlayComponent = this.attachDialogContainer(
      overlayRef,
      overlayConfig,
      appOverlayRef
    );
    appOverlayRef.componentInstance = overlayComponent;
    overlayRef.backdropClick().subscribe(_ => {
      appOverlayRef.close();
    });
    appOverlayRef.componentInstance.cancel.subscribe(_ => {
      appOverlayRef.close();
    });
    return appOverlayRef;
  }

  private attachDialogContainer(
    overlayRef: OverlayRef,
    config: AppOverlayConfig,
    appOverlayRef: AppOverlayRef
  ) {
    const injector = this.createInjector(config, appOverlayRef);
    const containerPortal = new ComponentPortal(
      OverlayComponent,
      null,
      injector
    );
    const containerRef: ComponentRef<OverlayComponent> = overlayRef.attach(
      containerPortal
    );
    return containerRef.instance;
  }

  private createInjector(
    config: AppOverlayConfig,
    dialogRef: AppOverlayRef
  ): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(AppOverlayRef, dialogRef);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private createOverlay(config: AppOverlayConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: AppOverlayConfig): OverlayConfig {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      width: config.width,
      height: config.height,
      maxHeight: config.maxHeight,
      minHeight: config.minHeight,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: config.positionStrategy
    });

    return overlayConfig;
  }
}
