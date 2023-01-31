import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/api/usuario';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Persona } from 'src/app/api/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { FormControl } from '@angular/forms';
import { RolesService } from 'src/app/services/roles.service';
import { Rol } from 'src/app/api/rol';

import jsPDF from 'jspdf';
import 'jspdf/dist/polyfills.es.js';
import html2canvas from 'html2canvas';
import { FormularioService } from 'src/app/services/formulario.service';
import { VacacionService } from 'src/app/services/vacacion.service';
import { formatDate } from '@angular/common';
import { Vacacion } from 'src/app/api/vacacion';

interface Food {
    value: string;
    viewValue: string;
}

@Component({
    templateUrl: './usuarios.component.html',
    providers: [MessageService],
    selector: './usuarios.component',
})
export class UsuariosComponent implements OnInit {
    usuarioDialog: boolean = false;

    deleteUsuarioDialog: boolean = false;

    deleteUsuariosDialog: boolean = false;

    usuarios: Usuario[] = [];

    personas: Persona[] = [];

    roles: Rol[] = [];

    partialRol: Partial<Rol> = {};

    usuarioPersonas: Partial<Persona> = {};

    usuario: Partial<Usuario> = {};

    selectedUsuarios: Usuario[] = [];

    vacacionAño: Partial<Vacacion> = {};

    vacacionUsuarioDialog: boolean = false;

    submitted: boolean = false;

    cols: Array<{
        field: string;
        header: string;
    }> = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    printDialog: Boolean = false;

    diasDisponibles: Array<Vacacion> = [];

    constructor(
        private usuarioService: UsuarioService,
        private personaService: PersonaService,
        private messageService: MessageService,
        private rolesService: RolesService,
        private formularioUsuarioService: FormularioService,
        private vacacionService: VacacionService
    ) {}
    getVacaciones(id: any) {
        this.vacacionService.getByUserId(parseInt(`${id}`)).subscribe({
            next: (response) => {
                this.diasDisponibles = response;

                console.log('dias');
                console.log(this.diasDisponibles);
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
    getUsuarios() {
        this.usuarioService.get().subscribe({
            next: (response) => {
                this.usuarios = response;
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

        /*  this.vacacionService.get().subscribe({
            next: (response) => {
                //this.usuarios = response;

                console.log('vacacion');
                console.log(response);
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
        });*/
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

    getRoles() {
        this.rolesService.get().subscribe({
            next: (response) => {
                this.roles = response;
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
        this.getUsuarios();
        this.getPersonas();
        this.getRoles();
        //  this.getVacaciones();
        this.cols = [
            { field: 'username', header: 'Nombre de usuario' },
            { field: 'roles', header: 'Roles' },
            { field: 'cargo', header: 'Cargo' },
            { field: 'email', header: 'Correo' },
            { field: 'password', header: 'Password' },
            { field: 'fechaIngreso', header: 'FechaIngreso' },
        ];

        //  this.statuses = [
        //  { label: 'ACTIVO', value: true },
        //  { label: 'INACTIVO', value: false },
        // ];
    }

    foods: Food[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' },
    ];
    openNew() {
        this.usuario = {};
        this.submitted = false;
        this.usuarioDialog = true;
    }

    deleteSelectedUsuarios() {
        this.deleteUsuariosDialog = true;
    }

    vacacionSelectedUsuarios() {
        this.vacacionUsuarioDialog = true;
    }

    cancelVacacion() {
        this.vacacionUsuarioDialog = false;
    }
    async confirmVacacion() {
        this.vacacionUsuarioDialog = false;
        var gaño = '' + new Date().getFullYear();

        await Promise.all(
            this.selectedUsuarios.map(async (usuario) => {
                if (usuario.id) {
                    {
                        var vacacion123 = 0;

                        if (
                            usuario.roles[0].nombre == 'user' &&
                            usuario.fechaIngreso != null
                        ) {
                            this.vacacionAño = {};
                            var recuperar = `${usuario.fechaIngreso}`.split(
                                '-'
                            );
                            var añitos =
                                parseInt(gaño) - parseInt(recuperar[0]);
                            //console.log('0000000000');
                            //console.log(añitos);
                            if (añitos > 0) {
                                vacacion123 = 15;
                            }
                            if (añitos > 4) {
                                vacacion123 = 20;
                            }
                            if (añitos > 10) {
                                vacacion123 = 30;
                            }

                            // var minutos_inicio = inicio.split(':');
                            // var element = usuario;
                            console.log('vacacion123');
                            console.log(vacacion123);
                            this.vacacionAño.gestion = '' + gaño;
                            this.vacacionAño.usuario = usuario;
                            this.vacacionAño.cantidadDias = '' + vacacion123;
                            return await this.vacacionService
                                .create({
                                    ...this.vacacionAño,
                                })
                                .subscribe({
                                    next: (response) => {
                                        this.messageService.add({
                                            severity: 'success',
                                            summary: 'Registrado!',
                                            detail: 'vacacion registrada exitosamente',
                                            life: 3000,
                                        });
                                        this.getUsuarios();
                                    },
                                    error: (err) => {
                                        this.messageService.add({
                                            severity: 'error',
                                            summary: 'Error!',
                                            detail: 'Error al registrar la Vacacion.',
                                            life: 3000,
                                        });
                                    },
                                });
                        }
                    }
                }
                return undefined;
            })
        );
    }
    editUsuario(usuario: Usuario) {
        this.usuario = { ...usuario };
        for (let index = 0; index < this.personas.length; index++) {
            console.log('index');
            console.log(this.personas[index].nombres);
            if (this.personas[index].nombres === this.usuario.username) {
                this.usuarioPersonas = this.personas[index];
                console.log('personas');
                console.log(this.usuarioPersonas);
            }
        }
        this.usuario.roles = this.usuario.roles[0];
        console.log('USUARIO');
        console.log(this.usuario);
        this.usuarioDialog = true;
    }

    deleteUsuario(usuario: Usuario) {
        this.deleteUsuarioDialog = true;
        console.log('borrar');
        this.usuario = { ...usuario };
    }

    async confirmDeleteSelected() {
        this.deleteUsuariosDialog = false;
        await Promise.all(
            this.selectedUsuarios.map(async (usuario) => {
                if (usuario.id) {
                    return await this.usuarioService
                        .delete(usuario.id)
                        .subscribe({
                            next: () => {
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Eliminado!',
                                    detail: 'Funcionario eliminada exitosamente.',
                                    life: 3000,
                                });
                                this.usuario = {};
                                this.selectedUsuarios =
                                    this.selectedUsuarios.filter(
                                        (prs) => prs.id !== usuario.id
                                    );
                                if (this.selectedUsuarios.length === 0) {
                                    this.selectedUsuarios = [];
                                    this.getUsuarios();
                                }
                            },
                            error: (err) => {
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Error!',
                                    detail: `Error al eliminar la usuario ${usuario.username}.`,
                                    life: 3000,
                                });
                                this.selectedUsuarios =
                                    this.selectedUsuarios.filter(
                                        (prs) => prs.id !== usuario.id
                                    );
                                if (this.selectedUsuarios.length === 0) {
                                    this.selectedUsuarios = [];
                                    this.getUsuarios();
                                }
                            },
                        });
                }
                return undefined;
            })
        );
    }

    confirmDelete() {
        this.deleteUsuarioDialog = false;
        if (this.usuario.id) {
            this.usuarioService.delete(this.usuario.id).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Eliminado!',
                        detail: 'Usuario eliminada exitosamente.',
                        life: 3000,
                    });
                    this.getUsuarios();

                    this.usuario = {};
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error!',
                        detail: 'Error al eliminar la persona.',
                        life: 3000,
                    });
                },
            });
        }
    }

    cancelDelete() {
        this.deleteUsuarioDialog = false;
        this.usuario = {};
    }
    hideDialog() {
        this.usuarioDialog = false;
        this.submitted = false;
    }

    saveUsuario() {
        console.log('USUARIO' + this.usuarioPersonas.nombres);

        //console.log('USUARIO' + this.usuario.username=this.usuario.funcionario.);
        this.usuario.username = this.usuarioPersonas.nombres;

        this.partialRol = this.usuario.roles;
        console.log('1111111111111111111');
        //console.log(this.partialRol.nombre);
        this.usuario.roles = [{ nombre: this.partialRol.nombre }];
        console.log(this.usuario.roles);
        this.submitted = true;

        if (this.usuario.username?.trim()) {
            if (this.usuario.id) {
                // @ts-ignore
                // TODO: interactuar con back
                this.usuarioService
                    .update(this.usuario.id, {
                        ...this.usuario,
                    })
                    .subscribe({
                        next: (response) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Actualizado',
                                detail: 'Usiario actualizada exitosamente',
                                life: 3000,
                            });
                            this.getUsuarios();
                        },
                        error: (err) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Error al actualizar al Usuario',
                                life: 3000,
                            });
                        },
                    });
            } else {
                this.usuarioService
                    .create({
                        ...this.usuario,
                    })
                    .subscribe({
                        next: (response) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Registrado!',
                                detail: 'Usuario registrada exitosamente',
                                life: 3000,
                            });
                            this.getUsuarios();
                        },
                        error: (err) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error!',
                                detail: 'Error al registrar la Funcionario.',
                                life: 3000,
                            });
                        },
                    });
            }

            this.usuarios = [...this.usuarios];
            this.usuarioDialog = false;
            this.usuario = {};
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.usuarios.length; i++) {
            if (this.usuarios[i].id === id) {
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
    ImprimirForm(usuario: Usuario) {
        this.usuario = { ...usuario };
        this.printDialog = true;
    }
    makePdf() {
        let DATA: any = document.getElementById('htmlData');
        html2canvas(DATA).then((canvas) => {
            let fileWidth = 208;
            let fileHeight = (canvas.height * fileWidth) / canvas.width;
            const FILEURI = canvas.toDataURL('image/png');
            let PDF = new jsPDF('p', 'mm', 'a4');
            let position = 0;
            PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
            // window.open(PDF.output('bloburl'));
            PDF.save('angular-demo.pdf');
        });
    }
    hideVerDialog() {
        this.printDialog = false;
        //this.submitted = false;
    }
    VerForm(usuario: Usuario) {
        this.usuario = { ...usuario };
        this.printDialog = true;
        this.getVacaciones(this.usuario.id);
        /*   ides:Number = this.usuario.id;
        this.formularioUsuarioService
            .getByUserId(parseInt(ides))
            .subscribe({
                next: (response) => {
                    //this.formularioUsuarios = response;
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
        console.log(this.usuario);*/
    }
    generarVacacionAnual() {
        this.getUsuarios;
        var gaño = '' + new Date().getFullYear();
        console.log('año');
        console.log(gaño);
        var anual = this.usuarios;
        console.log('anual');
        console.log(anual);
        // this.getPersonas();
        for (let index = 0; index < anual.length; index++) {
            var vacacion123 = 0;

            if (
                anual[index].roles[0].nombre == 'user' &&
                anual[index].fechaIngreso != null
            ) {
                this.vacacionAño = {};
                var recuperar = `${anual[index].fechaIngreso}`.split('-');
                var añitos = parseInt(gaño) - parseInt(recuperar[0]);
                //console.log('0000000000');
                //console.log(añitos);
                if (añitos > 0) {
                    vacacion123 = 15;
                }
                if (añitos > 4) {
                    vacacion123 = 20;
                }
                if (añitos > 10) {
                    vacacion123 = 30;
                }

                // var minutos_inicio = inicio.split(':');
                // var element = anual[index];
                console.log('vacacion123');
                console.log(vacacion123);
                this.vacacionAño.gestion = '' + gaño;
                this.vacacionAño.usuario = anual[index];
                this.vacacionAño.cantidadDias = '' + vacacion123;
                this.vacacionService
                    .create({
                        ...this.vacacionAño,
                    })
                    .subscribe({
                        next: (response) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Registrado!',
                                detail: 'vacacion registrada exitosamente',
                                life: 3000,
                            });
                            this.getUsuarios();
                        },
                        error: (err) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error!',
                                detail: 'Error al registrar la Vacacion.',
                                life: 3000,
                            });
                        },
                    });
            }
        }
    }
}
