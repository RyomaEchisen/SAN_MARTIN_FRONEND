import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private loginService: UsuarioService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (
            (this.loginService.isLoggedIn() &&
                this.loginService.getUserRole() == 'ADMIN') ||
            (this.loginService.isLoggedIn() &&
                this.loginService.getUserRole() == 'USER') ||
            (this.loginService.isLoggedIn() &&
                this.loginService.getUserRole() == 'admin') ||
            (this.loginService.isLoggedIn() &&
                this.loginService.getUserRole() == 'user')
        ) {
            return true;
        }

        //this.router.navigate(['']);
        //this.router.navigate(['login']);
        //this.router.navigateByUrl('/login')
        this.router.navigateByUrl('/');
        return false;
    }
}
