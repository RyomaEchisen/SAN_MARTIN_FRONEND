import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcionario } from '../api/funcionario';
import { BaseService } from './base.service';

const URI: string = 'funcionarios';
@Injectable()
export class FuncionarioService extends BaseService<Funcionario> {
    constructor(private http: HttpClient) {
        super(http, URI);
    }
}
