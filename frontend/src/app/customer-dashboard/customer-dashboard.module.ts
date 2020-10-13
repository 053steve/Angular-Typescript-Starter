import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './customer-dashboard.routing.module';
import { CustomerDashboardComponent } from './customer-dashboard.component';
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
    CustomerDashboardComponent
  ]
})
export class CustomerDashboardModule { }


