import { Component } from '@angular/core';
import { NavController,Modal,Alert, Events } from 'ionic-angular';
import {ModalIntroduccionPage} from '../modal-introduccion/modal-introduccion';
import {DAOIntroduccion} from '../../dao/dao-introduccion';
import {DataUtil} from '../../util/data-util';
import {DataFilter} from '../../components/data-filter';
import {InformePage} from '../informe/informe';


/*
  Generated class for the IntroduccionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/introduccion/introduccion.html',
  providers: [DAOIntroduccion],
  directives: [DataFilter]
})
export class IntroduccionPage {
  listIntroduccion;
  dataFiltro;
  constructor(private nav: NavController,
  			  private dao: DAOIntroduccion,
  			  private events: Events) {

  		this.listIntroduccion = []; 
  		this.dataFiltro = new Date();	  
  		this.getListaIntroduccion(this.dataFiltro);

  }

  getListaIntroduccion(filtro){
  		let dataUtil = new DataUtil();
  		this.listIntroduccion = [];
  		//this.dataFiltro = new Date();
  		console.log(filtro)
  		let dataInicio = dataUtil.getFirstDay(filtro);
  		let dataFin = dataUtil.getLastDay(filtro);

  		this.dao.getList(dataInicio, dataFin, (lista) => {
  			console.log(lista)
  			this.listIntroduccion = lista;
  		})	
  }

  updateMonth(data){
  	//alert("cambio mes" + data)
  	this.dataFiltro = data;
  	this.getListaIntroduccion(data);
  	this.updateSaldo();
  }

  insert(){

  	let modal = Modal.create(ModalIntroduccionPage);

  	modal.onDismiss((data) => {
  		if (data){
  			this.dao.insert(data, (introduccion) =>{
  				//this.listIntroduccion.push(introduccion)
  				this.updateMonth(new Date(data.fecha));
  			})
  		}
  	})

  	this.nav.present(modal)
  }

  delete(introduccion){

  		let confirm = Alert.create({

  			title: "Eliminar",
  			subTitle: "Esta seguro de quere eliminar " + introduccion.descripcion,
  			buttons: [
  				{
  					text: "Si",
  					handler: () => {
  				 		this.dao.delete(introduccion, (introduccion) => {
  				 		this.updateMonth(new Date(introduccion.fecha));
  				 	});
  					 
  				}
  			},
  			{
  				text: "No"
  			}]
  		});

  		this.nav.present(confirm)
  }

  edit(introduccion){

  		let modal = Modal.create(ModalIntroduccionPage, {parametro: introduccion});

  		modal.onDismiss((data) => {
  			if (data) {
  				this.dao.edit(introduccion, (introduccion) => {
  					this.updateMonth(new Date(introduccion.fecha));
  				})
  			}
  		})

  		this.nav.present(modal)
  }

  getDate(introduccion){
  		let dataUtil = new DataUtil();

  		return dataUtil.parseString(introduccion.fecha) 
  }

  situacionIntroduccion(introduccion){

  		return introduccion.pago ? "Pagado" : "No pagado"
  }

  introduccionEntrada(introduccion){

  		return introduccion.inout == "ingreso";
  }

  updateSaldo(){

  	this.dao.getSaldo((saldo) =>{
  		this.events.publish("saldo:update", saldo)
  	})
  }

  paymentButtonText(introduccion){
  		return introduccion.pago ? "Reabrir" : "Pagado";
  }

  changePaymentStatus(introduccion){
  		introduccion.pago = introduccion.pago ? 0 : 1;

  		this.dao.edit(introduccion, (introduccion) => {
  			this.updateMonth(new Date(introduccion.fecha));
  		})
  }

  onClickMonth(){
  		this.nav.push(InformePage, {parametro: this.dataFiltro});
  }

}
