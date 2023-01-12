import { Persona } from './persona';
import { Usuario } from './usuario';

export interface Funcionario {
    id: number;
    cargo: string;
    tipoFuncionario: string;
    estado: number;
    fechaInicio: string;
    fechaFin: string;
    personaId: number;
    sucursalId: number;
    persona: Persona;
    sucursal: any;
    usuarios: Array<Usuario>;
    formularios: Array<any>;
}
