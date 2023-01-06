import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Rol } from '../api/rol';
import { BaseService } from './base.service';

const URI: string = '/api_roles/roles';
@Injectable()
export class RolesService extends BaseService<Rol> {
    constructor(private http: HttpClient) {
        super(http, URI);
    }
}
