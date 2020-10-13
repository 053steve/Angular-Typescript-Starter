import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { AdminUserComponent } from './admin-user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUserComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AdminUserComponent
  ]

})
export class AdminUserModule { }
