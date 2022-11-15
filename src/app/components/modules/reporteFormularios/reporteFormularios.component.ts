import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

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

    items: MenuItem[] = [];

    cardMenu: MenuItem[] = [];

    ngOnInit() {
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
    }
}
