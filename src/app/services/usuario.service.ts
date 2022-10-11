import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../api/usuario';
import { BaseService } from './base.service';

const URI: string = 'api_usuario/usuarios';
@Injectable()
export class UsuarioService extends BaseService<Usuario> {
    constructor(private http: HttpClient) {
        super(http, URI);
    }

    login(data: {email: string, password: string}): Observable<any> {
        return this.http.post<any>(`${URI}/login`, data);
    }
}
