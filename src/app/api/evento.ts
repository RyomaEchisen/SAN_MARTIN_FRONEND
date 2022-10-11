import { Usuario } from "./usuario";

export interface Evento{
    id: number;
	tipo: string;
	tabla: string;
	idRegistro: number;
	fechaHora: string;
	estadoAnterios: string;
	usuario?: Usuario;
}
