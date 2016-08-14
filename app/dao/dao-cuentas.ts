import {Storage, SqlStorage} from 'ionic-angular';

export class DAOCuentas{
	list: any = [] 
	constructor(){
	let storage = new Storage(SqlStorage);

	storage.query("CREATE TABLE IF NOT EXISTS cuentas(id INTEGER PRIMARY KEY AUTOINCREMENT, descripcion TEXT)").then((data) => {
			console.log("tabla creada");
		}, (error) => {
			console.log("Error en creacion de tabla" + JSON.stringify(error.err));
			
		});

	}

	getList(successCallback){
		
		let storage = new Storage(SqlStorage);

		storage.query("SELECT * FROM cuentas").then((data) => {

			let lista = [];

			for (var i=0; i < data.res.rows.length; i++){
				let item = {id: "", descripcion: ""};

				item.id = data.res.rows.item(i).id;
				item.descripcion =  data.res.rows.item(i).descripcion;

				lista.push(item);

				successCallback(lista)
			}

		}, (error) =>	{
			console.log("Error en insertar en tabla" + JSON.stringify(error.err));
		})

	}
	insert(cuenta, successCallback){

		//this.list.push(cuenta)
		let storage = new Storage(SqlStorage);

		storage.query("INSERT INTO cuentas(descripcion) VALUES(?)", [cuenta.descripcion])
		.then((data) =>{
			cuenta.id = data.res.insertid;
			successCallback(cuenta);
			console.log("Grabar")
		},(error) =>{
			console.log("Error creacion de tabla" + JSON.stringify(error.err));
		})
	}
	edit(cuenta, successCallback){

		let storage = new Storage(SqlStorage);

		storage.query("UPDATE cuentas SET descripcion = ? where id = ?", [cuenta.descripcion, cuenta.id]).then((data) => {
			successCallback(cuenta);
		}, (error) =>{

			console.log("Error update de tabla" + JSON.stringify(error.err));
		})
	}
	delete(cuenta, successCallback){
		let storage = new Storage(SqlStorage);
		storage.query("DELETE FROM cuentas WHERE id = ?", [cuenta.id]).then((data) => {
			successCallback(cuenta);
		}, (error) =>{

			console.log("Error eliminar de tabla" + JSON.stringify(error.err));
		})
	}
}