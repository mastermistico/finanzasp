import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import {DAOIntroduccion} from '../../dao/dao-introduccion';

/*
  Generated class for the SaldoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/saldo/saldo.html',
  providers: [DAOIntroduccion]
})
export class SaldoPage {
  saldo;
  constructor(private nav: NavController,
  			  private dao: DAOIntroduccion,
  			  private events: Events) {

  			  this.dao = new DAOIntroduccion();
  			  this.dao.getSaldo((saldo) =>{
  			  	this.saldo = saldo;
  			  });

  			  events.subscribe("saldo:update", (saldo) => {
  			  		this.saldo = parseFloat(saldo)
  			  });
  }

}
