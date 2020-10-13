import {Component, OnInit, ViewEncapsulation, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {UserProfile} from '../common/interfaces/user.interface';
import {USER_TYPE} from '../common/constants';
import {LoaderService} from '../services/loader.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {AuthRequest, AuthResponses, AuthService as ApiAuthService} from '../../../client';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
    newUser: UserProfile;
    loginForm: FormGroup;
    registerForm: FormGroup;
    account: AuthRequest;
    baseHref = environment.baseHref;
    isRegister: boolean;
    submitted = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(
        public router: Router,
        public authService: AuthService,
        private formBuilder: FormBuilder,
        private ngZone: NgZone,
        private snackBar: MatSnackBar,
        public loadingService: LoaderService,
        public apiAuthService: ApiAuthService

    ) {
    }

    async ngOnInit() {
        // Api.Initialize({host: 'localhost:4000'});
        this.initLoginForm();
        const user = await this.authService.getLocalUser();
        const parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.user_type) {
            this.proceedLogin(parsedUser);
        }
    }

    proceedLogin(user) {
        switch (user.user_type) {

            case USER_TYPE.ADMIN:
                console.log('routing proceedLogin');
                this.router.navigate(['/dashboard/user']);
                break;
            case USER_TYPE.STAFF:
                this.router.navigate(['/dashboard/user']);
                break;
            default:
                this.router.navigate(['/dashboard/user']);
                break;
        }
    }

    initLoginForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });

        this.loginForm.controls.username.setValue('053steve');
        this.loginForm.controls.password.setValue('Hello1234!');
    }
    get f() {
        return this.loginForm.controls;
    }

    async onSubmit() {
        this.loadingService.showLoader(true);
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.account = {
            username: this.loginForm.get('username').value,
            password: this.loginForm.get('password').value
        };

        try {
            const result: any = await this.authService.login(this.account);
            const user = result;
            if (user) {
                this.loadingService.showLoader(false);
                this.ngZone.run(() => {
                    this.proceedLogin(user);
                });
            } else {
                this.loadingService.showLoader(false);
                this.snackBar.open('คุณ กรอกข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง', '', {
                    duration: 2000,
                    panelClass: 'blue-snackbar',
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                });
            }
        } catch (err) {
            this.loadingService.showLoader(false);
            this.snackBar.open('คุณ กรอกข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง', '', {
                duration: 2000,
                panelClass: 'blue-snackbar',
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }
    }

    register() {
        // this.navCtrl.push('SignupStep1Page');
    }
}
