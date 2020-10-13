import { share, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../services/api.service';
import { LoaderService } from '../services/loader.service';
import { UserService as ApiUserService} from '../../../client/api/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import {
  UserPayload,
  UserResponse
} from '../../../client';
import { from } from 'rxjs';
import { TableDataSource } from '../common/interfaces/common.interface';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    constructor(
        private api: Api,
        private loadingService: LoaderService,
        private apiUserService: ApiUserService,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }


    getAllUser() {
        return new Promise((resolve, reject) => {
            const seq = this.apiUserService.getAllUsers().pipe(share());
            seq.subscribe((res: any) => {
                if (res) {
                    resolve(res);
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

    createUser(params) {
        return new Promise((resolve, reject) => {
            const seq = this.apiUserService.createUser(params).pipe(share());
            seq.subscribe((res: any) => {
                if (res) {
                    resolve(res);
                } else {
                    this.snackBar.open('คุณ กรอกข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง', '', {
                        duration: 2000,
                        panelClass: 'blue-snackbar',
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                    });
                    reject();
                }
            }, err => {
                this.snackBar.open('คุณ กรอกข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง', '', {
                    duration: 2000,
                    panelClass: 'blue-snackbar',
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                });
                reject();
            });
        }).then();
    }

    updateUser(params) {
        const userParam = {
          user: params
        };

        return new Promise((resolve, reject) => {
          const seq = this.apiUserService.updateUser(params._id, userParam.user).pipe(share());
          seq.subscribe((res: any) => {
            if (res.success) {
              resolve(res);
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

      deleteuser(params) {
        const userParam = {
          user: params
        };
        return new Promise((resolve, reject) => {
            const seq = this.apiUserService.deleteUser(params._id).pipe(share());
            seq.subscribe((res: any) => {
                // If the API returned a successful response, mark the user as logged in
                if (res.success) {
                    resolve(res);
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

    getUserBySearch(params?: string, tableOptions?: TableDataSource) {
      this.loadingService.showLoader(true);
      return new Promise((resolve, reject) => {
        const seq = this.apiUserService.searchUser(params, '', '', '', tableOptions.pageNumber, tableOptions.pageSize, tableOptions.filter, tableOptions.sortOrder).pipe(share());
        // If the API returned a successful response, mark the user as logged in
        seq.subscribe((res: UserResponse) => {
          // If the API returned a successful response, mark the user as logged in
          if (res) {
            this.loadingService.showLoader(false);
            resolve(res.payload as UserPayload);
          } else {
            this.loadingService.showLoader(false);
            reject();
          }
        }, err => {
          console.error('ERROR', err);
          this.loadingService.showLoader(false);
          // show error alert
          reject();
        });
      });
    }

    getUserByType(type, tableOptions?: TableDataSource) {
      return new Promise((resolve, reject) => {
        const seq = this.apiUserService.getUserByUserType(type, '', '', '', '', tableOptions.pageNumber, tableOptions.pageSize, tableOptions.filter, tableOptions.sortOrder).pipe(share());
        seq.subscribe((res) => {
            if (res) {
                resolve(res);
            } else {
                reject();
            }
        }, err => {
            console.log(err);
            if (err && err.error.name === 'NoAuthorization') {
              this.authService.logout();
              this.router.navigateByUrl('login');
            }
            reject();
        });
    });
    }

    getUserBySearchStatus(usertype, params?: string, params1?: TableDataSource) {
      this.loadingService.showLoader(true);
      return new Promise((resolve, reject) => {
        const seq = this.apiUserService.getUserByUserType(usertype).pipe(share());
        // If the API returned a successful response, mark the user as logged in
        seq.subscribe((res: UserResponse) => {
          // If the API returned a successful response, mark the user as logged in
          if (res) {
            this.loadingService.showLoader(false);
            resolve(res.payload as UserPayload);
          } else {
            this.loadingService.showLoader(false);
            reject();
          }
        }, err => {
          console.error('ERROR', err);
          this.loadingService.showLoader(false);
          // show error alert
          reject();
        });
      });
    }
}
