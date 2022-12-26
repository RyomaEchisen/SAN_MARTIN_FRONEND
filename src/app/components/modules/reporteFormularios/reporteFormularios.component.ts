import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormularioUsuario } from 'src/app/api/formularioUsuario';
import { FormularioService } from 'src/app/services/formulario.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

export interface PeriodicElement {
    position: number;
    name: string;
    tipo: string;
    estado: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        position: 1,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 2,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 3,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 4,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 5,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 6,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 7,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 8,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 9,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 10,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
];
@Component({
    selector: 'tab-group-basic-example',
    templateUrl: './reporteFormularios.component.html',

    styleUrls: ['reporteFormularios-routing.css'],
})
export class ReporteFormulariosComponent implements OnInit {
    displayedColumns: string[] = ['position', 'name', 'tipo', 'estado'];
    dataSource = ELEMENT_DATA;
    formularioUsuarioes: FormularioUsuario[] = [];

    formularioUsuario: Partial<FormularioUsuario> = {};

    items: MenuItem[] = [];
    formularioUsuarios: FormularioUsuario[] = [];
    formularioDialog: Boolean = false;
    printDialog: Boolean = false;
    cols: Array<{
        field: string;
        header: string;
    }> = [];

    cardMenu: MenuItem[] = [];
    constructor(
        private formularioUsuarioService: FormularioService,
        private messageService: MessageService
    ) {}
    getFormularioUsuarios() {
        this.formularioUsuarioService.get().subscribe({
            next: (response) => {
                this.formularioUsuarios = response;
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
        this.getFormularioUsuarios();
        this.items = [
            {
                label: 'Angular.io',
                icon: 'pi pi-external-link',
                url: 'http://angular.io',
            },
            {
                label: 'Theming',
                icon: 'pi pi-bookmark',
                routerLink: ['/theming'],
            },
        ];

        this.cardMenu = [
            {
                label: 'Save',
                icon: 'pi pi-fw pi-check',
            },
            {
                label: 'Update',
                icon: 'pi pi-fw pi-refresh',
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-trash',
            },
        ];
        this.cols = [
            { field: 'nombre', header: 'Nombre Formulario' },
            { field: 'tipoF', header: 'Tipo' },
            { field: 'cargo', header: 'Cargo' },
            { field: 'motivo', header: 'Motivo' },
            { field: 'fecha', header: 'Fecha' },
            { field: 'deHora', header: 'De Horas' },
            { field: 'aHora', header: 'A Horas' },
        ];
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
