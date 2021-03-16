"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveJSON = void 0;
const fs = require("fs");
const vscode = require("vscode");
const _path = require("path");
function saveJSON(data, pathA) {
    const template = vscode.Uri.file(_path.join(pathA, 'assets', 'media', 'data.json'));
    fs.writeFileSync(template.fsPath, data.categorias);
    vscode.commands.executeCommand('newsletter-sisnet-front-end.newsLetterFront-End');
}
exports.saveJSON = saveJSON;
//# sourceMappingURL=saveJSON.js.map