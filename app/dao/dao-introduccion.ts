import {Storage, SqlStorage} from 'ionic-angular';

export class DAOIntroduccion{
	list: any = [] 
	constructor(){
	let storage = new Storage(SqlStorage);

	storage.query("CREATE TABLE IF NOT EXISTS introduccion(id INTEGER PRIMARY KEY AUTOINCREMENT, descripcion TEXT, valor REAL, fecha INTEGER, cuenta TEXT, inout TEXT, pago INTEGER)").then((data) => {
			console.log("tabla creada");
		}, (error) => {
			console.log("Error en creacion de tabla" + JSON.stringify(error.err));
			
		});

	}

	insert(introduccion, successCallback){

		//this.list.push(cuenta)
		let storage = new Storage(SqlStorage);

		storage.query("INSERT INTO introduccion(descripcion,valor,fecha,cuenta,inout,pago) VALUES(?,?,?,?,?,?)", [introduccion.descripcion,introduccion.valor,introduccion.fecha,introduccion.cuenta,introduccion.inout,introduccion.pago])
		.then((data) =>{
			
			successCallback(introduccion);
			console.log("Grabar")
		},(error) =>{
			console.log("Error creacion de tabla" + JSON.stringify(error.err));
		})
	}

		getList(dataInicio,dataFin,successCallback){
		
		let storage = new Storage(SqlStorage);

		storage.query("SELECT * FROM introduccion WHERE fecha >= ? and fecha <= ? ",
		[dataInicio.getTime(), dataFin.getTime()])
		.then((data) => {

			let lista = []

			for (var i=0; i < data.res.rows.length; i++){

				let introduccionDB = data.res.rows.item(i);

				let introduccion = {id: introduccionDB.id, 
									descripcion: introduccionDB.descripcion,
									valor: introduccionDB.valor,
									fecha: introduccionDB.fecha,
									cuenta: introduccionDB.cuenta,
									inout: introduccionDB.inout,
									pago:  introduccionDB.pago };

			

				lista.push(introduccion);

				successCallback(lista);
			}

		}, (error) =>	{
			console.log("Error en insertar en tabla" + JSON.stringify(error.err));
		})

	}


	delete(introduccion, successCallback){

		let storage = new Storage(SqlStorage);

		storage.query("DELETE FROM introduccion WHERE id = ?", [introduccion.id])
		.then((data)=>{
			successCallback(introduccion)	
		})

	}

	edit(introduccion, successCallback){

		let storage = new Storage(SqlStorage);

		storage.query("UPDATE introduccion SET  descripcion = ?, valor = ?, fecha = ?," +
		"cuenta = ?, inout = ?, pago = ? WHERE id = ? ", [introduccion.descripcion,introduccion.valor,introduccion.fecha,introduccion.cuenta,introduccion.inout,introduccion.pago,introduccion.id])
		.then((data)=>{
			successCallback(introduccion)	
		})

	}

	getSaldo(successCallback){
		let storage = new Storage(SqlStorage);

		storage.query("SELECT TOTAL(valor) as saldo, inout from introduccion" +
			" WHERE pago = 1 AND inout = 'ingreso'" +
			" UNION" + 
			" SELECT TOTAL(valor), inout as saldo from introduccion" +
			" WHERE pago = 1 and inout = 'egreso'"
			, []).then((data) => {
				let saldo = 0;	
				for (var i = 0; i < data.res.rows.length; i++){
					let item = data.res.rows.item(i)
					if(item.inout == "egreso")
						saldo += item.saldo;
					else
						saldo -= item.saldo;
				}

				

				successCallback(saldo);
			});
	}

	getListGroupByCuenta(dataInicio, dataFin, inout, successCallback){
		console.log(dataInicio.getTime(),dataFin.getTime(), inout)
		let storage = new Storage(SqlStorage)

		storage.query("SELECT cuenta, TOTAL(valor) as saldoCuenta from introduccion" +
			" WHERE fecha >= ? AND fecha <= ? and inout = ? " +
			" and pago = 1 GROUP BY cuenta ", [dataInicio.getTime(),  dataFin.getTime(), inout])
			 .then((data) =>{
			 	let lista = [];
			 	console.log(data)
			 	for (var i = 0; i < data.res.rows.length; i++){
			 		let item = data.res.rows[i];
			 		
			 		let cuenta = {cuenta: data.res.rows.item(i).cuenta, 
			 					  saldo: data.res.rows.item(i).saldoCuenta, 
			 					  porcentual: 0 };
			 		lista.push(cuenta);			  
			
				}

		successCallback(lista);
	});
  }	
}