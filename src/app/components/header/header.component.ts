import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonButtons, IonTitle, IonToolbar, IonHeader, IonMenuButton],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
