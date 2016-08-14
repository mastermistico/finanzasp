import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {IntroduccionPage} from '../introduccion/introduccion';
import {SaldoPage} from '../saldo/saldo';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  name;
  introduccion;
  saldo;
  constructor(private navCtrl: NavController) {
  	this.name = "dev";
  	this.introduccion = IntroduccionPage;
  	this.saldo = SaldoPage;
  }

  


}
