export class documento{

    private version: string[];
    private aviso: string[];
    private version_en_desarrollo: string[];
    private aniadido: string[];
    private cambiado: string[];
    private eliminado: string[];
    private arreglado: string[];
    private seguridad: string[];
    private dependencias: string[];

    constructor(version: string[],aviso: string[],version_en_desarrollo: string[],aniadido: string[],cambiado: string[],eliminado: string[],arreglado: string[],seguridad: string[],dependencias: string[];){
        this.version = version;
        this.aviso = aniadido;
        this.version_en_desarrollo = version_en_desarrollo;
        this.aniadido = aniadido;
        this.cambiado = cambiado;
        this.eliminado = eliminado;
        this.arreglado = arreglado;
        this.seguridad = seguridad;
        this.dependencias = dependencias;
    }

    getVersion(){

        return this.version;

    }

    getAviso(){

        return this.aviso;

    }

    getVersion_en_desarrollo(){

        return this.version_en_desarrollo;

    }

    getAviso(){

        return this.aviso;

    }

    getAviso(){

        return this.aviso;

    }

    getAviso(){

        return this.aviso;

    }

    getAviso(){

        return this.aviso;

    }
    
    getAviso(){

        return this.aviso;

    }

    getAviso(){

        return this.aviso;

    }

}