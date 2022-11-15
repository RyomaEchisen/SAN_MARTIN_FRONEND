import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReporteSucursalesComponent } from './reporteSucursales.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ReporteSucursalesComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class ReporteSucursalesRoutingModule {}
