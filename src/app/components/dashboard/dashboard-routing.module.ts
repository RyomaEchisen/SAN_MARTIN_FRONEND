import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'usuarios', loadChildren: () =>
            import(
                '../modules/usuarios/usuarios.module'
            ).then((m) => m.UsuariosModule),
        },
        // { path: 'personas', loadChildren: () =>
        //     import(
        //         '../modules/personas/personas.module'
        //     ).then((m) => m.PersonasModule),
        // }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
