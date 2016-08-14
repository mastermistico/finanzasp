import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import {DAOCuentas} from '../../dao/dao-cuentas';
import {DataUtil} from '../../util/data-util';

/*
  Generated class for the ModalIntroduccionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/modal-introduccion/modal-introduccion.html',
  providers: [DAOCuentas]
})
export class ModalIntroduccionPage {
  introduccion;
  listCuentas = [];	
  descripcion;
  valor;
  fecha;
  cuenta;
  inout;
  pago;
  constructor(private nav: NavController,
  			  private view: ViewController,
  			  private params: NavParams,
  			  private dao: DAOCuentas	) {

  			  this.introduccion = params.get("parametro") || { descripcion: "",
										    			  valor: "",
  			  											  fecha: "",
  			  											  cuenta: "",
  			  											  inout: "",
  			  											  pago: 1 };

  			  this.descripcion = this.introduccion.descripcion
  			  this.valor = this.introduccion.valor;
  			  this.fecha = this._getDate(this.introduccion.fecha);
  			  this.cuenta = this.introduccion.cuenta;
  			  this.inout = this.introduccion.inout;
  			  this.pago = this.introduccion.pago;
  			this.dao.getList((lista) => {
  			this.listCuentas = lista;
  			console.log(this.listCuentas)
  		})

  }

  _getDate(data){

  	let dataUtil = new DataUtil();
  	return dataUtil.formatDate(data) 
  }

  cancel(){

  	this.view.dismiss();
  }

  guardar(){

  	let dataUtil = new DataUtil();
  	let data = dataUtil.parseData(this.fecha);

  	this.introduccion.descripcion = this.descripcion;
  	this.introduccion.valor = parseFloat(this.valor);
  	this.introduccion.fecha = data.getTime(); 
  	this.introduccion.cuenta = this.cuenta; 
  	this.introduccion.inout = this.inout;
  	this.introduccion.pago = this.pago ? 1 : 0;

  	this.view.dismiss(this.introduccion)
  }

}
