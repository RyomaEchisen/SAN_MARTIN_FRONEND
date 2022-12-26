import { Component, OnInit } from '@angular/core';
import { Sucursal } from 'src/app/api/sucursal';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
    templateUrl: './sucursales.component.html',
    providers: [MessageService],
})
export class SucursalesComponent implements OnInit {
    sucursalDialog: boolean = false;

    deleteSucursalDialog: boolean = false;

    deleteSucursalesDialog: boolean = false;

    sucursales: Sucursal[] = [];

    sucursal: Partial<Sucursal> = {};

    selectedSucursales: Sucursal[] = [];

    submitted: boolean = false;

    cols: Array<{
        field: string;
        header: string;
    }> = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private sucursalService: SucursalService,
        private messageService: MessageService
    ) {}

    getSucursales() {
        this.sucursalService.get().subscribe({
            next: (response) => {
                this.sucursales = response;
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
        this.getSucursales();
        this.cols = [{ field: 'nombre', header: 'Nombre' }];

        this.statuses = [
            { label: 'ACTIVO', value: true },
            { label: 'INACTIVO', value: false },
        ];
    }

    openNew() {
        this.sucursal = {};
        this.submitted = false;
        this.sucursalDialog = true;
    }

    deleteSelectedSucursales() {
        this.deleteSucursalesDialog = true;
    }

    editSucursal(sucursal: Sucursal) {
        this.sucursal = { ...sucursal };
        this.sucursalDialog = true;
    }

    deleteSucursal(sucursal: Sucursal) {
        this.deleteSucursalDialog = true;
        this.sucursal = { ...sucursal };
    }

    async confirmDeleteSelected() {
        this.deleteSucursalesDialog = false;
        await Promise.all(
            this.selectedSucursales.map(async (sucursal) => {
                if (sucursal.id) {
                    return await this.sucursalService
                        .delete(sucursal.id)
                        .subscribe({
                            next: () => {
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Eliminado!',
                                    detail: 'Sucursal eliminada exitosamente.',
                                    life: 3000,
                                });
                                this.sucursal = {};
                                this.selectedSucursales =
                                    this.selectedSucursales.filter(
                                        (prs) => prs.id !== sucursal.id
                                    );
                                if (this.selectedSucursales.length === 0) {
                                    this.selectedSucursales = [];
                                    this.getSucursales();
                                }
                            },
                            error: (err) => {
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Error!',
                                    detail: `Error al eliminar la sucursal ${sucursal.nombre}.`,
                                    life: 3000,
                                });
                                this.selectedSucursales =
                                    this.selectedSucursales.filter(
                                        (prs) => prs.id !== sucursal.id
                                    );
                                if (this.selectedSucursales.length === 0) {
                                    this.selectedSucursales = [];
                                    this.getSucursales();
                                }
                            },
                        });
                }
                return undefined;
            })
        );
    }

    confirmDelete() {
        this.deleteSucursalDialog = false;
        if (this.sucursal.id) {
            this.sucursalService.delete(this.sucursal.id).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Eliminado!',
                        detail: 'Sucursal eliminada exitosamente.',
                        life: 3000,
                    });
                    this.getSucursales();

                    this.sucursal = {};
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error!',
                        detail: 'Error al eliminar la sucursal.',
                        life: 3000,
                    });
                },
            });
        }
    }

    cancelDelete() {
        this.deleteSucursalDialog = false;
        this.sucursal = {};
    }

    hideDialog() {
        this.sucursalDialog = false;
        this.submitted = false;
    }

    saveSucursal() {
        this.submitted = true;

        if (this.sucursal.nombre?.trim()) {
            if (this.sucursal.id) {
                // @ts-ignore
                // TODO: interactuar con back
                this.sucursalService
                    .update(this.sucursal.id, {
                        ...this.sucursal,
                    })
                    .subscribe({
                        next: (response) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Actualizado!',
                                detail: 'Sucursal actualizado exitosamente',
                                life: 3000,
                            });
                            this.getSucursales();
                        },
                        error: (err) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error!',
                                detail: 'Error al actualizar la sucursal.',
                                life: 3000,
                            });
                        },
                    });
            } else {
                this.sucursalService
                    .create({
                        ...this.sucursal,
                    })
                    .subscribe({
                        next: (response) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Registrado!',
                                detail: 'Sucursal registrado exitosamente',
                                life: 3000,
                            });
                            this.getSucursales();
                        },
                        error: (err) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error!',
                                detail: 'Error al registrar la sucursal.',
                                life: 3000,
                            });
                        },
                    });
            }

            // this.sucursales = [...this.sucursales];
            this.sucursalDialog = false;
            this.sucursal = {};
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.sucursales.length; i++) {
            if (this.sucursales[i].id === id) {
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
