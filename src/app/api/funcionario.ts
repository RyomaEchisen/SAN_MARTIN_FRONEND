import { Usuario } from "./usuario";

export interface Funcionario {
    id: number;
	cargo: string;
	tipoFuncionario: string;
	estado: number;
	fechaInicio: string;
	fechaFin: string;
	persona: any;
	sucursal: any;
	usuarios: Array<Usuario>;
	formularios: Array<any>;
}
