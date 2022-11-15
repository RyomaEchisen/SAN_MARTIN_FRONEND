import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuncionariosComponent } from './funcionarios.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: FuncionariosComponent }]),
    ],
    exports: [RouterModule],
})
export class FuncionariosRoutingModule {}
