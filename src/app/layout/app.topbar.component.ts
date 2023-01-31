import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UsuarioService } from '../services/usuario.service';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];
    sesionUsuario: String = '';
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        public usuarioService: UsuarioService,
        public router: Router
    ) {}

    public cerrarSesion() {
        this.usuarioService.logout();
        this.router.navigate(['login']);
    }
    ngOnInit() {
        this.sesionUsuario = this.usuarioService.getUser().username;
    }
}
