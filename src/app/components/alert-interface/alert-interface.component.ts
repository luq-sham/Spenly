import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alert-interface',
  templateUrl: './alert-interface.component.html',
  styleUrls: ['./alert-interface.component.scss'],
  standalone: false
})
export class AlertInterfaceComponent implements OnInit {

  msg: any
  header: any
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  dismiss() {
    this.modalCtrl.dismiss()
  }
}
