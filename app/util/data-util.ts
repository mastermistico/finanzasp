export class DataUtil {
	public parseData(data):Date {
		console.log("holautil")
		var parts = data.split("-");
		return new Date(parts[0],parts[1]-1,parts[2]);
	}

	public parseString(data):String {
		return new Date(data).toLocaleDateString();
	}

	public formatDate(dataMiliseconds):String {
		let data = new Date(dataMiliseconds);
		let inicio = "00"

		let ano  = data.getFullYear();
		let mes = (inicio + (data.getMonth() + 1)).slice(-inicio.length);
		let dia = (inicio + data.getDate()).slice(-inicio.length);

		return ano + "-" + mes + "-" + dia;
	}

	public getMonthName(data):String {

		let meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
		"Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

		return meses[data.getMonth()];

	}	

	getFirstDay(data){
		let ano = data.getFullYear();
		let mes = data.getMonth();

		return new Date(ano, mes, 1);
	}

	getLastDay(data){
		let newData = new Date(data);
		let ano = data.getFullYear();
		let mes = data.getMonth() + 1;

		return new Date(ano, mes, 0);

	}
}