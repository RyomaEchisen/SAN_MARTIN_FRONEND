import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: DashboardComponent },
            {
                path: 'usuarios',
                loadChildren: () =>
                    import('../modules/usuarios/usuarios.module').then(
                        (m) => m.UsuariosModule
                    ),
            },
            // {
            //     path: 'funcionarios',
            //     loadChildren: () =>
            //         import('../modules/funcionarios/funcionarios.module').then(
            //             (m) => m.FuncionariosModule
            //         ),
            // },
            {
                path: 'personas',
                loadChildren: () =>
                    import('../modules/personas/personas.module').then(
                        (m) => m.PersonasModule
                    ),
            },
            {
                path: 'sucursales',
                loadChildren: () =>
                    import('../modules/sucursales/sucursales.module').then(
                        (m) => m.SucursalesModule
                    ),
            },
            {
                path: 'habilitarPermisos',
                loadChildren: () =>
                    import(
                        '../modules/habilitarPermisos/habilitarPermisos.module'
                    ).then((m) => m.HabilitarPermisosModule),
            },
            {
                path: 'reporteFuncionarios',
                loadChildren: () =>
                    import(
                        '../modules/reporteFuncionarios/reporteFuncionarios.module'
                    ).then((m) => m.ReporteFuncionariosModule),
            },
            {
                path: 'reporteFormularios',
                loadChildren: () =>
                    import(
                        '../modules/reporteFormularios/reporteFormularios.module'
                    ).then((m) => m.ReporteFormulariosModule),
            },
            {
                path: 'reporteSucursales',
                loadChildren: () =>
                    import(
                        '../modules/reporteSucursales/reporteSucursales.module'
                    ).then((m) => m.ReporteSucursalesModule),
            },
            {
                path: 'crud',
                loadChildren: () =>
                    import('../modules/crud/crud.module').then(
                        (m) => m.CrudModule
                    ),
            },
            {
                path: 'formularioUsuarios',
                loadChildren: () =>
                    import(
                        '../modules/formularioUsuarios/formularioUsuarios.module'
                    ).then((m) => m.FormularioUsuariosModule),
            },
        ]),
    ],
    exports: [RouterModule],
})
export class DashboardsRoutingModule {}
