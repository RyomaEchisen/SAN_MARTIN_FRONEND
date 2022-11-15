import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HabilitarPermisosComponent } from './habilitarPermisos.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: HabilitarPermisosComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class HabilitarPermisosRoutingModule {}
