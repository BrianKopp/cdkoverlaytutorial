import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OverlayService } from '../overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {
  constructor() {}
  @Output()
  cancel = new EventEmitter();
  ngOnInit() {}

  cancelThis() {
    this.cancel.emit();
  }
}
