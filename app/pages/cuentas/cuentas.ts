import {Component} from '@angular/core';
import {Modal,NavController,Toast, Alert} from 'ionic-angular';
import {DAOCuentas} from '../../dao/dao-cuentas';
import {ModalCuentasPage} from '../modal-cuentas/modal-cuentas';
//import {Toast} from "ionic-native";

@Component({
  templateUrl: 'build/pages/cuentas/cuentas.html',
   providers: [DAOCuentas]
})

export class CuentasPage {
	//dao: any =  DAOCuentas;
	listCuentas = []
  constructor(private dao: DAOCuentas,
  			  private nav: NavController) {
  		//this.listCuentas = this.dao.getList();
  		//

  		this.dao.getList((lista) => {
  			this.listCuentas = lista;
  		})
  	}	

  	insert(){
  		let modal = Modal.create(ModalCuentasPage);

  		modal.onDismiss((data) => {

  		if (data){
  				this.dao.insert(data, (cuenta) =>{

  				this.listCuentas.push(cuenta);

  				let toast  = Toast.create({
   						message: 'Cuenta ingresada con exito',
    					duration: 1000,
    					position: 'top'
  					});

  				this.nav.present(toast);	
  			});

  		}


  		})

  		this.nav.present(modal);
  	}

  	edit(cuenta){
  		let modal = Modal.create(ModalCuentasPage, {parametro: cuenta});

  		modal.onDismiss((data) => {
  			if (data){
  			this.dao.edit(data, (cuenta) => {
  				let toast  = Toast.create({
   						message: 'Cuenta editada con exito',
    					duration: 1000,
    					position: 'top'
  					});

  				this.nav.present(toast);
  			});
  			}
  		});

  		this.nav.present(modal);
  	}

  	delete(cuenta){
  		let confirm = Alert.create({
  			title: "Eliminar",
  			subTitle: 'Esta seguro de eliminar la cuenta?',
  			buttons: [
  				{
  					text: "si",
  					handler: () => {
  						  	this.dao.delete(cuenta, (data) => {
  								let pos = this.listCuentas.indexOf(data);
  								this.listCuentas.splice(pos, 1);
  			  					let toast  = Toast.create({
   								message: 'Cuenta borrada con exito',
    							duration: 1000,
    							position: 'top'
  					});

  				this.nav.present(toast);	
  		});

  					}
  				},
  				{
  					text: "no"
  				}
  			]
  		});
  		this.nav.present(confirm);
  	}
  }
