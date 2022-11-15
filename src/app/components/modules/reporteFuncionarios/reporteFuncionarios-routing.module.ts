import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReporteFuncionariosComponent } from './reporteFuncionarios.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ReporteFuncionariosComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class ReporteFuncionariosRoutingModule {}
