import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
  standalone: false
})
export class FabButtonComponent implements OnInit {

  @Output() emitBtnFunc = new EventEmitter()

  constructor() { }

  ngOnInit() { }

  onClick(e: any) {
    this.emitBtnFunc.emit(e)
  }
}
