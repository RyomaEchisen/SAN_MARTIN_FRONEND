import { Evento } from "./evento";
import { Funcionario } from "./funcionario";
import { Rol } from "./rol";

export interface Usuario {
    id: number;
    username: string;
	password: string;
	enabled: boolean;
	nombres: string;
	apellidos: string;
	email: string;
	roles: Array<Rol>;
	funcionario: Funcionario;
	eventos: Array<Evento>;

}
