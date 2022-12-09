import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/api/usuario';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UsuarioService } from 'src/app/services/usuario.service';

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

    usuario: Partial<Usuario> = {};

    selectedUsuarios: Usuario[] = [];

    submitted: boolean = false;

    cols: Array<{
        field: string;
        header: string;
    }> = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private usuarioService: UsuarioService,
        private messageService: MessageService
    ) {}
    getUsuarios() {
        this.usuarioService.get().subscribe({
            next: (response) => {
                this.usuarios = response;
            },
            error: (err) => {
                console.log('error en servicio conexion back', err);
            },
        });
    }
    ngOnInit() {
        this.getUsuarios();
        this.cols = [
            { field: 'username', header: 'Nombre de usuario' },
            { field: 'roles', header: 'Roles' },
            { field: 'email', header: 'Correo' },
            { field: 'password', header: 'Password' },
            { field: 'funcionario', header: 'Funcionario' },
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

    editUsuario(usuario: Usuario) {
        this.usuario = { ...usuario };
        this.usuarioDialog = true;
    }

    deleteUsuario(usuario: Usuario) {
        this.deleteUsuarioDialog = true;
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
        console.log(this.usuario);
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

            // this.usuarios = [...this.usuarios];
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
}
