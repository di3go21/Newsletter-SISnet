"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const _path = require("path");
const fs = require("fs");
const saveJSON_1 = require("./utils/saveJSON");
const generateHTMLFunc_1 = require("./utils/generateHTMLFunc");
const variables_1 = require("./utils/variables");
function activate(context) {
    let disposable = vscode.commands.registerCommand('newsletter-sisnet-front-end.newsLetterFront-End', (uri) => {
        const panel = vscode.window.createWebviewPanel('Newsletter Sisnet Front-End', 'Newsletter Sisnet Front-End', vscode.ViewColumn.One, {
            retainContextWhenHidden: true,
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(_path.join(context.extensionPath, 'assets'))
            ]
        });
        panel.webview.html = getTemplate(context, panel);
    });
    let disposableForm = vscode.commands.registerCommand('newsletter-sisnet-front-end.newsLetterFront-End-Form', (uri) => {
        const panel = vscode.window.createWebviewPanel('Newsletter Sisnet Front-End-Form', 'Newsletter Sisnet Front-End-Form', vscode.ViewColumn.One, {
            retainContextWhenHidden: true,
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(_path.join(context.extensionPath, 'assets'))
            ]
        });
        panel.webview.html = getTemplateForm(context, panel);
        panel.webview.onDidReceiveMessage(data => {
            saveJSON_1.saveJSON(data, context.extensionPath);
            vscode.window.showInformationMessage('¿Deseas generar un fichero HTML?', variables_1.respuestaPositiva, variables_1.respuestaNegativa)
                .then(respuesta => {
                if (respuesta == variables_1.respuestaPositiva)
                    crearHTML(context, data);
            });
        });
    });
    let disposableEdit = vscode.commands.registerCommand('newsletter-sisnet-front-end.newsLetterFront-End-Edit', (uri) => {
        const panel = vscode.window.createWebviewPanel('Newsletter Sisnet Front-End-Edit', 'Newsletter Sisnet Front-End-Edit', vscode.ViewColumn.One, {
            retainContextWhenHidden: true,
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(_path.join(context.extensionPath, 'assets'))
            ]
        });
        panel.webview.html = getTemplateEdit(context, panel);
        panel.webview.onDidReceiveMessage(data => {
            saveJSON_1.saveJSON(data, context.extensionPath);
            vscode.window.showInformationMessage('¿Deseas generar un fichero HTML?', variables_1.respuestaPositiva, variables_1.respuestaNegativa)
                .then(respuesta => {
                if (respuesta == variables_1.respuestaPositiva)
                    crearHTML(context, data);
            });
        });
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(disposableForm);
    context.subscriptions.push(disposableEdit);
}
exports.activate = activate;
function crearHTML(context, data) {
    const template = vscode.Uri.file(_path.join(context.extensionPath, 'assets', 'media', 'template.html'));
    const templateNew = vscode.Uri.file(_path.join(context.extensionPath, 'assets', 'media', 'newsletter.html'));
    var data = JSON.parse(data.categorias);
    data = generateHTMLFunc_1.generarNodos(data);
    var htmlAsString = fs.readFileSync(template.fsPath).toString();
    htmlAsString = generateHTMLFunc_1.generarHTML(data, htmlAsString);
    htmlAsString = htmlAsString.replace("{{button}}", '');
    var htmlAsStringToArray = htmlAsString.split("<script>");
    htmlAsString = htmlAsStringToArray[0] + htmlAsStringToArray[1].split("</script>")[1];
    fs.writeFile(templateNew.fsPath, htmlAsString, (e) => {
        if (e) {
            console.error(`Error: ${e}`);
        }
        else {
            console.log("ok");
        }
    });
    vscode.window.showInformationMessage("Fichero HTML generado");
}
function getTemplate(context, panel) {
    const template = vscode.Uri.file(_path.join(context.extensionPath, 'assets', 'media', 'template.html'));
    const dataUri = vscode.Uri.file(_path.join(context.extensionPath, 'assets', 'media', 'data.json'));
    //leemos json
    var data = JSON.parse(fs.readFileSync(dataUri.fsPath).toString());
    //wrapeamos arrays con li
    data = generateHTMLFunc_1.generarNodos(data);
    //leemos el fichero
    var htmlAsString = fs.readFileSync(template.fsPath).toString();
    //reemplazamos los marcadores {{}} con su contenidoestiloestiloestilo
    htmlAsString = generateHTMLFunc_1.generarHTML(data, htmlAsString);
    htmlAsString = htmlAsString.replace("{{button}}", '');
    return htmlAsString;
}
function getTemplateForm(context, panel) {
    const template = vscode.Uri.file(_path.join(context.extensionPath, 'assets', 'media', 'template.html'));
    var htmlAsString = fs.readFileSync(template.fsPath).toString();
    htmlAsString = generateHTMLFunc_1.generarNodosForm(variables_1.categorias, htmlAsString);
    return htmlAsString;
}
function getTemplateEdit(context, panel) {
    const template = vscode.Uri.file(_path.join(context.extensionPath, 'assets', 'media', 'template.html'));
    const dataUri = vscode.Uri.file(_path.join(context.extensionPath, 'assets', 'media', 'data.json'));
    var htmlAsString = fs.readFileSync(template.fsPath).toString();
    var data = JSON.parse(fs.readFileSync(dataUri.fsPath).toString());
    htmlAsString = generateHTMLFunc_1.generarNodosFormEdit(data, htmlAsString);
    return htmlAsString;
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map