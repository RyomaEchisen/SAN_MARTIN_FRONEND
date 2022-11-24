import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormularioUsuariosComponent } from './formularioUsuarios.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: FormularioUsuariosComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class FormularioUsuariosRoutingModule {}
