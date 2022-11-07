import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/api/usuario';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
    templateUrl: './usuarios.component.html',
    providers: [MessageService]
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
        field: string,
        header: string
    }> = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private usuarioService: UsuarioService, private messageService: MessageService) { }

    ngOnInit() {
        this.usuarioService.get().subscribe({
            next: (response) => {
                this.usuarios = response;
            },
            error: (err) => {
                console.log('error en servicio conexión back', err);
            }
        });

        this.cols = [
                { field: 'username', header: 'Nombre de usuario' },
                { field: 'roles', header: 'Roles' },
                { field: 'email', header: 'Correo' },
                { field: 'funcionario', header: 'Funcionario' },
                { field: 'enabled', header: 'Estado' }
            ];

        this.statuses = [
            { label: 'ACTIVO', value: true },
            { label: 'INACTIVO', value: false },
        ];
    }

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

    confirmDeleteSelected() {
        this.deleteUsuariosDialog = false;
        this.usuarios = this.usuarios.filter(val => !this.selectedUsuarios.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuarios Deleted', life: 3000 });
        this.selectedUsuarios = [];
    }

    confirmDelete() {
        this.deleteUsuarioDialog = false;
        this.usuarios = this.usuarios.filter(val => val.id !== this.usuario.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Deleted', life: 3000 });
        this.usuario = {};
    }

    hideDialog() {
        this.usuarioDialog = false;
        this.submitted = false;
    }

    saveUsuario() {
        this.submitted = true;

        if (this.usuario.username?.trim()) {
            if (this.usuario.id) {
                // @ts-ignore
                // TODO: interactuar con back
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Updated', life: 3000 });
            } else {
                // TODO: interactuar con back
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Created', life: 3000 });
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
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
