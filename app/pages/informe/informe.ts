import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DataUtil} from '../../util/data-util';
import {DAOIntroduccion} from '../../dao/dao-introduccion';

/*
  Generated class for the InformePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/informe/informe.html',
  providers: [DAOIntroduccion]
})
export class InformePage {
  dataFiltro;
  listCuentas;
  inout = "ingreso";  	
  constructor(private nav: NavController,
  		      private dao: DAOIntroduccion,
  		      private params: NavParams) {

  		  //this.inout = "Entrada";
  		  this.dataFiltro = params.get("parametro")     
  		  this._getList(this.inout)
  }

  _getList(inout){

    	  let dataUtil = new DataUtil();

  		  let dataInicio = dataUtil.getFirstDay(this.dataFiltro);
  		  let dataFin = dataUtil.getLastDay(this.dataFiltro);

  		  //    
  		 this.dao.getListGroupByCuenta(dataInicio,dataFin,inout,(listCuentas) =>{
  		 		this.listCuentas = listCuentas
  		 		console.log(this.listCuentas)
  		 		this._calcPercentual();
  		 });

  }

  _calcTotal(){

  	let total = 0;

  	for(var i = 0; i < this.listCuentas.length; i++){
  		total += this.listCuentas[i].saldo;
  	}

  	return total; 
  }

  _calcPercentual(){
  	let total = this._calcTotal();

  	for(var i = 0; i < this.listCuentas.length; i++){
  		this.listCuentas[i].porcentual = (this.listCuentas[i].saldo / total) * 100;
  	}
  }

  onSelect(inout){
  	this._getList(inout);
  }

}
