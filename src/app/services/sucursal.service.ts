import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sucursal } from '../api/sucursal';
import { BaseService } from './base.service';

const URI: string = 'sucursales';
@Injectable()
export class SucursalService extends BaseService<Sucursal> {
    constructor(private http: HttpClient) {
        super(http, URI);
    }
}
