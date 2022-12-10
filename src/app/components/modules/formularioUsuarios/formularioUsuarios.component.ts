import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormularioUsuario } from 'src/app/api/formularioUsuario';
//import { FormularioService } from 'src/app/services/formulario.service';

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
    templateUrl: './formularioUsuarios.component.html',

    styleUrls: ['formularioUsuarios-routing.css'],
    providers: [MessageService],
})
export class FormularioUsuariosComponent implements OnInit {
    displayedColumns: string[] = ['position', 'name', 'tipo', 'estado'];
    dataSource = ELEMENT_DATA;

    items: MenuItem[] = [];

    cardMenu: MenuItem[] = [];
    formularioDialog: Boolean = false;
    formularioDialog2: [] = [];
    formularioUsuario: Partial<FormularioUsuario> = {};
    formularioUsuarios: FormularioUsuario[] = [];

    submitted: boolean = false;

    cols: Array<{
        field: string;
        header: string;
    }> = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    /* constructor(
        private formularioUsuarioService: FormularioService,
        private messageService: MessageService
    ) {}*/
    /* getFormularioUsuarios() {
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
    }*/

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
        // this.getFormularioUsuarios();
        this.cols = [{ field: 'nombre', header: 'Nombre Formulario' }];
        //this.formularioDialog2= [ 'dialog1','dialog2'];

        this.statuses = [
            { label: 'ACTIVO', value: true },
            { label: 'INACTIVO', value: false },
        ];
    }

    openNew() {
        this.formularioUsuario = {};
        this.submitted = false;
        this.formularioDialog = true;
    }
    openNew2(int: number) {
        this.formularioUsuario = {};
        this.submitted = false;
        //  this.formularioDialog2[int] = true;
        console.log(this.formularioDialog2, +'formularios');
    }

    hideDialog() {
        this.formularioDialog = false;
        this.submitted = false;
    }

    /* saveFormularioUsuario() {
        this.submitted = true;

        this.formularioUsuarioService
            .create({
                ...this.formularioUsuario,
            })
            .subscribe({
                next: (response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Registrado!',
                        detail: 'FormularioUsuario registrada exitosamente',
                        life: 3000,
                    });
                    this.getFormularioUsuarios();
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error!',
                        detail: 'Error al registrar la formularioUsuario.',
                        life: 3000,
                    });
                },
            });

        // this.formularioUsuarios = [...this.formularioUsuarios];
        this.formularioDialog = false;
        this.formularioUsuario = {};
    }*/

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    editFormularioUsuario(formularioUsuario: FormularioUsuario) {
        this.formularioUsuario = { ...formularioUsuario };
        this.formularioDialog = true;
    }

    ImprimirForm(formularioUsuario: FormularioUsuario) {
        this.formularioUsuario = { ...formularioUsuario };
        this.formularioDialog = true;
    }
    //public openPDF(): void {
}
