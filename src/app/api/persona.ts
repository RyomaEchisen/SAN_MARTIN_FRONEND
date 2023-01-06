import { Evento } from './evento';
import { Funcionario } from './funcionario';
import { Rol } from './rol';

export interface Persona {
    id: number;
    nombres: string;
    materno: string;
    paterno: string;
    apelldidoCasada: string;
    tipoDocumento: string;
    numeroDocumento: string;
    archivoDoc: string;
    profesion: string;
    sexo: string;
    cel: string;
    correo: string;
    direccion: string;
    estadoCivil: string;
    exiteRelacionParentesco: boolean;
    relacionFamiliar: string;
    nombreCompletoPariente: string;
    gradoParentesco: string;
    expedicion: string;
    fax: string;
    fechaNacimiento: string;
    nacDepartamento: string;
    nacDoc: number;
    nacDocalidad: string;
    nacPais: string;
    nacProvincia: string;
    nacionalidad: string;
    createFechacreacion: string | Date;
    fotoId: string;
    numeroDeDependen: string;
    // RESIDENCIA
    resDepartamento: string;
    resDocalidad: string;
    resPais: string;
    resProvincia: string;
    telfDomi: string;
    telfTrabajo: string;

    funcionarios: Array<Funcionario>;
    // eventos: Array<Evento>;
    // avatar?: string;

    [index: string]: any;
}
