import { Sucursal } from './../../../../../api/sucursal';
import { Component, OnInit } from '@angular/core';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
    selector: 'app-select-sucursal',
    templateUrl: './select-sucursal.component.html',
    styleUrls: ['./select-sucursal.component.scss'],
    providers: [SucursalService],
})
export class SelectSucursalComponent implements OnInit {

    sucursales: Array<Sucursal> = [];

    value: Sucursal | undefined;

    constructor(
        private readonly sucursalService: SucursalService,
    ) {
    }

    ngOnInit(): void {
        this.getSucursales();
    }

    getSucursales() {
        this.sucursalService.get().subscribe({
            next: (data) => {
                this.sucursales = data;
            },
            error: (err) => {
                console.log('error al recuperar las sucursales');
            }
        })
    }

}
