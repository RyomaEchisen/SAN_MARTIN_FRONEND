import { Component, OnInit, ViewChild } from '@angular/core';
import { Persona } from 'src/app/api/persona';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PersonaService } from 'src/app/services/persona.service';
import { FuncionarioFormDialogComponent } from '../funcionarios/components/funcionario-form-dialog/funcionario-form-dialog.component';
import { Funcionario } from 'src/app/api/funcionario';

@Component({
    templateUrl: './personas.component.html',
    providers: [MessageService],
})
export class PersonasComponent implements OnInit {
    // Components
    @ViewChild('dialogFunc') dialogFunc: FuncionarioFormDialogComponent | undefined;

    personaDialog: boolean = false;

    deletePersonaDialog: boolean = false;

    deletePersonasDialog: boolean = false;

    personas: Persona[] = [];

    persona: Partial<Persona> = {};

    selectedPersonas: Persona[] = [];

    submitted: boolean = false;

    cols: Array<{
        field: string;
        header: string;
    }> = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private personaService: PersonaService,
        private messageService: MessageService,
    ) {}

    onAsignarFuncionario(persona: Persona) {
        this.dialogFunc?.onOpen(persona);
        console.log('asignar funcionari: ', persona.nombres);
    }

    getPersonas() {
        this.personaService.get().subscribe({
            next: (response) => {
                this.personas = response;
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error!',
                    detail: `Error al conectarse al servidor.`,
                    life: 3000,
                });
                // console.log('error en servicio conexión back', err);
            },
        });
    }

    ngOnInit() {

        this.getPersonas();
        this.cols = [
            { field: 'nombres', header: 'Nombres' },
            { field: 'paterno', header: 'Ap. paterno' },
            { field: 'materno', header: 'Ap. materno' },
            { field: 'tipoDocumento', header: 'Tipo de documento' },
            { field: 'numeroDocumento', header: 'Numero de documento' },
            { field: 'funcionario', header: 'Funcionario' },
            { field: 'correo', header: 'Correo' },
        ];

        this.statuses = [
            { label: 'ACTIVO', value: true },
            { label: 'INACTIVO', value: false },
        ];
    }

    openNew() {
        this.persona = {};
        this.submitted = false;
        this.personaDialog = true;
    }

    deleteSelectedPersonas() {
        this.deletePersonasDialog = true;
    }

    editPersona(persona: Persona) {
        this.persona = { ...persona };
        this.personaDialog = true;
    }

    deletePersona(persona: Persona) {
        this.deletePersonaDialog = true;
        this.persona = { ...persona };
    }

    async confirmDeleteSelected() {
        this.deletePersonasDialog = false;
        await Promise.all(this.selectedPersonas.map(async persona => {
            if(persona.id){
                return await this.personaService.delete(persona.id).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Eliminado!',
                            detail: 'Persona eliminada exitosamente.',
                            life: 3000,
                        });
                        this.persona = {};
                        this.selectedPersonas = this.selectedPersonas.filter(prs => prs.id !== persona.id);
                        if(this.selectedPersonas.length === 0){
                            this.selectedPersonas = []
                            this.getPersonas()
                        }
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error!',
                            detail: `Error al eliminar la persona ${persona.nombres}.`,
                            life: 3000,
                        });
                        this.selectedPersonas = this.selectedPersonas.filter(prs => prs.id !== persona.id);
                        if(this.selectedPersonas.length === 0){
                            this.selectedPersonas = []
                            this.getPersonas()
                        }
                    }
                })
            }
            return undefined;
        }))
    }

    confirmDelete() {
        this.deletePersonaDialog = false;
        if(this.persona.id){
            this.personaService.delete(this.persona.id).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Eliminado!',
                        detail: 'Persona eliminada exitosamente.',
                        life: 3000,
                    });
                    this.getPersonas();

                    this.persona = {};
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error!',
                        detail: 'Error al eliminar la persona.',
                        life: 3000,
                    });
                }
            })
        }
    }

    cancelDelete(){
        this.deletePersonaDialog = false;
        this.persona = {};
    }

    hideDialog() {
        this.personaDialog = false;
        this.submitted = false;
    }

    onSaveFuncionario(func: Funcionario) {
        this.getPersonas();
    }

    savePersona() {
        this.submitted = true;

        if (this.persona.numeroDocumento?.trim()) {
            if (this.persona.id) {
                // @ts-ignore
                // TODO: interactuar con back
                this.personaService.update(this.persona.id, {
                    ...this.persona,
                }).subscribe({
                    next: (response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Actualizado!',
                            detail: 'Persona actualizada exitosamente',
                            life: 3000,
                        });
                        this.getPersonas();
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error!',
                            detail: 'Error al actualizar la persona.',
                            life: 3000,
                        });
                    },
                });
            } else {
                this.personaService.create({
                    ...this.persona,
                }).subscribe({
                    next: (response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Registrado!',
                            detail: 'Persona registrada exitosamente',
                            life: 3000,
                        });
                        this.getPersonas();
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error!',
                            detail: 'Error al registrar la persona.',
                            life: 3000,
                        });
                    },
                });
            }

            // this.personas = [...this.personas];
            this.personaDialog = false;
            this.persona = {};
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.personas.length; i++) {
            if (this.personas[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
