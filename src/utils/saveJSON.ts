import fs = require("fs");
import * as vscode from 'vscode';
import _path = require('path');


function saveJSON(data : any,pathA:string) {

    const template = vscode.Uri.file(_path.join(pathA,'assets', 'media', 'data.json'));
    
    fs.writeFileSync(template.fsPath,data.categorias);

    vscode.commands.executeCommand('newsletter-sisnet-front-end.newsLetterFront-End');

}

export { saveJSON }