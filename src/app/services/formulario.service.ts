import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormularioUsuario } from '../api/formularioUsuario';
import { BaseService } from './base.service';

const URI: string = '/api_formulario/formularios';
@Injectable()
export class FormularioService extends BaseService<FormularioUsuario> {
    constructor(private http: HttpClient) {
        super(http, URI);
    }
    getByUserId(id: number): Observable<Array<FormularioUsuario>> {
        return this.http.get<Array<FormularioUsuario>>(`${URI}user/${id}`);
    }
}
