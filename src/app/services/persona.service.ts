import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../api/persona';
import { BaseService } from './base.service';

const URI: string = '/personas';
@Injectable()
export class PersonaService extends BaseService<Persona> {
    constructor(private http: HttpClient) {
        super(http, URI);
    }
}
