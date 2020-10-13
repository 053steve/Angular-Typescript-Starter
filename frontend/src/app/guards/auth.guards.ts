import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        public router: Router,
        public auth: AuthService,
    ) { }

    async canActivate() {
        const isAuth = await this.auth.isAuthenticated();
        if (isAuth === false) {
            this.router.navigate(['login']);
            return false;
        } else {
            return true;
        }

    }
}
