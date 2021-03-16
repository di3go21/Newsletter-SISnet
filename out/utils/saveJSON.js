"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveJSON = void 0;
const fs = require("fs");
const vscode = require("vscode");
const _path = require("path");
function saveJSON(data, pathA) {
    const template = vscode.Uri.file(_path.join(pathA, 'assets', 'media', 'data.json'));
    fs.writeFile(template.fsPath, data.categorias, (e) => {
        if (e) {
            console.error(e);
        }
        else {
            console.log("ok");
        }
    });
}
exports.saveJSON = saveJSON;
//# sourceMappingURL=saveJSON.js.map