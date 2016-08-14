import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

/*
  Generated class for the ModalCuentasPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/modal-cuentas/modal-cuentas.html',
})
export class ModalCuentasPage {
  //cuenta: any = {descripcion: ""};
  cuenta;	
  constructor(private nav: NavController,
  			  private viewCtrl: ViewController,
  			  private params: NavParams	) {

  		this.cuenta = params.get("parametro") || {descripcion: ""};		  
  }

  cancel(){
  	this.viewCtrl.dismiss();
  }

  guardar(){

  	this.viewCtrl.dismiss(this.cuenta)
  }


}
