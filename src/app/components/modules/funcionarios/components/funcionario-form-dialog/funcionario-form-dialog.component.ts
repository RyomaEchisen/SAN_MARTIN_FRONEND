import { SucursalService } from 'src/app/services/sucursal.service';
import { Funcionario } from './../../../../../api/funcionario';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Persona } from 'src/app/api/persona';
import { Sucursal } from 'src/app/api/sucursal';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-funcionario-form-dialog',
    templateUrl: './funcionario-form-dialog.component.html',
    styleUrls: ['./funcionario-form-dialog.component.scss'],
    providers: [SucursalService, FuncionarioService],
})
export class FuncionarioFormDialogComponent implements OnInit {
    showDialog: boolean = false;
    @Output() save: EventEmitter<Funcionario> = new EventEmitter();

    funcionario: Partial<Funcionario> = {};

    errors: any = {};

    sucursales: Array<Sucursal> = [];
    tiposFuncionario: Array<string> = ['DE PLANTA', 'A CONTRATO'];

    constructor(
        private readonly sucursalService: SucursalService,
        private readonly funcionarioService: FuncionarioService,
        private messageService: MessageService,
    ) { }

    ngOnInit(): void {
        this.funcionario = {};
        this.getSucursales();
    }

    getSucursales() {
        this.sucursalService.get().subscribe({
            next: (data) => {
                this.sucursales = data;
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error!',
                    detail: `Error al recuperar las sucursales.`,
                    life: 3000,
                });
            }
        });
    }

    onSave() {
        this.funcionarioService.create({
            ... this.funcionario,
            estado: 1,
        }).subscribe({
            next: (data) => {
                this.save.emit(data);
                this.onCancel();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Registrado!',
                    detail: `El funcionario fue registrado exitosamente.`,
                    life: 3000,
                });
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error!',
                    detail: `Error al crear el funcionario.`,
                    life: 3000,
                });
                console.log('error al crear el funcionario');
            }
        })
    }

    onCancel() {
        this.funcionario = {};
        this.showDialog = false;
    }

    onOpen(persona: Persona) {
        this.funcionario.personaId = persona.id;
        this.showDialog = true;
    }
}
