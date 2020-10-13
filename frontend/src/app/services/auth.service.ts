import {share} from 'rxjs/operators';
import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {Api} from '../services/api.service';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import {ReqNewPass} from '../common/interfaces/user.interface';
import {ApiResponse} from '../common/interfaces/api-response.interface';
import {AuthService as ApiAuthService} from '../../../client/api/auth.service';
import {UserService as ApiUserService} from '../../../client/api/user.service';
import {
    AuthPayload,
    AuthRequest,
    AuthResponses,
    UserPayload,
    UserResponse
} from '../../../client';


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    isBrowser: boolean;
    user: any;
    token: string;
    authenticationState = new BehaviorSubject(false);


    constructor(
        public api: Api,
        @Inject(PLATFORM_ID) private platformId: any,
        private apiAuthService: ApiAuthService,
        private apiUserService: ApiUserService
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        this.checkToken();
    }


    async checkToken() {
        if (this.isBrowser) {
            const token = await sessionStorage.getItem('token');
            // && !this.tokenExpired(token)
            if (token) {
                this.authenticationState.next(true);
            } else {
                this.authenticationState.next(false);
            }
        }
    }

    async tokenExpired(tk) {
        const expiry = (JSON.parse(atob(tk.split('.')[1]))).exp;
        return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
    }

    async logout() {
        if (this.isBrowser) {
            await sessionStorage.removeItem('token');
            await sessionStorage.removeItem('user');
            this.authenticationState.next(false);
        }

    }

    async isAuthenticated() {
        const user = await this.getLocalUser();
        return (this.authenticationState.value && user) ? true : false;
    }


    /**
     * Send a POST request to our login endpoint with the data
     * the user entered on the form.
     */
    login(accountInfo: AuthRequest) {

        return new Promise((resolve, reject) => {
            const seq = this.apiAuthService.auth(accountInfo).pipe(share());
            seq.subscribe((res: AuthResponses) => {
                // If the API returned a successful response, mark the user as logged in
                if (res) {
                    if (res.success === false) {
                        reject();
                        return;
                    }
                    this.storeUserData(res.payload);
                    resolve(res.payload.user);
                } else {
                    reject();
                }

            }, err => {
                console.error('ERROR', err);
                // show error alert
                reject();
            });
        });
    }

    /**
     * Send a POST request to our signup endpoint with the data
     * the user entered on the form.
     */

    signup(accountInfo: any) {

        return new Promise((resolve, reject) => {
            const seq = this.apiUserService.createUser(accountInfo).pipe(share());
            seq.subscribe((res: UserResponse) => {
                // If the API returned a successful response, mark the user as logged in
                if (res) {
                    this.storeUserData(res.payload);
                    resolve(res.payload.user);
                } else {
                    reject();
                }

            }, err => {
                console.error('ERROR', err);
                // show error alert
                reject();
            });
        });

    }

    setupNewPass(passForm: ReqNewPass) {
        const reqOpts = {
            observe: 'response'
        };

        return new Promise(async (resolve, reject) => {
            const params = {
                passForm
            };

            const seq = this.api.directPost(`users/resetpass/${passForm.userId}`, params, reqOpts).pipe(share());

            seq.subscribe((res: any) => {
                // If the API returned a successful response, mark the user as logged in
                if (res.status === 200) {
                    this.updateUserTokenData(res.body.result);
                    resolve(res.body.result);
                }

            }, err => {
                console.error('ERROR', err);
                // show error alert
                reject(err.error.result);
            });
        });
    }

    /**
     * Process a login/signup response to store user data
     */
    storeUserData(resp: AuthPayload | UserPayload) {
        if (this.isBrowser) {
            this.user = resp.user;
            this.token = resp.token;
            sessionStorage.setItem('token', this.token);
            sessionStorage.setItem('user', JSON.stringify(this.user));
            this.authenticationState.next(true);
        }
    }

    updateUserTokenData(resp: ApiResponse) {
        if (this.isBrowser) {
            this.user = resp.data.user;
            this.token = resp.data.token;
            // set a key/value
            sessionStorage.set('token', this.token);
            sessionStorage.set('user', this.user);
        }

    }


    async getToken() {
        if (this.isBrowser) {
            const token = await sessionStorage.getItem('token');
            return token;
        }

    }


    async getLocalUser() {
        if (this.isBrowser) {
            const user = await sessionStorage.getItem('user');
            return user;
        }

    }

    async setLocalUser(user) {
        if (this.isBrowser) {
            sessionStorage.setItem('user', user);
        }
    }
}
