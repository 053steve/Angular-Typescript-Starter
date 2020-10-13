import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './admin-dashboard.routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PerfectScrollbarModule,
    DashboardRoutingModule
  ],
  providers: [],
  declarations: [
    AdminDashboardComponent
  ]
})
export class DashboardModule { }


