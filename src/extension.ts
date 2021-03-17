
import * as vscode from 'vscode';
import _path = require('path');
import fs = require('fs');
import { saveJSON } from './utils/saveJSON';
import { generarNodos, generarNodosForm, generarNodosFormEdit, generarHTML} from './utils/generateHTMLFunc';
import {categorias, respuestaPositiva, respuestaNegativa} from './utils/variables';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('newsletter-sisnet-front-end.newsLetterFront-End', (uri: vscode.Uri) => {

		const panel = vscode.window.createWebviewPanel(
			'Newsletter Sisnet Front-End',
			'Newsletter Sisnet Front-End',
			vscode.ViewColumn.One,
			{
				retainContextWhenHidden: true,
				enableScripts: true,
				localResourceRoots: [
					vscode.Uri.file(_path.join(context.extensionPath, 'assets'))
				]
			}
		);

		panel.webview.html = getTemplate(context, panel);

	});

	let disposableForm = vscode.commands.registerCommand('newsletter-sisnet-front-end.newsLetterFront-End-Form', (uri: vscode.Uri) => {
		
		const panel = vscode.window.createWebviewPanel(
			'Newsletter Sisnet Front-End-Form',
			'Newsletter Sisnet Front-End-Form',
			vscode.ViewColumn.One,
			{
				retainContextWhenHidden: true,
				enableScripts: true,
				localResourceRoots: [
					vscode.Uri.file(_path.join(context.extensionPath, 'assets'))
				]
			}
		);

		panel.webview.html = getTemplateForm(context, panel);
		panel.webview.onDidReceiveMessage(data => {
			saveJSON(data,context.extensionPath);
			vscode.window.showInformationMessage('¿Deseas generar un fichero HTML?', respuestaPositiva, respuestaNegativa)
				.then(respuesta => {
					if (respuesta == respuestaPositiva)
						crearHTML(context, data);
				});
		})


	});

	let disposableEdit = vscode.commands.registerCommand('newsletter-sisnet-front-end.newsLetterFront-End-Edit', (uri: vscode.Uri) => {
		
		const panel = vscode.window.createWebviewPanel(
			'Newsletter Sisnet Front-End-Edit',
			'Newsletter Sisnet Front-End-Edit',
			vscode.ViewColumn.One,
			{
				retainContextWhenHidden: true,
				enableScripts: true,
				localResourceRoots: [
					vscode.Uri.file(_path.join(context.extensionPath, 'assets'))
				]
			}
		);

		panel.webview.html = getTemplateEdit(context, panel);
		panel.webview.onDidReceiveMessage(data => {
			saveJSON(data,context.extensionPath);
			vscode.window.showInformationMessage('¿Deseas generar un fichero HTML?', respuestaPositiva, respuestaNegativa)
				.then(respuesta => {
					if (respuesta == respuestaPositiva)
						crearHTML(context, data);
				});
		})

	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposableForm);
	context.subscriptions.push(disposableEdit);

}

function crearHTML(context: vscode.ExtensionContext, data: any){

	const template = vscode.Uri.file(_path.join(context.extensionPath, 'assets', 'media', 'template.html'));
	const templateNew = vscode.Uri.file(_path.join(context.extensionPath,'assets', 'media', 'newsletter.html'));

	var data = JSON.parse(data.categorias);
	
	data = generarNodos(data);

	var htmlAsString = fs.readFileSync(template.fsPath).toString();

	htmlAsString = generarHTML(data, htmlAsString);

	htmlAsString = htmlAsString.replace("{{button}}", '');

	var htmlAsStringToArray = htmlAsString.split("<script>");

	htmlAsString = htmlAsStringToArray[0] + htmlAsStringToArray[1].split("</script>")[1];

    fs.writeFile(templateNew.fsPath,htmlAsString, (e) => {
        if (e) {
            console.error(`Error: ${e}`)
        } else {
            console.log("ok")
        }
    });

	vscode.window.showInformationMessage("Fichero HTML generado");

}

function getTemplate(context: vscode.ExtensionContext, panel: vscode.WebviewPanel) {
	const template = vscode.Uri.file(_path.join(context.extensionPath, 'assets', 'media', 'template.html'));
	const dataUri = vscode.Uri.file(_path.join(context.extensionPath, 'assets', 'media', 'data.json'));

	//leemos json

	var data = JSON.parse(fs.readFileSync(dataUri.fsPath).toString());

	//wrapeamos arrays con li
	
	data = generarNodos(data);

	//leemos el fichero
	var htmlAsString = fs.readFileSync(template.fsPath).toString();

	//reemplazamos los marcadores {{}} con su contenidoestiloestiloestilo

	htmlAsString = generarHTML(data, htmlAsString);

	htmlAsString = htmlAsString.replace("{{button}}", '');

	return htmlAsString;
}

function getTemplateForm(context: vscode.ExtensionContext, panel: vscode.WebviewPanel) {
	const template = vscode.Uri.file(_path.join(context.extensionPath, 'assets', 'media', 'template.html'));
	var htmlAsString = fs.readFileSync(template.fsPath).toString();

	htmlAsString = generarNodosForm(categorias, htmlAsString);
	return htmlAsString;

}

function getTemplateEdit(context: vscode.ExtensionContext, panel: vscode.WebviewPanel) {
	const template = vscode.Uri.file(_path.join(context.extensionPath, 'assets', 'media', 'template.html'));
	const dataUri = vscode.Uri.file(_path.join(context.extensionPath, 'assets', 'media', 'data.json'));
	var htmlAsString = fs.readFileSync(template.fsPath).toString();
	var data = JSON.parse(fs.readFileSync(dataUri.fsPath).toString());
	
	htmlAsString = generarNodosFormEdit(data, htmlAsString);

	return htmlAsString;
	
}

export function deactivate() { }
