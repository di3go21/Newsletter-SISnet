import fs = require("fs");
import _path = require('path');

function generarNodos(data: any){

	for (const campo in data) {console.log(campo);

		if (campo != "version") {
			for (let index = 0; index < data[campo].length; index++) {
				data[campo][index] = "<li style='margin-bottom: 10px; margin-left:40px;'>" + data[campo][index] + "</li>";
			}
		}
	}

    return data;

}

function generarHTML(data: any, htmlAsString: any){

	for (const campo in data) {
		if (data[campo].length > 0) {
			htmlAsString = htmlAsString.replace("{{" + campo + "}}", data[campo].join(''));
		}
		else {
			htmlAsString = htmlAsString.replace("{{" + campo + "}}", '');
		}
	}

	return htmlAsString;

}

export {generarNodos, generarHTML};