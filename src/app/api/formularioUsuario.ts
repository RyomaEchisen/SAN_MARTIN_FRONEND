import { Usuario } from './usuario';

export interface FormularioUsuario {
    id: number;
    nombre: string;
    cargo: string;
    motivo: string;
    tipoDeLicencia: string;
    tiempo: number;
    fechaInicio: Date;
    fechaFin: Date;
    deHora: string;
    aHora: string;
    fechaRetorno: Date;
    gestion: number;
    fecha: Date;
    comprobanteId: number;
    pdfId: number;
    observaciones: string;
    fechacreacion: Date;

    usuarios: Array<Usuario>;
}
