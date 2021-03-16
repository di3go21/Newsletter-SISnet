"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarHTML = exports.generarNodos = void 0;
function generarNodos(data) {
    for (const campo in data) {
        console.log(campo);
        if (campo != "version") {
            for (let index = 0; index < data[campo].length; index++) {
                data[campo][index] = "<li style='margin-bottom: 10px; margin-left:40px;'>" + data[campo][index] + "</li>";
            }
        }
    }
    return data;
}
exports.generarNodos = generarNodos;
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
//# sourceMappingURL=generateHTMLFunc.js.map