import { Usuario } from './usuario';

export interface Vacacion {
    id: number;
    gestion: string;
    cantidadDias: string;
    usuario: Usuario;

    [index: string]: any;
}
