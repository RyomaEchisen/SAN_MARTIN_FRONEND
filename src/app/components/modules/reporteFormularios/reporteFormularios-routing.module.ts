import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReporteFormulariosComponent } from './reporteFormularios.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ReporteFormulariosComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class ReporteFormulariosRoutingModule {}
