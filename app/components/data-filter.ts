import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IONIC_DIRECTIVES} from 'ionic-angular/config/directives';
import {DataUtil} from '../util/data-util';

@Component({
	selector: "data-filter",
	directives: [IONIC_DIRECTIVES],
	inputs: ['startDate'],
	//outputs: ['changeMonth', clickMonth],
	template: `	<ion-row>
		<ion-col width-10>
			<button favorite clear round (click) = "previousMonth()">
				<ion-icon name="arrow-dropleft-circle"></ion-icon>
			</button>
		</ion-col>
		<ion-col width-75>
			<h4 class="text-destaque" favorite (click)="executeClickMonth()"> {{mesSeleccionado}}</h4>
		</ion-col>
		<ion-col width-10="">
			<button favorite clear round (click) = "nextMonth()">
				<ion-icon name="arrow-dropright-circle"></ion-icon>
			</button>
		</ion-col>
	</ion-row> `
})

export class DataFilter {
	mesSeleccionado; 
	@Input() startDate;
	@Output() changeMonth;
	@Output() clickMonth;
	constructor(){
		this.changeMonth = new EventEmitter();
		this.clickMonth = new EventEmitter();
	}

	_executeChangeMonth(){
		this.changeMonth.next(this.startDate);
	}

	executeClickMonth(){

		this.clickMonth.next();
	}

	_updataMonth(){
		let dataUtil = new DataUtil();
		let ano = this.startDate.getFullYear();
		this.mesSeleccionado = dataUtil.getMonthName(this.startDate) + " - " + ano;
		this._executeChangeMonth();
	}

	ngOnInit(){

		this._updataMonth();
	}

	ngOnChanges(changes){
		this._updataMonth();
	}

	previousMonth(){

		this.startDate.setMonth(this.startDate.getMonth() - 1);
		this._updataMonth();
	}

	nextMonth(){
		this.startDate.setMonth(this.startDate.getMonth() + 1);
		this._updataMonth();
	}
}