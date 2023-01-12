import { UsuarioService } from './../../../services/usuario.service';
import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .p-password input {
                width: 100%;
                padding: 1rem;
            }

            :host ::ng-deep .pi-eye {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }

            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    valCheck: string[] = ['remember'];

    email!: string;
    password!: string;

    constructor(
        public layoutService: LayoutService,
        private readonly usuarioService: UsuarioService,
        private _router: Router
    ) {}

    public onIniciar() {
        this.usuarioService
            .login({ email: this.email, password: this.password })
            .subscribe({
                next: (response) => {
                    this.usuarioService.loginUser(response.data.username); //es para que se loguee, es para llenar los datos, token
                    this.usuarioService.setUser(response.data); // del usuario
                    this._router.navigateByUrl('/admin');
                },
                error: (err) => {
                    // console.log('error en servicio conexión back', err);
                },
            });
    }
}
