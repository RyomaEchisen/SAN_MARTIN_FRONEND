import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SucursalesComponent } from './sucursales.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: SucursalesComponent }]),
    ],
    exports: [RouterModule],
})
export class SucursalesRoutingModule {}
