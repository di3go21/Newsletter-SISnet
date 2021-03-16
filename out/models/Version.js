"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version = void 0;
class Version {
    constructor(nameVersion, versionInDevelopment, dependencies, added, changes, deprecated, fixes, securities) {
        this.nameVersion = nameVersion;
        this.versionInDevelopment = versionInDevelopment;
        this.dependencies = dependencies;
        this.added = added;
        this.changes = changes;
        this.deprecated = deprecated;
        this.fixes = fixes;
        this.securities = securities;
    }
}
exports.Version = Version;
//# sourceMappingURL=Version.js.map