"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarHTML = exports.generarNodosFormEdit = exports.generarNodosForm = exports.generarNodos = void 0;
function generarNodos(data) {
    for (const campo in data) {
        if (campo != "version") {
            for (let index = 0; index < data[campo].length; index++) {
                data[campo][index] = (data[campo][index] != "")
                    ? "<li style='margin-bottom: 10px; margin-left:40px;'>" + data[campo][index] + "</li>"
                    : "<li class='no_decor' style='margin-bottom: 10px; margin-left:40px;'>No hay elementos que mostrar</li>";
            }
        }
    }
    return data;
}
exports.generarNodos = generarNodos;
function generarNodosForm(data, htmlAsString) {
    data.forEach((campo) => {
        if (campo == "version" || campo == "version_en_desarrollo") {
            htmlAsString = htmlAsString.replace("{{" + campo + "}}", `
				<li class="no_decor">
				<input type="text" name="${campo}">
				</li>
				`);
        }
        else {
            htmlAsString = htmlAsString.replace("{{" + campo + "}}", `
				<li class='${campo}-class'>
				<input type="text" name="${campo}">
				<input class="sumBoton" type="button" value="+" onclick="sum()">
				<input class="resBoton" type="button" value="-" onclick="res()">
				</li>
				`);
        }
    });
    htmlAsString = killButton(htmlAsString);
    return htmlAsString;
}
exports.generarNodosForm = generarNodosForm;
function generarNodosFormEdit(data, htmlAsString) {
    for (const campo in data) {
        let value = (data[campo] != "") ? `value="${data[campo]}"` : "";
        if (campo == "version" || campo == "version_en_desarrollo") {
            htmlAsString = htmlAsString.replace("{{" + campo + "}}", `
				<li class="no_decor">
				<input type="text" name="${campo}" ${value}>
				</li>
				`);
        }
        else {
            let nodos = "";
            for (let index = 0; index < data[campo].length; index++) {
                let valueNodos = (data[campo][index] != "") ? `value="${data[campo][index]}"` : " ";
                nodos = nodos + `
				<li class='${campo}-class'>
				<input type="text" name="${campo}" ${valueNodos}>
				<input class="sumBoton" type="button" value="+" onclick="sum()">
				<input class="resBoton" type="button" value="-" onclick="res()">
				</li>
				`;
            }
            htmlAsString = htmlAsString.replace("{{" + campo + "}}", nodos);
        }
        htmlAsString = killButton(htmlAsString);
    }
    return htmlAsString;
}
exports.generarNodosFormEdit = generarNodosFormEdit;
function generarHTML(data, htmlAsString) {
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
exports.generarHTML = generarHTML;
function killButton(htmlAsString) {
    htmlAsString = htmlAsString.replace("{{button}}", `<input class="centrar-boton" type="submit" onclick=guardar() value="guardar">`);
    return htmlAsString;
}
//# sourceMappingURL=generateHTMLFunc.js.map