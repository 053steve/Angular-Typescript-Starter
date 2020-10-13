import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, empty, from} from 'rxjs';
import { tap, switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private token: string;

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
        return empty();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return from(this.authService.getToken()).pipe(switchMap(token => {
            if (token && token !== '') {
                const headers = req.headers
                    .set('Authorization', 'Bearer ' + token);
                const requestClone = req.clone({headers});
                return next.handle(requestClone).pipe(tap(
                    succ => {}, // If Token is still alright then do nothing
                    err => {
                        if (err.status === 401 || err.status === 403) {
                            this.logout();
                        }
                    }
                ));
            } else {
                const headers = req.headers;
                const requestClone = req.clone({headers});
                return next.handle(requestClone).pipe(tap(
                    succ => {}, // If Token is still alright then do nothing
                    err => {}
                ));
            }

        }));
    }
}
