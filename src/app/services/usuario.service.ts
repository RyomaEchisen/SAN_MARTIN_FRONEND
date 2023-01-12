import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../api/usuario';
import { BaseService } from './base.service';

const URI: string = 'api_usuario/usuarios';
@Injectable()
export class UsuarioService extends BaseService<Usuario> {
    public loginStatusSubjec = new Subject<boolean>();
    constructor(private http: HttpClient) {
        super(http, URI);
    }

    login(data: { email: string; password: string }): Observable<any> {
        return this.http.post<any>(`${URI}/login`, data);
    }
    //iniciamos sesión y establecemos el token en el localStorage
    public loginUser(token: any) {
        localStorage.setItem('token', token);
        return true;
    }

    public isLoggedIn() {
        let tokenStr = localStorage.getItem('token');
        if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
            return false;
        } else {
            return true;
        }
    }

    //cerranis sesion y eliminamos el token del localStorage
    public logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return true;
    }

    //obtenemos el token
    public getToken() {
        return localStorage.getItem('token');
    }

    public setUser(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    public getUser() {
        let userStr = localStorage.getItem('user');
        if (userStr != null) {
            return JSON.parse(userStr);
        } else {
            this.logout();
            return null;
        }
    }

    public getUserRole() {
        let user = this.getUser();
        return user.roles[0].nombre; //authorities[0].authority;
    }
}
