import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacacion } from '../api/vacacion';
import { BaseService } from './base.service';

const URI: string = 'api_vacacion/vacaciones';
@Injectable()
export class VacacionService extends BaseService<Vacacion> {
    constructor(private http: HttpClient) {
        super(http, URI);
    }
    getByUserIdGestion(id: number, gestion: number): Observable<Vacacion> {
        return this.http.get<Vacacion>(`${URI}gestion/${id}/${gestion}`);
    }

    getByUserId(id: number): Observable<Array<Vacacion>> {
        return this.http.get<Array<Vacacion>>(`${URI}user/${id}`);
    }
}
